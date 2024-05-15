import React from "react";
import Link from "next/link";
import { type FieldProps } from "@keystone-6/core/types";
import { css } from "@emotion/css";
import { Button } from "@keystone-ui/button";
import { AlertDialog } from "@keystone-ui/modals";
import { FieldContainer, FieldLabel, TextInput } from "@keystone-ui/fields";
import { CheckIcon } from "@keystone-ui/icons";
import { type controller } from "@keystone-6/core/fields/types/checkbox/views";
import { Fragment, useState } from "react";
import { Checkbox } from "@keystone-ui/fields";
import { useRouter, usePathname } from "next/navigation";
import { useToasts } from "@keystone-ui/toast"
// import { useChangedFieldsAndDataForUpdate } from "@keystone-6/core/admin-ui/utils"
import { gql, useMutation } from '@apollo/client'
import axios from "axios";


const styles = {
  form: {
    field: css`
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      width: 100%;
      margin: 1rem 0 0 0;
    `,
    label: css`
      width: 10%;
    `,
    input: css`
      width: 90%;
    `,
    button: css`
      margin: 1rem 0.5rem 0 0;
    `,
  },
  list: {
    ul: css`
      list-style: none;
      margin: 1rem 0 0 0;
      padding: 0;
    `,
    li: css`
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      width: 100%;

      &:nth-of-type(2n) > div:nth-of-type(1) {
        background-color: white;
      }
    `,
    data: css`
      background-color: #eff3f6;
      padding: 0.5rem;
      flex: auto;
      display: flex;
      align-items: flex-start;
      flex-wrap: nowrap;
    `,
    dataLabel: css`
      width: 40%;
    `,
    dataHref: css`
      width: 60%;
    `,
    optionButton: css`
      margin: 0 0 0 0.5rem;
    `,
  },
};

export const Field = ({
  field,
  value,
  onChange,
  autoFocus,
  itemValue,
  forceValidation
}: FieldProps<typeof controller>) => {


  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const { addToast } = useToasts()
  const pn = usePathname();

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
      isOpen && setIsOpen(false);

      return
    }

    let flag = false
    document.querySelectorAll('button').forEach(i => {
      if (i.innerText === 'Save changes') {
        if (getComputedStyle(i).cursor === 'pointer')
          flag = true
      }
    })
    if (flag) {
      setIsOpen(false);
      addToast({ title: "لطفا قبل از ثبت نهایی تغییرات را ذخیره کنید", tone: "negative" })
      return
    }
    // alert("go home");
    const id = pn.split('/').at(-1)

    if (id) {

      const res = await update({
        variables: { "id": pn.split('/').at(-1) }
      })
      console.log(res)
      router.push("/statements");
      setIsOpen(false);
      addToast({ title: "Confirmed", tone: "positive" })

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
            value ? 'این صورت وضعیت تایید شده' : ' ثبت نهایی این صورت وضعیت'
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
              setIsOpen(false);
            },
            label: "Cancel",
          },
          confirm: {
            action: () => {
              tryConfirm()
            },
            label: "Done",
          },
        }}
      >
        {!value ?

          <h4 dir="rtl" >
            آیا از ثبت نهایی این صورت وضعیت مطمین هستید؟
          </h4>
          :
          <h4 dir="rtl" >
            آیا مطمئن هستید که تأیید صورت وضعیت را لغو می کنید؟
          </h4>
        }
      </AlertDialog>
    </>
  );
};
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
