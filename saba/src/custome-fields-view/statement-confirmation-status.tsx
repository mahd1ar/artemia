import type { controller } from '@keystone-6/core/fields/types/virtual/views'
import type { CellComponent, FieldProps } from '@keystone-6/core/types'
import { FieldContainer, FieldLabel } from '@keystone-ui/fields'
import React from 'react'
// import { useChangedFieldsAndDataForUpdate } from "@keystone-6/core/admin-ui/utils"
import { CellContainer, CellLink } from '@keystone-6/core/admin-ui/components'
import { Match } from '../../data/match'
import StepperProgress from './stepper-progress'

type Value = {
  ok: boolean
  data: { key: string, value: boolean, isCurrent: boolean }[]
} | undefined

export function Field({
  field,
  value,
  onChange,
  autoFocus,
  itemValue,
  forceValidation,
}: FieldProps<typeof controller>) {
  const dataItems = value.data ? (value as Value)!.data.map(i => ({
    dataDesc: Match.AclRole(i.key),
    isDone: i.value,
    isCurrent: i.isCurrent,
  }))
    // .sort((a, b) => +b.isDone - +a.isDone)
    : []

  return (
    <>
      <FieldContainer>
        <FieldLabel>{field.label}</FieldLabel>
        <div>
          <StepperProgress dataItems={dataItems} />
        </div>
      </FieldContainer>

    </>
  )
}

function statementStatusToEmije(items?: NonNullable<Value>['data']) {
  return items?.map(i => i.value ? '✅' : '⬜') || ''
}

export const Cell: CellComponent = ({ item, field, linkTo }) => {
  const value = (item[field.path] as Value)?.data

  return linkTo
    ? <CellLink {...linkTo}>{statementStatusToEmije(value)}</CellLink>
    : (
        <CellContainer>
          {
            statementStatusToEmije(value)
          }
        </CellContainer>
      )
}
Cell.supportsLinkTo = true
