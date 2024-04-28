import React from "react";
import Link from "next/link";
import { type FieldProps } from "@keystone-6/core/types";
import { css } from "@emotion/css";
import { Button } from "@keystone-ui/button";
import { AlertDialog } from "@keystone-ui/modals";
import { FieldContainer, FieldLabel, TextInput } from "@keystone-ui/fields";
import { MinusCircleIcon, EditIcon, CheckIcon } from "@keystone-ui/icons";
import { type controller } from "@keystone-6/core/fields/types/checkbox/views";
import { Fragment, useState } from "react";
import { Checkbox } from "@keystone-ui/fields";
import { useRouter } from "next/navigation";
import { useChangedFieldsAndDataForUpdate, useInvalidFields } from "@keystone-6/core/admin-ui/utils"
import { useList } from "@keystone-6/core/admin-ui/context"
// import { useChangedFieldsAndDataForUpdate } from "@keystone-6/core/admin-ui/utils"


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
  console.log(itemValue.tax.value.value)
  // for (let i in itemValue) {
  //   console.log(i)
  //   console.log(itemValue[i].value)
  // }

  const list = useList('Statement')

  // console.log(list.fields.tax.controller)

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  console.log({ forceValidation })


  function tryConfirm() {

    useChangedFieldsAndDataForUpdate(list.fields, itemValue)
    // alert("go home");
    // router.push("/");
    setIsOpen(false);
    onChange?.(true)
    // if (forceValidation)
  }


  return (
    <>
      <FieldContainer>
        <FieldLabel>{field.label}</FieldLabel>

        <Button
          tone={value ? 'positive' : 'passive'}
          onClick={() => setIsOpen(true)}
          disabled={value}
        >
          {
            value ? 'Confirm values' : 'Done'
          }
          {value && (
            <CheckIcon />
          )}
        </Button>
        <Checkbox
          checked={!!value}
          onChange={(event) => onChange?.(event.target.checked ? true : false)}
        >
          Check Me
        </Checkbox>
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
        <h2>Are you sure?</h2>
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
