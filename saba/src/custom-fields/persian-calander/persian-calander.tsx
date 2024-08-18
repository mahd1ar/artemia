import React, { useState, ChangeEvent } from 'react'
import DatePicker, { DateObject } from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import TimePicker from 'react-multi-date-picker/plugins/time_picker'
import { jsx, Inline, Stack, Text } from '@keystone-ui/core'
import { Button } from '@keystone-ui/button'
import { DeleteIcon } from "@keystone-ui/icons"

type JCalendarInputProps = {
  value: number | null
  onChange?: (value: number | null) => void
}

export function JCalendarInput(props: JCalendarInputProps) {
  const changeTime = (event: DateObject | DateObject[] | null) => {
    if (Array.isArray(event) === false)
      if (event)
        // @ts-ignore
        props.onChange?.(event?.unix)
      else props.onChange?.(null)
  }

  return (
    <div>
      <div>
        {/* {props.value} */}

        <div style={{ display: "flex", gap: '4px' }} >
          <DatePicker
            style={{
              appearance: 'none',
              backgroundColor: '#fafbfc',
              borderColor: '#e1e5e9',
              borderRadius: '6px',
              borderStyle: 'solid',
              borderWidth: '1px',
              boxSizing: 'border-box',
              color: '#374151',
              fontSize: '1rem',
              height: '38px',
              lineHeight: '38px',
              outline: 0,
              paddingBottom: 0,
              paddingLeft: '12px',
              paddingRight: '12px',
              paddingTop: 0,
              resize: 'vertical',
              transition:
                'background-color 130ms,box-shadow 130ms,border-color 130ms',
              width: '100%'
            }}
            value={props.value ? new Date(props.value * 1000) : null}
            format='YYYY / MM / DD'
            calendar={persian}
            locale={persian_fa}
            onChange={changeTime}
          />
          {/* plugins={[<TimePicker position='bottom' />]} */}
          <Button onClick={() => changeTime(null)} >
            <DeleteIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}
