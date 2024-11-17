import type { controller } from '@keystone-6/core/fields/types/virtual/views'
import type { FieldProps } from '@keystone-6/core/types'
import { css } from '@emotion/css'
import { Button } from '@keystone-ui/button'
import { Checkbox, FieldContainer, FieldLabel, TextInput } from '@keystone-ui/fields'
import { CheckIcon } from '@keystone-ui/icons'
import { AlertDialog } from '@keystone-ui/modals'
import { useToasts } from '@keystone-ui/toast'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { Fragment, useState } from 'react'

export function Field({
  field,
  value,
}: FieldProps<typeof controller>) {
  if (typeof value === 'symbol')
    return <div>.</div>

  if (Array.isArray(value) === false)
    return <div>[x] is not array</div>

  return (
    <>
      <FieldContainer>
        <FieldLabel>{field.label}</FieldLabel>
        {
          value.map((item, index) => {
            return (
              <div key={index}>
                <Link href={item.href}>{item.label}</Link>
              </div>
            )
          })
        }

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
