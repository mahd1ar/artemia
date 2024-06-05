
/**
 * this is experimental
 */


import React from "react";
import { CellComponent } from "@keystone-6/core/types";
import { CellContainer, CellLink } from "@keystone-6/core/admin-ui/components";
import Link from "next/link";
import { type FieldProps } from "@keystone-6/core/types";
import { FieldContainer, FieldLabel, TextInput } from "@keystone-ui/fields";
import { type controller } from "@keystone-6/core/fields/types/calendarDay/views";
import DatePicker, { DateObject } from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import TimePicker from 'react-multi-date-picker/plugins/time_picker'
import { jsx, Inline, Stack, Text } from '@keystone-ui/core'


export const Field = ({
  field,
  value,
  onChange,
  autoFocus,
  itemValue,
  forceValidation
}: FieldProps<typeof controller>) => {


  const [date, setDate] = React.useState(
    value.value ? new Date(value.value) : null
  )

  function changeTime(event: DateObject | DateObject[] | null) {

    // console.log(field.fieldMeta)
    let unix: string | null = null
    if (Array.isArray(event) === false && event && event?.unix) {


      unix = new Date(event.unix * 1000)


    }
    console.log(value)
    if (value.kind === 'update') {
      onChange?.({
        kind: 'update',
        value: unix!,
        initial: null
      })
    }

    // setDate(null)
  }

  return (
    <>
      <FieldContainer>
        <FieldLabel>{field.label}</FieldLabel>

        <div>
          <div>
            {/* {props.value} */}

            <div
              style={{
                display: 'flex',
                justifyItems: 'center'
              }}
              className='styled'
            >
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
                value={date ? date.getTime() : null}
                format='DD/MM/YYYY HH:mm:ss'
                calendar={persian}
                locale={persian_fa}
                onChange={e => changeTime(e)}
              />
              {/* plugins={[<TimePicker position='bottom' />]} */}
              <button
                style={{
                  margin: '1px 4px',
                  appearance: 'none',
                  backgroundColor: 'rgb(239, 243, 246)',
                  borderColor: '#e1e5e9',
                  borderRadius: '6px',
                  borderStyle: 'solid',
                  borderWidth: '1px',
                  boxSizing: 'border-box',
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
                  display: 'inline-flex',
                  alignItems: 'center',
                  color: 'rgb(107, 114, 128)',
                  cursor: 'pointer'
                }}
                onClick={() => changeTime(null)}
              >
                {/* clear */}
                <svg width='24' height='24' viewBox='0 0 24 24'>
                  <path
                    fill='currentColor'
                    d='M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

      </FieldContainer>

    </>
  );
};

export const Cell: CellComponent = ({ item, field, linkTo }) => {
  let value = item[field.path]
  if (value)
    value =
      new Date(value).toLocaleDateString("fa-IR", { dateStyle: 'full' })

  return linkTo ? <CellLink {...linkTo}>{value}</CellLink> : <CellContainer>{value}</CellContainer>
}
Cell.supportsLinkTo = true