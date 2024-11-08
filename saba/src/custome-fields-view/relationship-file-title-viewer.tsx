import React, { ReactNode } from "react";
import Link from "next/link";
import { CellComponent, CardValueComponent, type FieldProps } from "@keystone-6/core/types";
import { FieldContainer, FieldLabel, TextInput } from "@keystone-ui/fields";

export const CardValue: CardValueComponent = ({ item, field }) => {

  if(!item.title) {
    return <span></span>
    return  <FieldContainer>
     <div style={{color: 'gray'}} ></div>
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