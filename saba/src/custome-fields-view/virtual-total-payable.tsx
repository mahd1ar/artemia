import type { controller } from '@keystone-6/core/fields/types/virtual/views'
import type { CellComponent, FieldProps } from '@keystone-6/core/types'
import { ThemeContext } from '@emotion/react'
import { CellContainer, CellLink } from '@keystone-6/core/admin-ui/components'
import { FieldContainer, FieldLabel } from '@keystone-ui/fields'
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { green, teal } from '@mui/material/colors'
import Link from 'next/link'
import { useRouter } from 'next/router'

import React from 'react'
// @ts-expect-error: can not find types
import moneyPic from '../../admin/money.jpg'
import { NumUtils, theme } from '../../data/utils'

export function Field({
  field,
  value,
}: FieldProps<typeof controller>) {
  if (typeof value === 'symbol') {
    return null
  }

  const router = useRouter()

  return (
    <>
      <FieldContainer>
        <ThemeContext.Provider value={theme}>
          <Card sx={{ maxWidth: 345, backgroundColor: teal[600] }}>
            {/* <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image={moneyPic.src}
            /> */}
            <CardContent>

              <Typography gutterBottom variant="h4" component="div" sx={{ color: green[50] }}>
                {value && Intl.NumberFormat('en').format(value)}
&nbsp;Rials
              </Typography>
              <Typography variant="body2" sx={{ color: green[100] }}>

                {field.label}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" sx={{ color: green[50], fontWeight: 'bold' }} LinkComponent={Link} href={`/descriptions?%21approvals_matches=%22${router.query.id}%22&fields=subject%2CtotalStatementsPayable%2CtotalInvoicesPayed`}>
                جزئیات
              </Button>
            </CardActions>
          </Card>
        </ThemeContext.Provider>
      </FieldContainer>

    </>
  )
}

export const Cell: CellComponent = ({ item, field, linkTo }) => {
  const value = `${item[field.path]}`
  return linkTo
    ? <CellLink {...linkTo}>{value}</CellLink>
    : (
        <CellContainer>
          {
            value !== 'null' ? NumUtils.format(+(value)) : '0'
          }
        </CellContainer>
      )
}
Cell.supportsLinkTo = true
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
