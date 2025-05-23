import type { controller } from '@keystone-6/core/fields/types/virtual/views'
import type { FieldProps } from '@keystone-6/core/types'
import { ThemeContext } from '@emotion/react'
import { FieldContainer } from '@keystone-ui/fields'
import { Card, CardContent, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import { green, teal } from '@mui/material/colors'
// import Link from 'next/link'
import React from 'react'
import { theme } from '../../data/utils'
// import moneyPic from '../../admin/money.jpg'

function displayNumber(input: number | string): string {
  try {
    return (+input).toLocaleString()
  }
  catch {
    return input as string
  }
}

function $t(key?: string) {
  if (key) {
    switch (key) {
      case 'percentageOfPhysicalProgress':
        return 'درصد پیشرفت فیزیکی'

      case 'totalStatementsPayed':
        return 'پرداخت شده صورت وضعیت ها'

      case 'totalInvoicesPayed':
        return 'پرداخت شده فاکتور ها'

      case 'totalPayed':
        return 'مجموع پرداختی'

      default:
        break
    }
  }

  return key || '-'
}

function BasicTable(props: {
  items: string[][]
}) {
  return (
    // <TableContainer component={Paper}>
    <TableContainer>
      <Table size="small" aria-label="simple table">
        {/* <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead> */}
        <TableBody dir="rtl">
          {props.items.map((row, index) => (
            <TableRow
              dir="rtl"
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="right" sx={{ color: green[50] }}>
                {$t(row.at(0))}
              </TableCell>
              <TableCell dir="ltr" sx={{ color: green[50] }} align="left">{displayNumber(row?.at(1) || 0)}</TableCell>
              {/* <TableCell align="right">
                <Link style={{ color: green[50] }} href="/#">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024">
                    <path fill="currentColor" d="M768 256H353.6a32 32 0 1 1 0-64H800a32 32 0 0 1 32 32v448a32 32 0 0 1-64 0z"></path>
                    <path fill="currentColor" d="M777.344 201.344a32 32 0 0 1 45.312 45.312l-544 544a32 32 0 0 1-45.312-45.312z"></path>
                  </svg>
                </Link>
              </TableCell> */}

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export function Field({
  value,
}: FieldProps<typeof controller>) {
  return (
    <>
      <FieldContainer>
        <ThemeContext.Provider value={theme}>
          <Card dir="rtl" sx={{ backgroundColor: teal[600], color: green[100] }}>

            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                وضعیت ساختار شکست
              </Typography>

              <BasicTable items={Object.entries(value)} />
            </CardContent>

          </Card>
        </ThemeContext.Provider>
      </FieldContainer>

    </>
  )
}
// const onSubmitNewRelatedLink = () => {
//     if (onChange) {
//         const relatedLinksCopy = [...relatedLinks, { label: labelValue, href: hrefValue }]
//         onChange(JSON.stringify(relatedLinksCopy))
//         onCancelRelatedLink()
//     }
// }

// const onDeleteRelatedLink = (index: number) => {
//     if (onChange) {
//         const relatedLinksCopy = [...relatedLinks]
//         relatedLinksCopy.splice(index, 1)
//         onChange(JSON.stringify(relatedLinksCopy))
//         onCancelRelatedLink()
//     }
// }

// const onEditRelatedLink = (index: number) => {
//     if (onChange) {
//         setIndex(index)
//         setLabelValue(relatedLinks[index].label)
//         setHrefValue(relatedLinks[index].href)
//     }
// }

// const onUpdateRelatedLink = () => {
//     if (onChange && index !== null) {
//         const relatedLinksCopy = [...relatedLinks]
//         relatedLinksCopy[index] = { label: labelValue, href: hrefValue }
//         onChange(JSON.stringify(relatedLinksCopy))
//         onCancelRelatedLink()
//     }
// }

// const onCancelRelatedLink = () => {
//     setIndex(null)
//     setLabelValue('')
//     setHrefValue('')
// }
