import type { controller } from '@keystone-6/core/fields/types/text/views'
import type { CardValueComponent, FieldProps } from '@keystone-6/core/types'
import { Field as TxtField } from '@keystone-6/core/fields/types/text/views'
import { FieldContainer, FieldLabel } from '@keystone-ui/fields'
import { default as React, useEffect, useRef } from 'react'

export function Field(props: FieldProps<typeof controller>) {
  const containerRef = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.querySelector('label')?.style.setProperty('direction', 'rtl', 'important')
    }
  }, [])

  useEffect(() => {
    if (props.value.inner.kind === 'value') {
      if (/\w/.test(props.value.inner.value[0])) {
        containerRef.current?.querySelector('textarea')?.style.setProperty('direction', 'ltr', 'important')
        containerRef.current?.querySelector('input')?.style.setProperty('direction', 'ltr', 'important')
      }
      else {
        containerRef.current?.querySelector('textarea')?.style.setProperty('direction', 'rtl', 'important')
        containerRef.current?.querySelector('input')?.style.setProperty('direction', 'rtl', 'important')
      }
    }
  }, [props.value])

  return (
    <div
      ref={containerRef}
    >

      <TxtField
        field={props.field}
        itemValue={props.itemValue}
        value={props.value}
        autoFocus={props.autoFocus}
        onChange={props.onChange}
        forceValidation={props.forceValidation}
      />
    </div>
  )
}

export const CardValue: CardValueComponent = ({ item, field }) => {
  if (!item.title) {
    return <span></span>
    return (
      <FieldContainer>
        <div style={{ color: 'gray' }}></div>
      </FieldContainer>
    )
  }

  return (
    <FieldContainer>
      <FieldLabel>
        { field.label}
      </FieldLabel>
      {item.title}

    </FieldContainer>
  )
}
