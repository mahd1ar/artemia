import type { controller } from '@keystone-6/core/fields/types/virtual/views'
import type { FieldProps } from '@keystone-6/core/types'
import { FieldContainer, FieldLabel } from '@keystone-ui/fields'
import Link from 'next/link'
import React from 'react'
// import { useChangedFieldsAndDataForUpdate } from "@keystone-6/core/admin-ui/utils"

export function Field({
  field,
  value,
}: FieldProps<typeof controller>) {
  let len = '-'

  try {
    len = String(value.length || 0)
  }
  catch {

  }

  return (
    <>
      <FieldContainer>
        <FieldLabel>{field.label}</FieldLabel>
        <div dir="rtl">

          <span>
            نقشه های بارگذاری شده:
          </span>

          <b>
            {len}
          </b>
          <span>
            عدد
          </span>
        </div>

        {value && Array.isArray(value) && value.map((i: any, index: number) => {
          return (
            <div>
              {index + 1}
              .
              <Link
                download={i.name}
                href={i.url}
                target="_blank"
                rel="noreferrer"
              >
                {i.name}
              </Link>
            </div>
          )
        })}

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
