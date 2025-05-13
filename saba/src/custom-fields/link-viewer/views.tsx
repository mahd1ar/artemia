import type {
  CardValueComponent,
  CellComponent,
  FieldController,
  FieldControllerConfig,
  FieldProps,
} from '@keystone-6/core/types'
import { CellContainer, CellLink } from '@keystone-6/core/admin-ui/components'
import {
  FieldContainer,
  FieldDescription,
  FieldLabel,
} from '@keystone-ui/fields'
import React from 'react'
import { UtilsBar } from './link-viewer'

// this is the component shown in the create modal and item page
export function Field({
  field,
  value,
  onChange,
}: FieldProps<typeof controller>) {
  return (
    <FieldContainer as="fieldset">
      <FieldLabel as="legend">{field.label}</FieldLabel>
      <FieldDescription id={`${field.path}-description`}>
        {field.description}
      </FieldDescription>

      <UtilsBar onChange={onChange} value={value} />
    </FieldContainer>
  )
}

// this is shown on the list view in the table
export const Cell: CellComponent = ({ item, field, linkTo }) => {
  const value = `${item[field.path]}`
  return linkTo
    ? (
        <CellLink {...linkTo}>{value}</CellLink>
      )
    : (
        <CellContainer>{value}</CellContainer>
      )
}
// setting supportsLinksTo means the cell component allows containing a link to the item
// for example, text fields support it but relationship fields don't because
// their cell component links to the related item so it can't link to the item that the relationship is on
Cell.supportsLinkTo = true

// this is shown on the item page in relationship fields with `displayMode: 'cards'`
export const CardValue: CardValueComponent = ({ item, field }) => {
  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      {item[field.path]}
    </FieldContainer>
  )
}

export function controller(config: FieldControllerConfig<{ Jcalandar: string }>): FieldController<string | null, string> & { Jcalandar: string } {
  return {
    Jcalandar: config.fieldMeta.Jcalandar,
    path: config.path,
    label: config.label,
    description: config.description,
    graphqlSelection: config.path,
    defaultValue: null,
    deserialize: (data) => {
      const value = data[config.path]
      return typeof value === 'string' ? value : null
    },
    serialize: value => ({ [config.path]: value }),
  }
}
