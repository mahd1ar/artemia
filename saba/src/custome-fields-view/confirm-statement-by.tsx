import type { controller } from '@keystone-6/core/fields/types/checkbox/views'
import type { FieldProps } from '@keystone-6/core/types'
import { Button } from '@keystone-ui/button'
import { FieldContainer, FieldLabel } from '@keystone-ui/fields'
import { CheckIcon } from '@keystone-ui/icons'
import { AlertDialog } from '@keystone-ui/modals'
import { useToasts } from '@keystone-ui/toast'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'
// import { useChangedFieldsAndDataForUpdate } from "@keystone-6/core/admin-ui/utils"
import { gql, useMutation } from '@apollo/client'

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
        mutation Mutation($id: ID!,$state: Boolean!) {
          updateStatement(where: {id: $id}, data: { ${field.graphqlSelection} : $state}) {
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
      if (i.textContent === 'Save changes') {
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
        variables: { id: pn.split('/').at(-1), state: !value },
      })

      // router.push("/statements");
      router.back()
      setIsOpen(false)
      addToast({ title: 'تایید شد!', tone: 'positive' })
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
            value ? 'این صورت وضیعت تایید شده  ' : ' تایید نهایی این صورت وضعیت'
          }

          {value && (
            <CheckIcon />
          )}

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
