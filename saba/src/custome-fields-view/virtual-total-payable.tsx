import type { controller } from '@keystone-6/core/fields/types/virtual/views'
import type { FieldProps } from '@keystone-6/core/types'
import { ThemeContext } from '@emotion/react'
import { FieldContainer, FieldLabel } from '@keystone-ui/fields'
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
// @ts-expect-error: can not find types
import moneyPic from '../../admin/money.jpg'

import { theme } from '../../data/utils'

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
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image={moneyPic.src}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {value && Intl.NumberFormat('en').format(value)}

                Rials
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {/* Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica */}
                {field.label}
              </Typography>
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
