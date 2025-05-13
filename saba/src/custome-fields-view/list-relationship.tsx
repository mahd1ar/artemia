import type { controller } from '@keystone-6/core/fields/types/relationship/views'
import type { FieldProps, ListMeta } from '@keystone-6/core/types'
import { ThemeProvider } from '@emotion/react'
import { CreateItemDrawer } from '@keystone-6/core/admin-ui/components'
import { useList } from '@keystone-6/core/admin-ui/context'
import { Button } from '@keystone-ui/button'
import { Stack } from '@keystone-ui/core'
import { FieldContainer } from '@keystone-ui/fields'
import { DrawerController } from '@keystone-ui/modals'
import { ChevronRight } from '@mui/icons-material'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import { ListItemSecondaryAction, Typography } from '@mui/material'
import MuiButton from '@mui/material/Button'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import MuiStack from '@mui/material/Stack'
import Link from 'next/link'
import React, { useState } from 'react'
import { theme } from '../../data/utils'

function CustomRelationshipView(props: {
  title: string
  detailsLink?: string
  listItems: { id: string, label: string, path: string }[]
  foreignList: ListMeta
  onCreateItem?: (_val: {
    id: string
    label: string
  }) => void
  isMany?: boolean

}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <FieldContainer>

      <Stack
        gap="small"
      // across
      >
        <ThemeProvider theme={theme}>

          <MuiStack spacing={2} direction="row" alignContent="center" justifyContent="space-between">
            { props.detailsLink && (
              <Link
                href={props.detailsLink}
              >
                <MuiButton
                  variant="text"
                  sx={{
                    color: '#333',
                  }}
                  startIcon={<FormatListNumberedIcon />}
                >
                  جزئیات
                </MuiButton>
              </Link>
            )}
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {props.title}
            </Typography>
          </MuiStack>

          <List
            sx={{ width: '100%', bgcolor: '#fafbfc', borderRadius: 1, border: '1px solid #e1e5e9', p: 0 }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            dense
          >
            {
              props.listItems.map(i => (
                <Link
                  key={i.id}
                  href={i.path}
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
        { props.isMany && (
          <Button
            onClick={() => setIsDrawerOpen(true)}
          >
            {`اضافه کردن ${props.foreignList.label} جدید`}
          </Button>
        )}
      </Stack>
      {props.onCreateItem && (
        <DrawerController isOpen={isDrawerOpen}>
          <CreateItemDrawer

            listKey={props.foreignList.key}
            onClose={() => {
              setIsDrawerOpen(false)
            }}
            onCreate={(val) => {
              setIsDrawerOpen(false)
              props.onCreateItem?.(val)
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

export function Field({
  field,
  value,
  onChange,
}: FieldProps<typeof controller>) {
  if (typeof value === 'symbol')
    return null

  const foreignList = useList(field.refListKey)

  if (value.kind === 'one') {
    return (
      <CustomRelationshipView
        foreignList={foreignList}
        title={field.label}
        listItems={value.value
          ? [{
              id: value.value.id,
              label: value.value?.label,
              path: `/${foreignList.path}/${value.value?.id}`,
            }]
          : []}
      />
    )
  }

  if (value.kind === 'many') {
    return (
      <CustomRelationshipView
        foreignList={foreignList}
        title={field.label}
        listItems={value.value.map(i => ({
          id: i.id,
          label: i.label,
          path: `/${foreignList.path}/${i.id}`,
        }))}
        detailsLink={`/${foreignList.path}?!${field.refFieldKey}_matches="${value.id}"`}
        onCreateItem={onChange
          ? (val) => {
              onChange({
                ...value,
                value: [...value.value, { id: val.id, label: val.label }],
              })
            }
          : undefined}
        isMany
      />
    )
  }

  return null
}
