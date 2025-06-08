import type { controller } from '@keystone-6/core/fields/types/select/views'
import type {
  FieldProps,
} from '@keystone-6/core/types'
import { Field as OriginalField } from '@keystone-6/core/fields/types/select/views'
import React, { useEffect, useRef } from 'react'

export function Field(props: FieldProps<typeof controller>) {
  const containerRef = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      if (props.field.displayMode === 'select') {
        containerRef.current.querySelector('label')?.style.setProperty('direction', 'rtl', 'important');
        (containerRef.current.querySelector('label + div') as HTMLElement | null)?.style.setProperty('direction', 'rtl', 'important')

        containerRef.current.querySelectorAll('div').forEach((el) => {
          if (el.id && /-placeholder/.test(el.id)) {
            el.textContent = 'Select an option'
          }
        })
      }

      if (props.field.displayMode === 'segmented-control') {
        containerRef.current.querySelector('fieldset')?.style.setProperty('direction', 'rtl', 'important')
        // (containerRef.current.querySelector('label + div') as HTMLElement | null)?.style.setProperty('direction', 'rtl', 'important')

        // containerRef.current.querySelectorAll('div').forEach((el) => {
        //   if (el.id && /-placeholder/.test(el.id)) {
        //     el.textContent = 'Select options'
        //   }
        // })

        containerRef.current.querySelectorAll('fieldset > div > div').forEach((el, index, arr) => {
          if (index === arr.length - 1) {
            (el as HTMLElement).style.setProperty('margin-left', '0px', 'important');
            (el as HTMLElement).style.setProperty('margin-right', '8px', 'important')

            const elementWithText = (el as HTMLElement).querySelector('span') as HTMLElement | null

            if (elementWithText)
              elementWithText.textContent = ' پاک کردن'
          }
        })
      }
    }
  }, [])

  // use this for more control
  // useEffect(() => {
  //   if (props.value.value?.label) {
  //     if (/\w/.test(props.value.value.label[0]))
  //       containerRef.current?.querySelector('input')?.style.setProperty('direction', 'ltr', 'important')
  //     else
  //       containerRef.current?.querySelector('input')?.style.setProperty('direction', 'rtl', 'important')
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
