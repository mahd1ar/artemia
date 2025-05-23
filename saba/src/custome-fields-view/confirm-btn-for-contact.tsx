/* eslint-disable no-alert */
import type { controller } from '@keystone-6/core/fields/types/checkbox/views'
import type { FieldProps } from '@keystone-6/core/types'
import { Button } from '@keystone-ui/button'
import { FieldContainer } from '@keystone-ui/fields'
import React from 'react'

export function Field({
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

      {/* <FieldLabel>{field.label}</FieldLabel> */}

      <Button onClick={handleClick} tone={value ? 'positive' : 'warning'} disabled={!onChange}>

        {
          value
          && <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M21.03 5.72a.75.75 0 0 1 0 1.06l-11.5 11.5a.747.747 0 0 1-1.072-.012l-5.5-5.75a.75.75 0 1 1 1.084-1.036l4.97 5.195L19.97 5.72a.75.75 0 0 1 1.06 0"></path></svg>
        }
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
