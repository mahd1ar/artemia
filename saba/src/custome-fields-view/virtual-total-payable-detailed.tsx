import type { controller } from '@keystone-6/core/fields/types/virtual/views'
import type { FieldProps } from '@keystone-6/core/types'
import { ThemeContext } from '@emotion/react'
import { useKeystone } from '@keystone-6/core/admin-ui/context'
import { FieldContainer, FieldLabel } from '@keystone-ui/fields'
import { Button, Card, CardActions, CardContent, CardMedia, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

// @ts-expect-error: can not find types
import moneyPic from '../../admin/money.jpg'
import { theme } from '../../data/utils'

interface Item {
  id: string
  label: string
}

function valueIsItem(value: any): value is Item[] {
  if (typeof value === 'symbol')
    return false
  if (!Array.isArray(value))
    return false

  if (value.length === 0)
    return true
  return typeof value === 'object' && 'id' in value[0]
}

export function Field({
  field,
  value,
  itemValue,
}: FieldProps<typeof controller>) {
  if (!valueIsItem(value)) {
    return <div>err</div>
  }

  const router = useRouter()

  let totalPrice = 0n

  const rows = value.map((i) => {
    const price = BigInt((itemValue as unknown as {
      [key: string]: { value: string | bigint }
    })[i.id].value || 0)

    totalPrice += price
    return {
      id: i.id,
      label: i.label,
      price,
    }
  })

  function BasicTable(props: {
    items: (Item & { price: bigint })[]
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
          <TableBody>
            {props.items.map(row => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.label}
                </TableCell>
                <TableCell align="right">{row.price.toLocaleString()}</TableCell>
                <TableCell align="right">
                  <Link href="/#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024">
                      <path fill="currentColor" d="M768 256H353.6a32 32 0 1 1 0-64H800a32 32 0 0 1 32 32v448a32 32 0 0 1-64 0z"></path>
                      <path fill="currentColor" d="M777.344 201.344a32 32 0 0 1 45.312 45.312l-544 544a32 32 0 0 1-45.312-45.312z"></path>
                    </svg>
                  </Link>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  return (
    <>
      <FieldContainer>
        <ThemeContext.Provider value={theme}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image={moneyPic.src}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                { totalPrice.toLocaleString() }

                Rials
              </Typography>

              <BasicTable items={rows} />
            </CardContent>
            <CardActions>
              <Button size="small" LinkComponent={Link} href={`/descriptions?%21approvals_matches=%22${router.query.id}%22&fields=subject%2CtotalStatementsPayable%2CtotalInvoicesPayed`}>
                جزئیات
              </Button>
            </CardActions>
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
