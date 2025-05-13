import type { CardValueComponent } from '@keystone-6/core/types'
import { FieldContainer, FieldLabel } from '@keystone-ui/fields'
import React from 'react'

export const CardValue: CardValueComponent = ({ item, field }) => {
  if (!item.title) {
    return <span></span>
    return (
      <FieldContainer>
        <div style={{ color: 'gray' }}></div>
      </FieldContainer>
    )
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
