import React from "react";
import { CellComponent } from "@keystone-6/core/types";
import { CellContainer, CellLink } from "@keystone-6/core/admin-ui/components";



export const Cell: CellComponent = ({ item, field, linkTo }) => {
  let value = item[field.path]
  if (value)
    value =
      new Date(value).toLocaleDateString("fa-IR", { dateStyle: 'full' })

  return linkTo ? <CellLink {...linkTo}>{value}</CellLink> : <CellContainer>{value}</CellContainer>
}
Cell.supportsLinkTo = true