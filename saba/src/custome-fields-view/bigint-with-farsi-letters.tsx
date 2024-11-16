/** @jsxRuntime classic */
/** @jsx jsx */

import type { controller } from '@keystone-6/core/fields/types/bigInt/views'
import type { CellComponent, FieldProps } from '@keystone-6/core/types'
import { CellContainer, CellLink } from '@keystone-6/core/admin-ui/components'

import { jsx } from '@keystone-ui/core'
import { FieldContainer, FieldDescription, FieldLabel, TextInput } from '@keystone-ui/fields'
import { useState } from 'react'
import { NumUtils } from '../../data/utils'
import Num2persian from './utils/num2persian'
import { useFormattedInput } from './utils/utils'

function BigIntInput({
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
  value: bigint | string | null
  onChange: (value: bigint | string | null) => void
  forceValidation?: boolean
  validationMessage?: string
  placeholder?: string
}) {
  const [hasBlurred, setHasBlurred] = useState(false)
  const props = useFormattedInput<bigint | null>(
    {
      format: (value) => {
        if (value === null)
          return ''

        return Intl.NumberFormat('en').format(value)
      },
      parse: (raw) => {
        raw = raw.trim().replace(/,/g, '')
        if (raw === '') {
          return null
        }
        if (/^[+-]?\d+$/.test(raw)) {
          try {
            return BigInt(raw)
          }
          catch {
            return raw
          }
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
      <div css={{ color: 'gray', fontSize: '12px', fontWeight: 'bold' }}>

        {props.value ? ` ${Num2persian(props.value)} ریال` : ''}
      </div>
      {(hasBlurred || forceValidation) && validationMessage && (
        <span css={{ color: 'red' }}>{validationMessage}</span>
      )}
    </span>
  )
}

type Value =
  | { kind: 'create', value: string | bigint | null }
  | { kind: 'update', value: string | bigint | null, initial: unknown | null }

interface Validation {
  isRequired: boolean
  min: bigint
  max: bigint
}

function validate(
  state: Value,
  validation: Validation,
  label: string,
  hasAutoIncrementDefault: boolean,
): string | undefined {
  const { kind, value } = state
  if (typeof value === 'string') {
    return `${label} must be a BigInt`
  }

  // if we receive null initially on the item view and the current value is null,
  // we should always allow saving it because:
  // - the value might be null in the database and we don't want to prevent saving the whole item because of that
  // - we might have null because of an access control error
  if (kind === 'update' && state.initial === null && value === null) {
    return undefined
  }

  if (kind === 'create' && value === null && hasAutoIncrementDefault) {
    return undefined
  }

  if (validation.isRequired && value === null) {
    return `${label} is required`
  }
  if (typeof value === 'bigint') {
    if (value < validation.min) {
      return `${label} must be greater than or equal to ${validation.min}`
    }
    if (value > validation.max) {
      return `${label} must be less than or equal to ${validation.max}`
    }
  }

  return undefined
}

export function Field({
  field,
  value,
  onChange,
  autoFocus,
  forceValidation,
}: FieldProps<typeof controller>) {
  const message = validate(value, field.validation, field.label, field.hasAutoIncrementDefault)

  return (

    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      <FieldDescription id={`${field.path}-description`}>{field.description}</FieldDescription>

      {onChange
        ? (
            <span>
              <BigIntInput
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
        : value.value === null
          ? (
              ' 0'
            )
          : (
              <span dir="rtl">
                {Intl.NumberFormat('ir-fa').format(+value.value.toString())}
                <span style={{ fontSize: 12, display: +value.value.toString() ? 'inline' : 'none' }}>

                  ریال
                </span>

              </span>
            )}

    </FieldContainer>

  )
}

export const Cell: CellComponent = ({ item, field, linkTo }) => {
  const value = `${item[field.path]}`
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
