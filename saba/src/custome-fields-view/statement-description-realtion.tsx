import type { controller } from '@keystone-6/core/fields/types/relationship/views'
import type { FieldProps } from '@keystone-6/core/types'
import { useLazyQuery, useQuery } from '@apollo/client'
import { FieldContainer, FieldLabel, Select } from '@keystone-ui/fields'
import { CheckIcon } from '@keystone-ui/icons'
import { useToasts } from '@keystone-ui/toast'
import { gql } from '@ts-gql/tag/no-transform'
import React, { Fragment, useEffect, useState } from 'react'

// import { useRouter } from "@keystone-6/core/dist/declarations/src/admin-ui/router";
import { useRouter } from 'next/router'

interface Option {
  value: string
  label: string
}

export function Field({
  field,
  value,
  onChange,
}: FieldProps<typeof controller>) {
  const firstOption: Option = {
    value: '',
    label: 'انتخاب کنید',
  }

  const toast = useToasts()

  const router = useRouter()
  const [isHidden] = useState(router.pathname.split('/').filter(Boolean).at(0) === 'descriptions')

  const [selectedApproval, setSelectedApproval] = useState<Option>(firstOption)

  const [selectedDescriptoins, setSelectedDescriptoins] = useState<Option>(firstOption)

  const DESCRIPTIONS_OF_APPROVAL_QUERY = gql`
      query DESCRIPTIONS_OF_APPROVAL_QUERY($id: ID!) { 
      descriptions(where: {approvals:{id: {equals: $id}}}) {
        id
        title
      }
    }
` as import('../../__generated__/ts-gql/DESCRIPTIONS_OF_APPROVAL_QUERY').type

  const APPROVALS_Q = gql`
        query APPROVALS_Q {
          approvals {
            id
            title
          } 
      }` as import('../../__generated__/ts-gql/APPROVALS_Q').type

  const DESCRIPTION_APPROVAL_Q = gql`
        query DESCRIPTION_APPROVAL_Q($id: ID!) {
          description(where: {id: $id}) {
            id
            title
            approvals {
              id
              title
            }
          } 
      }` as import('../../__generated__/ts-gql/DESCRIPTION_APPROVAL_Q').type

  const { data } = useQuery(APPROVALS_Q)
  const [load, { data: dataApprovalDescriptions }] = useLazyQuery(DESCRIPTION_APPROVAL_Q)
  const [loadCoresponsiveDescriptions, { data: dataDescriptions }] = useLazyQuery(DESCRIPTIONS_OF_APPROVAL_QUERY)

  useEffect(() => {
    if (value && value.initialValue) {
      {
        load({ variables: value.initialValue })
          .then((res) => {
            const id = res.data?.description?.approvals?.id
            const title = res.data?.description?.approvals?.title

            if (id && title) {
              setSelectedApproval({ label: title || '', value: id })
              loadCoresponsiveDescriptions({ variables: { id } })
              setSelectedDescriptoins({ label: res.data?.description?.title || '', value: res.data?.description?.id || '' })
            }
          })
      }
    }
  }, [data])

  async function onChangeApproval(option: Option) {
    setSelectedApproval(option)
    const res = await loadCoresponsiveDescriptions({ variables: { id: option.value } })
    if (res.data?.descriptions) {
      setSelectedDescriptoins(
        firstOption,
      )
    }
    else {
      toast.addToast({
        title: 'ERROR - no coresponsive descriptions',
        tone: 'negative',
      })
    }
  }

  async function onChangeDescription(option: Option) {
    setSelectedDescriptoins(option)
    onChange?.({
      value: {
        id: option.value,
        label: option.label,
      },
      kind: 'one',
      id: value.id,
      initialValue: value.initialValue,
    })
  }

  return (
    <>
      {!isHidden

      && (
        <FieldContainer>
          <FieldLabel>{field.label}</FieldLabel>

          <Select
            onChange={onChangeApproval}
            value={selectedApproval}
            options={data?.approvals?.map((i: any) => ({ label: i.title || '-', value: i.id })) || []}
            isDisabled={!onChange}
          />

          {dataDescriptions
          && (
            <Select
              isDisabled={!onChange}
              css={{ marginTop: '0.5rem' }}
              onChange={onChangeDescription}
              value={selectedDescriptoins}
              options={dataDescriptions?.descriptions?.map((i: any) => ({ label: i.title || '-', value: i.id })) || []}
            />
          )}

        </FieldContainer>
      )}

    </>
  )
}
