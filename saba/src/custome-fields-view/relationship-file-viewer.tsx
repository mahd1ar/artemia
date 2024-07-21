import React from "react";
import Link from "next/link";
import { CellComponent, CardValueComponent, type FieldProps } from "@keystone-6/core/types";
import { FieldContainer, FieldLabel, TextInput } from "@keystone-ui/fields";
import { Button } from "@keystone-ui/button";
import { CheckIcon, ArrowDownIcon } from "@keystone-ui/icons";
import { css } from "@emotion/css";

const styls = {

  flexcenter: css`
    display: flex;
    gap: 1px;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-center;
    align-items: center;
    `
}

export const CardValue: CardValueComponent = ({ item, field }) => {

  let url: string = ""
  let ext: string = ""

  try {

    url = item.file.url
    ext = item?.file?.filename?.split(".")?.at(-1) || ''
  } catch (error) {
    console.error(error)
  }
  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>

      {
        url && (
          <Button
            onClick={() => window.open(url)}
            className={styls.flexcenter}
          >
            Download {ext} File
            <ArrowDownIcon />
          </Button>
        )


      }

    </FieldContainer>
  )
}