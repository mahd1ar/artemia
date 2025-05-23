import type { controller } from '@keystone-6/core/fields/types/virtual/views'
import type { CardValueComponent, CellComponent, FieldProps } from '@keystone-6/core/types'
import { CellContainer, CellLink } from '@keystone-6/core/admin-ui/components'
import { FieldContainer, FieldLabel } from '@keystone-ui/fields'
import React from 'react'
import { NumUtils } from '../../data/utils'

export function Field({
  field,
  value,
}: FieldProps<typeof controller>) {
  if (typeof value === 'symbol')
    return <div> - </div>

  return (
    <>
      <FieldContainer>
        <FieldLabel>{field.label}</FieldLabel>
        <pre>
          {typeof value === 'object' && JSON.stringify(value, null, 2)}
        </pre>
      </FieldContainer>

    </>
  )
}

export const Cell: CellComponent = ({ item, field, linkTo }) => {
  const value = String(item[field.path])
  return linkTo
    ? <CellLink {...linkTo}>{value}</CellLink>
    : (
        <CellContainer>
          {
            value !== 'null' ? NumUtils.format(+(value)) : '0'
          }
        </CellContainer>
      )
}
Cell.supportsLinkTo = true

export const CardValue: CardValueComponent = ({ item, field }) => {
  let str = '-'

  try {
    str = Intl.NumberFormat('us-en').format(item[field.path])

    str = `${str} ریال `
  }
  catch (error) {
    console.error(error)
  }

  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      <div>
        {str}
      </div>
    </FieldContainer>
  )
}
