import type { controller } from '@keystone-6/core/fields/types/relationship/views'
import type { FieldProps } from '@keystone-6/core/types'
import { useLazyQuery, useQuery } from '@apollo/client'
import { ThemeProvider } from '@emotion/react'
import { FieldContainer, FieldLabel, Select } from '@keystone-ui/fields'
import { CheckIcon } from '@keystone-ui/icons'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import DraftsIcon from '@mui/icons-material/Drafts'

import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import SendIcon from '@mui/icons-material/Send'
import StarBorder from '@mui/icons-material/StarBorder'
import { ListItemSecondaryAction } from '@mui/material'
import Collapse from '@mui/material/Collapse'
import { red } from '@mui/material/colors'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import { gql } from '@ts-gql/tag/no-transform'
import { useRouter } from 'next/router'
import React, { Fragment, useEffect, useState } from 'react'
import { theme } from '../../data/utils'

export function Field({
  field,
  value,
}: FieldProps<typeof controller>) {
  if (typeof value === 'symbol')
    return null

  if (value.kind !== 'many')
    return <div>relationship kind is not cards-view </div>

  const router = useRouter()

  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      <ThemeProvider theme={theme}>
        <List
          sx={{ width: '100%', bgcolor: '#f5f5f5', borderRadius: 1, border: '1px solid #e1e5e9' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          {
            value.value.map(i => (

              <ListItemButton
                onClick={() => router.push(`/descriptions/${i.id}`)}
                key={i.id}

              >
                <ListItemIcon>
                  <FolderOpenIcon color="info" />
                </ListItemIcon>
                <ListItemText primary={i.label} />
                <ListItemSecondaryAction>
                  <ChevronRight fontSize="small" />
                </ListItemSecondaryAction>
              </ListItemButton>
            ))
          }

        </List>
      </ThemeProvider>

    </FieldContainer>

  )
}
