import React from 'react'
import Link from 'next/link'
import { type FieldProps } from '@keystone-6/core/types'
import { css } from '@emotion/css'
import { Button } from '@keystone-ui/button'
import { FieldContainer, FieldLabel, TextInput } from '@keystone-ui/fields'
import { MinusCircleIcon, EditIcon } from '@keystone-ui/icons'
import { type controller } from '@keystone-6/core/fields/types/checkbox/views'
import { Fragment, useState } from 'react'
import { Checkbox } from '@keystone-ui/fields'
import { useRouter } from 'next/navigation';

type RelatedLink = boolean | null

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
}

export const Field = ({ field, value, onChange, autoFocus }: FieldProps<typeof controller>) => {
    const [labelValue, setLabelValue] = useState('')
    const [hrefValue, setHrefValue] = useState('')
    const [index, setIndex] = useState<number | null>(null)

    const relatedLinks: RelatedLink = !!value

    const onSubmitNewRelatedLink = () => {
        if (onChange) {
            const relatedLinksCopy = [...relatedLinks, { label: labelValue, href: hrefValue }]
            onChange(JSON.stringify(relatedLinksCopy))
            onCancelRelatedLink()
        }
    }

    const onDeleteRelatedLink = (index: number) => {
        if (onChange) {
            const relatedLinksCopy = [...relatedLinks]
            relatedLinksCopy.splice(index, 1)
            onChange(JSON.stringify(relatedLinksCopy))
            onCancelRelatedLink()
        }
    }

    const onEditRelatedLink = (index: number) => {
        if (onChange) {
            setIndex(index)
            setLabelValue(relatedLinks[index].label)
            setHrefValue(relatedLinks[index].href)
        }
    }

    const onUpdateRelatedLink = () => {
        if (onChange && index !== null) {
            const relatedLinksCopy = [...relatedLinks]
            relatedLinksCopy[index] = { label: labelValue, href: hrefValue }
            onChange(JSON.stringify(relatedLinksCopy))
            onCancelRelatedLink()
        }
    }

    const onCancelRelatedLink = () => {
        setIndex(null)
        setLabelValue('')
        setHrefValue('')
    }

    return (
        <FieldContainer>
            <FieldLabel>{field.label}</FieldLabel>

            <Checkbox
                checked={!!value}
                onChange={event => onChange?.(event.target.checked ? true : false)}
            >
                Check Me
            </Checkbox>


        </FieldContainer>
    )
}