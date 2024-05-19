import React, { useEffect } from "react";
import { type FieldProps } from "@keystone-6/core/types";
import { FieldContainer, FieldLabel, Select } from "@keystone-ui/fields";
import { CheckIcon } from "@keystone-ui/icons";
import { type controller } from "@keystone-6/core/fields/types/relationship/views";
import { Fragment, useState } from "react";
import { useQuery, useLazyQuery } from '@apollo/client'
import { gql } from '@ts-gql/tag/no-transform'
// import { useRouter } from "@keystone-6/core/dist/declarations/src/admin-ui/router";
import { useRouter } from "next/router";


type Option = {
  value: string,
  label: string
}

export const Field = ({
  field,
  value,
  onChange,
  autoFocus,
  itemValue,
  forceValidation
}: FieldProps<typeof controller>) => {

  const firstOption: Option = {
    value: '',
    label: 'انتخاب کنید'
  }

  const router = useRouter()
  const [isHidden] = useState(router.pathname.split("/").filter(Boolean).at(0) === 'descriptions')


  const [selectedApproval, setSelectedApproval] = useState<Option>(firstOption)

  const [selectedDescriptoins, setSelectedDescriptoins] = useState<Option>(firstOption)

  const DESCRIPTIONS_OF_APPROVAL_QUERY = gql`
      query DESCRIPTIONS_OF_APPROVAL_QUERY($id: ID!) { 
      descriptions(where: {approvals:{id: {equals: $id}}}) {
        id
        title
      }
    }
` as import('../../__generated__/ts-gql/DESCRIPTIONS_OF_APPROVAL_QUERY').type

  const APPROVALS_Q = gql`
        query APPROVALS_Q {
          approvals {
            id
            title
          } 
      }`  as import('../../__generated__/ts-gql/APPROVALS_Q').type

  const DESCRIPTION_APPROVAL_Q = gql`
        query DESCRIPTION_APPROVAL_Q($id: ID!) {
          description(where: {id: $id}) {
            id
            title
            approvals {
              id
              title
            }
          } 
      }`  as import('../../__generated__/ts-gql/DESCRIPTION_APPROVAL_Q').type

  const { data } = useQuery(APPROVALS_Q)
  const [load, { data: dataApprovalDescriptions }] = useLazyQuery(DESCRIPTION_APPROVAL_Q)
  const [loadCoresponsiveDescriptions, { data: dataDescriptions }] = useLazyQuery(DESCRIPTIONS_OF_APPROVAL_QUERY)

  useEffect(() => {

    if (value && value.initialValue) {
      {
        load({ variables: value.initialValue })
          .then(res => {

            const id = res.data?.description?.approvals?.id
            const title = res.data?.description?.approvals?.title

            if (id && title) {
              setSelectedApproval({ label: title || '', value: id })
              loadCoresponsiveDescriptions({ variables: { id } })
              setSelectedDescriptoins({ label: res.data?.description?.title || '', value: res.data?.description?.id || '' })
            }



          })

      }
    }
  }, [data])



  async function onChangeApproval(option: Option) {
    setSelectedApproval(option)
    const res = await loadCoresponsiveDescriptions({ variables: { id: option.value } })
    if (res.data?.descriptions) {
      setSelectedDescriptoins(
        firstOption
      )

    }
    else
      alert("ERROR - no coresponsive descriptions")
  }

  async function onChangeDescription(option: Option) {
    setSelectedDescriptoins(option)
    onChange?.({
      value: {
        id: option.value,
        label: option.label,
      },
      kind: 'one',
      id: value.id,
      initialValue: value.initialValue
    })
  }


  return (
    <>
      {!isHidden &&

        <FieldContainer>
          <FieldLabel>{field.label}</FieldLabel>

          <Select onChange={onChangeApproval} value={selectedApproval}
            options={data?.approvals?.map((i: any) => ({ label: i.title || '-', value: i.id })) || []}
            isDisabled={!onChange}
          />

          {dataDescriptions &&
            (
              <Select
                isDisabled={!onChange}
                css={{ marginTop: '0.5rem' }}
                onChange={onChangeDescription}
                value={selectedDescriptoins}
                options={dataDescriptions?.descriptions?.map((i: any) => ({ label: i.title || '-', value: i.id })) || []}
              />
            )}

        </FieldContainer>
      }

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
