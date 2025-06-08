import type { controller } from '@keystone-6/core/fields/types/bigInt/views'
import type {
  FieldProps,
} from '@keystone-6/core/types'
import { Field as OriginalField } from '@keystone-6/core/fields/types/bigInt/views'
import React, { useEffect, useRef } from 'react'

export function Field(props: FieldProps<typeof controller>) {
  const containerRef = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.querySelector('label')?.style.setProperty('direction', 'rtl', 'important')
    }
  }, [])

  // useEffect(() => {
  //   const v = typeof props.value.value === 'bigint' ? props.value.value.toString().replaceAll(',', '') : props.value.value?.replaceAll(',', '')

  //   if (v && +v) {
  //     const input = containerRef.current?.querySelector('input') as HTMLInputElement | null
  //     if (input) {
  //       setTimeout(() => {
  //         input.value = (+v).toLocaleString('en-US')
  //       }, 100)
  //     }
  //   }
  // }, [props.value])

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
        onChange={(nval) => {
          // if (typeof nval.value === 'string')
          //   nval.value = nval.value.toString().replaceAll(',', '')

          return props.onChange ? props.onChange(nval) : undefined
        }}
        forceValidation={props.forceValidation}
      />
    </div>
  )
}
