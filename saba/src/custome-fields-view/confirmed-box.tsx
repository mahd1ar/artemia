import type { controller } from '@keystone-6/core/fields/types/checkbox/views'
import type { FieldProps } from '@keystone-6/core/types'
import { gql, useMutation } from '@apollo/client'
import { Button } from '@keystone-ui/button'
import { FieldContainer, FieldLabel } from '@keystone-ui/fields'
import { CheckIcon } from '@keystone-ui/icons'
import { AlertDialog } from '@keystone-ui/modals'
import { useToasts } from '@keystone-ui/toast'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'

export function Field({
  field,
  value,
  onChange,
}: FieldProps<typeof controller>) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const router = useRouter()
  const { addToast } = useToasts()
  const pn = usePathname()

  const [update] = useMutation(gql`
        mutation Mutation($id: ID!) {
          updateStatement(where: {id: $id}, data: { confirmedByTheUploader : true}) {
            id
          } 
      }
      `,
  )

  async function tryConfirm() {
    if (value) {
      onChange?.(false)
      isOpen && setIsOpen(false)

      return
    }

    let flag = false
    document.querySelectorAll('button').forEach((i) => {
      if (i.textContent?.trim() === 'Save changes') {
        if (getComputedStyle(i).cursor === 'pointer')
          flag = true
      }
    })
    if (flag) {
      setIsOpen(false)
      addToast({ title: 'لطفا قبل از ثبت نهایی تغییرات را ذخیره کنید', tone: 'negative' })
      return
    }
    // alert("go home");
    const id = pn.split('/').at(-1)

    if (id) {
      await update({
        variables: { id: pn.split('/').at(-1) },
      })
      router.push('/statements')
      setIsOpen(false)
      addToast({ title: 'Confirmed', tone: 'positive' })
    }
    // onChange?.(true)
    // if (forceValidation)
  }

  return (
    <>
      <FieldContainer>
        <FieldLabel>{field.label}</FieldLabel>

        <Button
          tone={value ? 'passive' : 'active'}
          onClick={() => setIsOpen(true)}
        // disabled={value}
        >
          {
            value ? 'این صورت وضعیت ثبت شده' : ' ثبت نهایی این صورت وضعیت'
          }

          {value && (
            <CheckIcon />
          )}

          {/* <Checkbox
            checked={!!value}
            onChange={(event) => onChange?.(event.target.checked ? true : false)}
          >
            Check Me
          </Checkbox> */}

        </Button>

      </FieldContainer>
      <AlertDialog
        title="confirm"
        isOpen={isOpen}
        actions={{
          cancel: {
            action: () => {
              setIsOpen(false)
            },
            label: 'Cancel',
          },
          confirm: {
            action: () => {
              tryConfirm()
            },
            label: 'Done',
          },
        }}
      >
        {!value

          ? (
              <h4 dir="rtl">
                آیا از ثبت نهایی این صورت وضعیت مطمین هستید؟
              </h4>
            )
          : (
              <h4 dir="rtl">
                آیا مطمئن هستید که تأیید صورت وضعیت را لغو می کنید؟
              </h4>
            )}
      </AlertDialog>
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
