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

import StepperProgress from "./stepper-progress";
import { Match } from "../../data/match";

type Value = {
  ok: boolean,
  data: { key: string, value: boolean, isCurrent: boolean }[]
}

export const Field = ({
  field,
  value,
  onChange,
  autoFocus,
  itemValue,
  forceValidation
}: FieldProps<typeof controller>) => {


  const dataItems = (value as Value).data
    .map((i) => ({
      dataDesc: Match.AclRole(i.key),
      isDone: i.value,
      isCurrent: i.isCurrent
    }))
    .sort((a, b) => +b.isDone - +a.isDone)

  return (
    <>
      <FieldContainer>
        <FieldLabel>{field.label}</FieldLabel>
        <div>
          < StepperProgress dataItems={dataItems} />

        </div>



      </FieldContainer>

    </>
  );
};

function statementStatusToEmije(items?: Value['data']) {
  return items?.map(i => i.value ? '✅' : '⬜') || ''
}

export const Cell: CellComponent = ({ item, field, linkTo }) => {
  let value = (item[field.path] as Value)?.data

  return linkTo ? <CellLink {...linkTo}>{statementStatusToEmije(value)}</CellLink> : <CellContainer>{
    statementStatusToEmije(value)
  }</CellContainer>

}
Cell.supportsLinkTo = true