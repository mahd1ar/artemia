import React from "react";
import Link from "next/link";
import { CellComponent, type FieldProps } from "@keystone-6/core/types";
import { css } from "@emotion/css";
import { FieldContainer, FieldLabel, TextInput } from "@keystone-ui/fields";
import { type controller } from "@keystone-6/core/fields/types/virtual/views";
import { CellContainer, CellLink } from '@keystone-6/core/admin-ui/components';
import { NumUtils } from '../../data/utils'

export const Field = ({
  field,
  value,
  onChange,
  autoFocus,
  itemValue,
  forceValidation
}: FieldProps<typeof controller>) => {

  const styls = {

    greenText: css`
    color: #374151;
    font-weight: 500;
    display: flex;
    gap: 4px;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    `
  }

  return (
    <>
      <FieldContainer>
        <FieldLabel>{field.label}</FieldLabel>
        {value ?
          (
            <div className={styls.greenText} >
              <span style={{ fontSize: '14px' }} >
                ریال
              </span>
              <span style={{ fontSize: '17px' }} >

                {typeof value === 'number' ? Intl.NumberFormat('us-en').format(value) : ''}
              </span>
            </div>
          ) :
          <div> - </div>
        }
      </FieldContainer>

    </>
  );
};


export const Cell: CellComponent = ({ item, field, linkTo }) => {

  let value = item[field.path] + ''
  return linkTo ? <CellLink {...linkTo}>{value}</CellLink> : <CellContainer>{
    value !== 'null' ? NumUtils.format(+(value)) : '0'
  }</CellContainer>

}
Cell.supportsLinkTo = true