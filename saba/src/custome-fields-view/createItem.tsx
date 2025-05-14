import type { controller } from '@keystone-6/core/fields/types/relationship/views'
import type { FieldProps } from '@keystone-6/core/types'
import { GraphQLErrorNotice } from '@keystone-6/core/admin-ui/components'
import { useKeystone, useList } from '@keystone-6/core/admin-ui/context'
import { Fields } from '@keystone-6/core/admin-ui/utils'
import { Box } from '@keystone-ui/core'
import { Checkbox, FieldContainer, FieldDescription, FieldLabel } from '@keystone-ui/fields'
import { LoadingDots } from '@keystone-ui/loading'
import { AlertDialog } from '@keystone-ui/modals'
import React from 'react'
import { useCreateItem } from './useCreateItem'

export function Field({
  field,
  value,
  onChange: _onChange,
}: FieldProps<typeof controller>) {
  if (typeof value === 'symbol')
    return null

  const [isOpen, _setIsOpen] = React.useState<boolean>(false)
  const [check, setCheck] = React.useState<boolean>(false)
  const { createViewFieldModes } = useKeystone()
  const list = useList(field.refListKey)
  const createItemState = useCreateItem(list)

  function onClose() {
    _setIsOpen(false)
  }

  async function confirmCreate() {
    const item = await createItemState.create()
    if (item) {
      onCreate({ id: item.id, label: item.label || item.id })
    }
    onClose(false)
  }

  function confirmCancel() {
    if (
      !createItemState.shouldPreventNavigation
      || window.confirm('There are unsaved changes, are you sure you want to exit?')
    ) {
      onClose(false)
    }
  }

  return (

    <FieldContainer>

      <FieldLabel as="legend">{field.label}</FieldLabel>
      <FieldDescription id={`${field.path}-description`}>
        {field.description}
      </FieldDescription>

      <Checkbox
        value={check}
        onChange={(e) => {
          setCheck(e.target.checked)
          if (e.target.checked) {
            setIsOpen(true)
          }
          else {
            setIsOpen(false)
          }
        }}
      >
        onon
      </Checkbox>

      <AlertDialog
        title="confirm"
        isOpen={isOpen}
        actions={{
          confirm: {
            action: () => {
              confirmCreate()
            },
            label: 'Done',
          },
          cancel: {
            action: () => {
              confirmCancel()
            },
            label: 'Cancel',
          },
        }}
      >

        {createViewFieldModes.state === 'error' && (
          <GraphQLErrorNotice
            networkError={
              createViewFieldModes.error instanceof Error ? createViewFieldModes.error : undefined
            }
            errors={
              createViewFieldModes.error instanceof Error ? undefined : createViewFieldModes.error
            }
          />
        )}
        {createViewFieldModes.state === 'loading' && <LoadingDots label="Loading create form" />}
        {createItemState.error && (
          <GraphQLErrorNotice
            networkError={createItemState.error?.networkError}
            errors={createItemState.error?.graphQLErrors}
          />
        )}
        <Box paddingY="xlarge">
          <Fields {...createItemState.props} />
        </Box>
      </AlertDialog>

    </FieldContainer>

  )
}
