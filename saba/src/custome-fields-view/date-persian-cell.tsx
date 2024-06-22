import React from "react";
import { CellComponent, FieldProps } from "@keystone-6/core/types";
import { CellContainer, CellLink } from "@keystone-6/core/admin-ui/components";
import { controller } from "@keystone-6/core/fields/types/timestamp/views";
import { FieldContainer, FieldLabel } from "@keystone-ui/fields";


export const Field = ({
  field,
  value,
  onChange,
  autoFocus,
  itemValue,
  forceValidation
}: FieldProps<typeof controller>) => {

  console.log(field)

  return (
    <FieldContainer>

      <FieldLabel>{field.label}</FieldLabel>
      {onChange ? (
        <input type="date" />
      ) : value.value === null ? (
        ' 0'
      ) : (
        <span dir='rtl' >
          {
            // @ts-ignore
            new Date(value.value.dateValue).toLocaleDateString("fa-IR", { dateStyle: 'full' })
          }
        </span>
      )}
    </FieldContainer>
  )

};

export const Cell: CellComponent = ({ item, field, linkTo }) => {
  let value = item[field.path]
  if (value)
    value =
      new Date(value).toLocaleDateString("fa-IR", { dateStyle: 'full' })

  return linkTo ? <CellLink {...linkTo}>{value}</CellLink> : <CellContainer>{value}</CellContainer>
}
Cell.supportsLinkTo = true