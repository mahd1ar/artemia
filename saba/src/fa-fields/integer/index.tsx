import type { controller } from '@keystone-6/core/fields/types/integer/views'
import type {
  FieldProps,
} from '@keystone-6/core/types'
import { Field as OriginalField } from '@keystone-6/core/fields/types/integer/views'
import React, { useEffect, useRef } from 'react'

export function Field(props: FieldProps<typeof controller>) {
  const containerRef = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.querySelector('label')?.style.setProperty('direction', 'rtl', 'important')
    }
  }, [])

  // useEffect(() => {

  //   if (props.value.inner.kind === 'value') {
  //     if (/\w/.test(props.value.inner.value[0])) {
  //       containerRef.current?.querySelector('textarea')?.style.setProperty('direction', 'ltr', 'important')
  //       containerRef.current?.querySelector('input')?.style.setProperty('direction', 'ltr', 'important')
  //     }
  //     else {
  //       containerRef.current?.querySelector('textarea')?.style.setProperty('direction', 'rtl', 'important')
  //       containerRef.current?.querySelector('input')?.style.setProperty('direction', 'rtl', 'important')
  //     }
  //   }
  // }, [props.value])

  return (
    <div
      ref={containerRef}
    >

      <OriginalField
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
