import React from "react";
import Link from "next/link";
import { type FieldProps } from "@keystone-6/core/types";
import { FieldContainer, FieldLabel, TextInput } from "@keystone-ui/fields";
import { type controller } from "@keystone-6/core/fields/types/virtual/views";
// import { type controller } from "@keystone-6/core/fields/types/relationship/views";
import SimpleTable from './simple-table'
import { useList } from "@keystone-6/core/admin-ui/context";

export const Field = ({
  field,
  value,
  onChange,
  autoFocus,
  itemValue,
  forceValidation
}: FieldProps<typeof controller>) => {

  const StatementItemList = useList('StatementItem')

  if (!value || value.length === 0) return <div>null</div>

  const h = Object.keys(value[0])

  const headers = h.map(i => {
    return i in StatementItemList.fields ? { label: StatementItemList.fields[i].label, value: i } : { label: i, value: i }
  })

  if (!value) value = []
  // 
  const units = StatementItemList.fields.unit.fieldMeta!.options as { value: string, label: string }[]

  value = value.map((i: Record<string, string>) => {
    const unit = units.find(j => j.value === i.unit)?.label || 'xx'
    return { ...i, unit }
  })

  return (
    <>
      <FieldContainer>
        <FieldLabel>{field.label}</FieldLabel>

        <SimpleTable headers={headers} data={value} />

      </FieldContainer>

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
