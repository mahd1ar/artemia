/* eslint-disable no-alert */
import type { controller } from '@keystone-6/core/fields/types/checkbox/views'
import type { FieldProps } from '@keystone-6/core/types'
import { Button } from '@keystone-ui/button'
import { Stack } from '@keystone-ui/core'
import { FieldContainer, FieldLabel, TextArea, TextInput } from '@keystone-ui/fields'
import React from 'react'

export function Field({
  field,
  value,
  onChange,
}: FieldProps<typeof controller>) {
  // const keystone = useKeystone()

  function handleClick() {
    if (window.confirm('آیا مطمئن هستید؟'))
      onChange?.(!value)

    setTimeout(() => {
      document.querySelectorAll('button').forEach((i) => {
        if (i.textContent === 'Save changes') {
          if (getComputedStyle(i).cursor === 'pointer')
            i.click()
        }
      })
    }, 500)
  }

  return (

    <FieldContainer>

      <FieldLabel>{field.label}</FieldLabel>

      <Button onClick={handleClick} tone={value ? 'positive' : 'active'} disabled={!onChange}>

        {
          value
            ? `این قرارداد
              تایید
              شده`
            : `تایید این قرارداد`
        }

      </Button>

    </FieldContainer>

  )
}
