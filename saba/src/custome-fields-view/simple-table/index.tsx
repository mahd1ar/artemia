import React from 'react'
import './main.scss'

interface TableProps {

  headers: { label: string, value: string }[]
  data: Array<Record<string, string>>
}

export default function (props: TableProps) {
  return (
    <div dir="rtl">

      <table id="customers">
        <thead>

          <tr>
            {
              props.headers.map((i, index) => <th key={index}>{i.label}</th>)
            }
          </tr>
        </thead>
        <tbody>

          {props.data.map((i, index) => (
            <tr key={index}>

              {
                props.headers.map((j, jindex) => (
                  <td key={jindex}>
                    {+i[j.value] ? Intl.NumberFormat('fa-IR').format(+i[j.value]) : i[j.value]}
                  </td>
                ))
              }
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  )
}
