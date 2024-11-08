import { ThemeProvider } from '@emotion/react'
import { CreateItemDrawer } from '@keystone-6/core/admin-ui/components'
import { useList } from '@keystone-6/core/admin-ui/context'
import type { controller } from '@keystone-6/core/fields/types/relationship/views'
import type { FieldProps } from '@keystone-6/core/types'
import { Button } from '@keystone-ui/button'
import { Stack } from '@keystone-ui/core'
import { FieldContainer, FieldLabel } from '@keystone-ui/fields'
import { DrawerController } from '@keystone-ui/modals'
import { ChevronRight } from '@mui/icons-material'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import { ListItemSecondaryAction } from '@mui/material'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { theme } from '../../data/utils'


export function Field({
  field,
  value,
  onChange
}: FieldProps<typeof controller>) {
  if (typeof value === 'symbol')
    return null

  if (value.kind !== 'many' )
    return <div>relationship kind is not supported :/ </div>


  // const keystone = useKeystone()
  // const localList = useList(field.listKey)
  const foreignList = useList(field.refListKey)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  
  const router = useRouter()

  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>

      <Stack
      gap="small"
      // across
      >
      <ThemeProvider theme={theme}>
        <List
          sx={{ width: '100%', bgcolor: '#fafbfc', borderRadius: 1, border: '1px solid #e1e5e9' , p:0 }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          {
            value?.value?.map(i => (

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
<Button
onClick={() => setIsDrawerOpen(true)}
>
  
  اضافه کردن
          
          &nbsp;
          {foreignList.label }
          &nbsp;
          
          جدید

</Button>
</Stack>
      {onChange !== undefined && (<DrawerController isOpen={isDrawerOpen}>
        <CreateItemDrawer

          listKey={foreignList.key}
          onClose={() => {
            setIsDrawerOpen(false)
          }}
          onCreate={val => {
            setIsDrawerOpen(false)
            if (value.kind === 'many') {
              onChange({
                ...value,
                value: [...value.value, val],
              })
            } 
            // else if (value.kind === 'one') {
            //   onChange({
            //     ...value,
            //     value: val,
            //   })
            // }
          }}

        />
      </DrawerController>)
      }
    </FieldContainer>

  )
}
