import React from "react";
import Link from "next/link";
import { CellComponent, type FieldProps } from "@keystone-6/core/types";
import { css } from "@emotion/css";
import { Button } from "@keystone-ui/button";
import { AlertDialog } from "@keystone-ui/modals";
import { FieldContainer, FieldLabel, TextInput } from "@keystone-ui/fields";
import { CheckIcon } from "@keystone-ui/icons";
import { type controller } from "@keystone-6/core/fields/types/virtual/views";
import { Fragment, useState } from "react";
import { Checkbox } from "@keystone-ui/fields";
import { useRouter, usePathname } from "next/navigation";
import { useToasts } from "@keystone-ui/toast"
// import { useChangedFieldsAndDataForUpdate } from "@keystone-6/core/admin-ui/utils"
import { gql, useMutation } from '@apollo/client'
import axios from "axios";
import { CellContainer, CellLink } from "@keystone-6/core/admin-ui/components";



export const Field = ({
  field,
  value,
  onChange,
  autoFocus,
  itemValue,
  forceValidation
}: FieldProps<typeof controller>) => {

  console.log(Object.entries(value))
  return (
    <>
      <FieldContainer>
        <FieldLabel>{field.label}</FieldLabel>

        <div>


          {
            Object.entries(value).slice(1).map(i => {
              return <div>{i[0]} : {!!i[1] ? '✅' : '❌'}</div>
            })
          }


        </div>



      </FieldContainer>

    </>
  );
};

function statementStatusToEmije(item?: Record<string, any>) {
  return item ? Object.entries(item).slice(1).map(i => (i[1] ? '✅' : '❌')).join('') : ''
}

export const Cell: CellComponent = ({ item, field, linkTo }) => {
  let value = item[field.path] as Record<string, any>

  return linkTo ? <CellLink {...linkTo}>{statementStatusToEmije(value)}</CellLink> : <CellContainer>{
    statementStatusToEmije(value)
  }</CellContainer>

}
Cell.supportsLinkTo = true