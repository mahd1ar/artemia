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

  let url: string
  try {
    url = item.file.url
  } catch (error) {
    url = ""
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
            <span>Download</span>
            <ArrowDownIcon />
          </Button>
        )


      }

    </FieldContainer>
  )
}