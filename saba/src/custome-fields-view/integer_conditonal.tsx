/** @jsxRuntime classic */
/** @jsx jsx */

import type { controller } from '@keystone-6/core/fields/types/integer/views'
import type { CardValueComponent, CellComponent, FieldProps } from '@keystone-6/core/types'
import { CellContainer, CellLink } from '@keystone-6/core/admin-ui/components'

import { FieldContainer, FieldDescription, FieldLabel, TextInput } from '@keystone-ui/fields'
import React, { useState } from 'react'
import { useFormattedInput } from './utils/utils'

function IntegerInput({
  value,
  onChange,
  id,
  autoFocus,
  forceValidation,
  validationMessage,
  placeholder,
}: {
  id: string
  autoFocus?: boolean
  value: number | string | null
  onChange: (value: number | string | null) => void
  forceValidation?: boolean
  validationMessage?: string
  placeholder?: string
}) {
  const [hasBlurred, setHasBlurred] = useState(false)
  const props = useFormattedInput<number | null>(
    {
      format: value => (value === null ? '' : value.toString()),
      parse: (raw) => {
        raw = raw.trim()
        if (raw === '') {
          return null
        }
        if (/^[+-]?\d+$/.test(raw)) {
          const parsed = Number.parseInt(raw)
          if (!Number.isSafeInteger(parsed)) {
            return raw
          }
          return parsed
        }
        return raw
      },
    },
    {
      value,
      onChange,
      onBlur: () => {
        setHasBlurred(true)
      },
    },
  )
  return (
    <span>
      <TextInput
        placeholder={placeholder}
        id={id}
        autoFocus={autoFocus}
        inputMode="numeric"
        {...props}
      />
      {(hasBlurred || forceValidation) && validationMessage && (
        <span css={{ color: 'red' }}>{validationMessage}</span>
      )}
    </span>
  )
}

export function Field({
  field,
  value,
  onChange,
  autoFocus,
  forceValidation,
  itemValue,
}: FieldProps<typeof controller>) {
  const message = validate(value, field.validation, field.label, field.hasAutoIncrementDefault)
  const isTemporary = ((itemValue as any).type.value.value.value === 'temporary')

  if (!isTemporary) {
    return null
  }

  return (
    <FieldContainer>

      <FieldLabel htmlFor={field.path}>{field.label}</FieldLabel>
      <FieldDescription id={`${field.path}-description`}>{field.description}</FieldDescription>
      {onChange
        ? (
            <span>
              <IntegerInput
                id={field.path}
                autoFocus={autoFocus}
                onChange={(val) => {
                  onChange({ ...value, value: val })
                }}
                value={value.value}
                forceValidation={forceValidation}
                placeholder={
                  field.hasAutoIncrementDefault && value.kind === 'create'
                    ? 'Defaults to an incremented number'
                    : undefined
                }
                validationMessage={message}
                aria-describedby={field.description === null ? undefined : `${field.path}-description`}
              />
            </span>
          )
        : (
            value.value
          )}
    </FieldContainer>
  )
}

export const Cell: CellComponent = ({ item, field, linkTo }) => {
  const value = `${item[field.path]}`
  return linkTo ? <CellLink {...linkTo}>{value}</CellLink> : <CellContainer>{value}</CellContainer>
}
Cell.supportsLinkTo = true

export const CardValue: CardValueComponent = ({ item, field }) => {
  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      {item[field.path] === null ? '' : item[field.path]}
    </FieldContainer>
  )
}

function validate(
  value: Value,
  validation: Validation,
  label: string,
  hasAutoIncrementDefault: boolean,
): string | undefined {
  const val = value.value
  if (typeof val === 'string') {
    return `${label} must be a whole number`
  }

  // if we recieve null initially on the item view and the current value is null,
  // we should always allow saving it because:
  // - the value might be null in the database and we don't want to prevent saving the whole item because of that
  // - we might have null because of an access control error
  if (value.kind === 'update' && value.initial === null && val === null) {
    return undefined
  }

  if (value.kind === 'create' && value.value === null && hasAutoIncrementDefault) {
    return undefined
  }

  if (validation.isRequired && val === null) {
    return `${label} is required`
  }
  if (typeof val === 'number') {
    if (val < validation.min) {
      return `${label} must be greater than or equal to ${validation.min}`
    }
    if (val > validation.max) {
      return `${label} must be less than or equal to ${validation.max}`
    }
  }

  return undefined
}

interface Validation {
  isRequired: boolean
  min: number
  max: number
}

type Value =
  | { kind: 'update', initial: number | null, value: string | number | null }
  | { kind: 'create', value: string | number | null }
