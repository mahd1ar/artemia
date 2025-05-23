import { type ChangeEvent, type FocusEvent, useState } from 'react'

type ParsedValueBase = undefined | symbol | boolean | object | number | null | bigint

interface Config<ParsedValue extends ParsedValueBase> {
  parse: (_value: string) => ParsedValue | string
  format: (_value: ParsedValue) => string
}

export function useFormattedInput<ParsedValue extends ParsedValueBase>(
  config: Config<ParsedValue>,
  {
    value,
    onChange,
    onBlur,
    onFocus,
  }: {
    value: string | ParsedValue
    onChange: (_value: string | ParsedValue) => void
    onFocus?: (_event: FocusEvent<HTMLInputElement>) => void
    onBlur?: (_event: FocusEvent<HTMLInputElement>) => void
  },
) {
  // typeof value === 'string' implies the unparsed form
  // typeof value !== 'string' implies the parsed form
  if (typeof value === 'string' && typeof config.parse(value) !== 'string') {
    throw new TypeError(`Expected ${typeof config.parse(value)}, got ${typeof value}`)
  }
  const [internalValueState, setInternalValueState] = useState(() =>
    typeof value === 'string' ? value : config.format(value),
  )
  const [isFocused, setIsFocused] = useState(false)
  if (typeof value === 'string' && value !== internalValueState) {
    setInternalValueState(value)
  }
  // If the value is not a string, we know it's in the parsed form
  if (typeof value !== 'string') {
    const formatted = config.format(value)
    // When the input is blurred, we want to show always show the formatted
    // version so if we're not focussed and the formatted version is different
    // to the current version, we need to update it.
    if (!isFocused && formatted !== internalValueState) {
      setInternalValueState(formatted)
    }

    const parsedInternal = config.parse(internalValueState)

    // We updating the internal value here because the
    // external value has changed.
    if (typeof parsedInternal !== 'string' && config.format(parsedInternal) !== formatted) {
      setInternalValueState(formatted)
    }
  }

  return {
    value: internalValueState,
    onChange(event: ChangeEvent<HTMLInputElement>) {
      const value = event.target.value
      const parsed = config.parse(value)
      onChange(parsed)
      setInternalValueState(value)
    },
    onFocus(event: FocusEvent<HTMLInputElement>) {
      onFocus?.(event)
      setIsFocused(true)
    },
    onBlur(event: FocusEvent<HTMLInputElement>) {
      onBlur?.(event)
      setIsFocused(false)
      // this isn't strictly necessary since we already do this in render
      // this just saves another rerender after setIsFocused(false)
      if (typeof value !== 'string') {
        setInternalValueState(config.format(value))
      }
    },
  }
}
