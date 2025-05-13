import type { controller } from '@keystone-6/core/fields/types/timestamp/views'
import type { CellComponent, FieldProps } from '@keystone-6/core/types'
import { CellContainer, CellLink } from '@keystone-6/core/admin-ui/components'
import { FieldContainer, FieldLabel } from '@keystone-ui/fields'
import React from 'react'

export function Field({
  field,
  value,
  onChange,
}: FieldProps<typeof controller>) {
  return (
    <FieldContainer>

      <FieldLabel>{field.label}</FieldLabel>
      {onChange
        ? <input type="date" />

        : value.value === null
          ? ' 0'

          : (
              <span dir="rtl">
                {

                  value.value.dateValue ? new Date(value.value.dateValue).toLocaleDateString('fa-IR', { dateStyle: 'full' }) : 'Invalid date'
                }
              </span>
            )}
    </FieldContainer>
  )
}

export const Cell: CellComponent = ({ item, field, linkTo }) => {
  let value = item[field.path]
  if (value) {
    value
      = new Date(value).toLocaleDateString('fa-IR', { dateStyle: 'full' })
  }

  return linkTo ? <CellLink {...linkTo}>{value}</CellLink> : <CellContainer>{value}</CellContainer>
}
Cell.supportsLinkTo = true
