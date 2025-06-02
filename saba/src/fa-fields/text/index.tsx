import type { controller } from '@keystone-6/core/fields/types/text/views'
import type {
  FieldProps,
} from '@keystone-6/core/types'
import { TextArea, TextField } from '@keystar/ui/text-field'
import { FieldContainer, FieldDescription, FieldLabel } from '@keystone-ui/fields'
import React, { useState } from 'react'

export function Field(props: FieldProps<typeof controller>) {
  const { autoFocus, field, forceValidation, onChange, value } = props

  const [shouldShowErrors, setShouldShowErrors] = useState(false)
  const validationMessages = validate(value, field.validation, field.label)

  const isReadOnly = onChange == null
  const isNull = value.inner.kind === 'null'
  const isTextArea = field.displayMode === 'textarea'
  const FieldComponent = isTextArea ? TextArea : TextField

  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      <FieldDescription id={`${field.path}-fa-description`}>{field.description}</FieldDescription>
      <TextField
        onChange={() => {
          if (!onChange)
            return

          const inner
          = value.inner.kind === 'value'
            ? ({ kind: 'null', prev: value.inner.value } as const)
            : ({ kind: 'value', value: value.inner.prev } as const)

          onChange({ ...value, inner })
        }}
        isReadOnly={isReadOnly}
        isDisabled={isNull}
        isRequired={field.validation.isRequired}
        autoFocus={autoFocus}
        value={value.inner.kind === 'value' ? value.inner.value : value.inner.prev}
        onBlur={() => {
          setShouldShowErrors(true)
        }}
        err
      />
    </FieldContainer>
  )

  return (
    <NullableFieldWrapper
      isAllowed={field.isNullable}
      autoFocus={isNull && autoFocus}
      label={field.label}
      isReadOnly={isReadOnly}
      isNull={isNull}
      onChange={() => {
        if (!onChange)
          return

        const inner
          = value.inner.kind === 'value'
            ? ({ kind: 'null', prev: value.inner.value } as const)
            : ({ kind: 'value', value: value.inner.prev } as const)

        onChange({ ...value, inner })
      }}
    >
      <FieldComponent
        autoFocus={autoFocus}
        description={field.description}
        label={field.label}
        errorMessage={
          !!validationMessages.length && (shouldShowErrors || forceValidation)
            ? validationMessages.join('. ')
            : undefined
        }
        isDisabled={isNull}
        isReadOnly={isReadOnly}
        isRequired={field.validation.isRequired}
        onBlur={() => {
          setShouldShowErrors(true)
        }}
        onChange={(textValue) => {
          if (!onChange)
            return
          onChange({
            ...value,
            inner: {
              kind: 'value',
              value: textValue,
            },
          })
        }}
        // maintain the previous value when set to null in aid of continuity for
        // the user. it will be cleared when the item is saved
        value={value.inner.kind === 'value' ? value.inner.value : value.inner.prev}
      />
    </NullableFieldWrapper>
  )
}

function validate(value: TextValue, validation: Validation, fieldLabel: string): string[] {
  // if the value is the same as the initial for an update, we don't want to block saving
  // since we're not gonna send it anyway if it's the same
  // and going "fix this thing that is unrelated to the thing you're doing" is bad
  // and also bc it could be null bc of read access control
  if (
    value.kind === 'update'
    && ((value.initial.kind === 'null' && value.inner.kind === 'null')
      || (value.initial.kind === 'value'
        && value.inner.kind === 'value'
        && value.inner.value === value.initial.value))
  ) {
    return []
  }

  if (value.inner.kind === 'null') {
    if (validation.isRequired)
      return [`${fieldLabel} is required`]
    return []
  }

  const val = value.inner.value

  const messages: string[] = []
  if (validation.length.min !== null && val.length < validation.length.min) {
    if (validation.length.min === 1) {
      messages.push(`${fieldLabel} must not be empty`)
    }
    else {
      messages.push(`${fieldLabel} must be at least ${validation.length.min} characters long`)
    }
  }
  if (validation.length.max !== null && val.length > validation.length.max) {
    messages.push(`${fieldLabel} must be no longer than ${validation.length.max} characters`)
  }
  if (validation.match && !validation.match.regex.test(val)) {
    messages.push(
      validation.match.explanation || `${fieldLabel} must match ${validation.match.regex}`,
    )
  }
  return messages
}
