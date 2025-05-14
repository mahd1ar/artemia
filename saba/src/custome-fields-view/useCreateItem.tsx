/* eslint-disable no-alert */
import type { Fields, Value } from '@keystone-6/core/admin-ui/utils'
import type { ApolloError } from '@keystone-6/core/src/admin-ui/apollo'
import type { ListMeta } from '@keystone-6/core/types'
import { gql, useMutation } from '@apollo/client'
import { useKeystone } from '@keystone-6/core/admin-ui/context'
import { useToasts } from '@keystone-ui/toast'
import isDeepEqual from 'fast-deep-equal'
import { useRouter } from 'next/router'
import { type ComponentProps, useCallback, useEffect, useMemo, useRef, useState } from 'react'

interface ValueWithoutServerSideErrors { [key: string]: { kind: 'value', value: any } }

interface CreateItemHookResult {
  state: 'editing' | 'loading' | 'created'
  shouldPreventNavigation: boolean
  error?: ApolloError
  props: ComponentProps<typeof Fields>
  create: () => Promise<{ id: string, label: string | null } | undefined>
}

export function usePreventNavigation(shouldPreventNavigationRef: { current: boolean }) {
  const router = useRouter()

  useEffect(() => {
    const clientSideRouteChangeHandler = () => {
      if (
        shouldPreventNavigationRef.current
        && !window.confirm('There are unsaved changes, are you sure you want to exit?')
      ) {
        // throwing from here seems to be the only way to prevent the navigation
        // we're throwing just a string here rather than an error because throwing an error
        // causes Next to show an error overlay in dev but it doesn't show the overlay when we throw a string
        throw new Error('Navigation cancelled by user')
      }
    }
    router.events.on('routeChangeStart', clientSideRouteChangeHandler)
    const beforeUnloadHandler = (event: BeforeUnloadEvent) => {
      if (shouldPreventNavigationRef.current) {
        event.preventDefault()
      }
    }
    window.addEventListener('beforeunload', beforeUnloadHandler)
    return () => {
      router.events.off('routeChangeStart', clientSideRouteChangeHandler)
      window.removeEventListener('beforeunload', beforeUnloadHandler)
    }
  }, [shouldPreventNavigationRef, router.events])
}

export function useCreateItem(list: ListMeta): CreateItemHookResult {
  const toasts = useToasts()
  const { createViewFieldModes } = useKeystone()

  const [createItem, { loading, error, data: returnedData }] = useMutation(
    gql`mutation($data: ${list.gqlNames.createInputName}!) {
      item: ${list.gqlNames.createMutationName}(data: $data) {
        id
        label: ${list.labelField}
    }
  }`,
  )

  const [value, setValue] = useState(() => {
    const value: ValueWithoutServerSideErrors = {}
    Object.keys(list.fields).forEach((fieldPath) => {
      value[fieldPath] = { kind: 'value', value: list.fields[fieldPath].controller.defaultValue }
    })
    return value
  })

  const invalidFields = useMemo(() => {
    const invalidFields = new Set<string>()

    Object.keys(value).forEach((fieldPath) => {
      const val = value[fieldPath].value

      const validateFn = list.fields[fieldPath].controller.validate
      if (validateFn) {
        const result = validateFn(val)
        if (result === false) {
          invalidFields.add(fieldPath)
        }
      }
    })
    return invalidFields
  }, [list, value])

  const [forceValidation, setForceValidation] = useState(false)

  const data: Record<string, any> = {}
  Object.keys(list.fields).forEach((fieldPath) => {
    const { controller } = list.fields[fieldPath]
    const serialized = controller.serialize(value[fieldPath].value)
    if (!isDeepEqual(serialized, controller.serialize(controller.defaultValue))) {
      Object.assign(data, serialized)
    }
  })

  const shouldPreventNavigation = !returnedData?.item && Object.keys(data).length !== 0
  const shouldPreventNavigationRef = useRef(shouldPreventNavigation)

  useEffect(() => {
    shouldPreventNavigationRef.current = shouldPreventNavigation
  }, [shouldPreventNavigation])

  usePreventNavigation(shouldPreventNavigationRef)

  return {
    state: loading ? 'loading' : !returnedData?.item ? 'created' : 'editing',
    shouldPreventNavigation,
    error,
    props: {
      fields: list.fields,
      groups: list.groups,
      fieldModes:
        createViewFieldModes.state === 'loaded' ? createViewFieldModes.lists[list.key] : null,
      forceValidation,
      invalidFields,
      value,
      onChange: useCallback((getNewValue: (_value: Value) => Value) => {
        setValue(oldValues => getNewValue(oldValues) as ValueWithoutServerSideErrors)
      }, []),
    },
    async create(): Promise<{ id: string, label: string | null } | undefined> {
      const newForceValidation = invalidFields.size !== 0
      setForceValidation(newForceValidation)

      if (newForceValidation)
        return undefined

      let outputData: { item: { id: string, label: string | null } }
      try {
        outputData = await createItem({
          variables: {
            data,
          },
          update(cache, { data }) {
            if (typeof data?.item?.id === 'string') {
              cache.evict({
                id: 'ROOT_QUERY',
                fieldName: `${list.gqlNames.itemQueryName}(${JSON.stringify({
                  where: { id: data.item.id },
                })})`,
              })
            }
          },
        }).then(x => x.data)
      }
      catch {
        return undefined
      }
      shouldPreventNavigationRef.current = false
      const label = outputData.item.label || outputData.item.id
      toasts.addToast({
        title: label,
        message: 'Created Successfully',
        tone: 'positive',
      })
      return outputData.item
    },
  }
}
