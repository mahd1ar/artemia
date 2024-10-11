import React, { ReactNode } from "react";
import Link from "next/link";
import { CellComponent, CardValueComponent, type FieldProps } from "@keystone-6/core/types";
import { FieldContainer, FieldLabel, TextInput } from "@keystone-ui/fields";

export const CardValue: CardValueComponent = ({ item, field }) => {

  if(!item.title) {
    return  <FieldContainer>
     <div style={{color: 'gray'}} >[هیچ عنوانی مشخص نشده]</div>
    </FieldContainer>
  }
 
  return (
    <FieldContainer>
      <FieldLabel>
        { field.label}
      </FieldLabel>
     {item.title}

    </FieldContainer>
  )
}