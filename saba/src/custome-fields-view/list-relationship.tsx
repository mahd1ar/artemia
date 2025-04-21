import type { controller } from '@keystone-6/core/fields/types/relationship/views'
import type { FieldProps } from '@keystone-6/core/types'
import { ThemeProvider } from '@emotion/react'
import { CreateItemDrawer } from '@keystone-6/core/admin-ui/components'
import { useList } from '@keystone-6/core/admin-ui/context'
import { Button } from '@keystone-ui/button'
import { Stack } from '@keystone-ui/core'
import { FieldContainer, FieldLabel } from '@keystone-ui/fields'
import { DrawerController } from '@keystone-ui/modals'
import { ChevronRight } from '@mui/icons-material'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import { ListItemSecondaryAction, Typography } from '@mui/material'
import MuiButton from '@mui/material/Button'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MuiStack from '@mui/material/Stack'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import colors from 'react-multi-date-picker/plugins/colors'
import { theme } from '../../data/utils'

export function Field({
  field,
  value,
  onChange,
}: FieldProps<typeof controller>) {
  if (typeof value === 'symbol')
    return null

  if (value.kind !== 'many')
    return <div>relationship kind is not supported :/ </div>

  const foreignList = useList(field.refListKey)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  console.log(field)
  return (
    <FieldContainer>

      <Stack
        gap="small"
      // across
      >
        <ThemeProvider theme={theme}>

          <MuiStack spacing={2} direction="row" alignContent="center" justifyContent="space-between">
            <Link color="inherit" href={`/${foreignList.path}?!${field.refFieldKey}_matches="${value.id}"`}>
              <MuiButton
                variant="text"
                startIcon={<FormatListNumberedIcon />}
              >
                جزئیات
              </MuiButton>
            </Link>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {field.label}
            </Typography>
          </MuiStack>

          <List
            sx={{ width: '100%', bgcolor: '#fafbfc', borderRadius: 1, border: '1px solid #e1e5e9', p: 0 }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            dense
          >
            {
              value?.value?.map(i => (
                <Link
                  key={i.id}
                  href={`/${foreignList.path}/${i.id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <ListItemButton
                    key={i.id}
                  >
                    {/* <ListItemIcon>
                      <FolderOpenIcon />
                    </ListItemIcon> */}
                    <ListItemText primary={i.label} />
                    <ListItemSecondaryAction>
                      <ChevronRight fontSize="small" />
                    </ListItemSecondaryAction>
                  </ListItemButton>
                </Link>
              ))
            }

          </List>
        </ThemeProvider>
        <Button
          onClick={() => setIsDrawerOpen(true)}
        >
          { `اضافه کردن ${foreignList.label} جدید` }
        </Button>
      </Stack>
      {onChange !== undefined && (
        <DrawerController isOpen={isDrawerOpen}>
          <CreateItemDrawer

            listKey={foreignList.key}
            onClose={() => {
              setIsDrawerOpen(false)
            }}
            onCreate={(val) => {
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
        </DrawerController>
      )}
    </FieldContainer>

  )
}
