import type { controller } from '@keystone-6/core/fields/types/relationship/views'
import type { FieldProps } from '@keystone-6/core/types'
import type { Roles } from '../../data/types'
import { useQuery } from '@apollo/client'
import { ThemeProvider } from '@emotion/react'
import { CreateItemDrawer } from '@keystone-6/core/admin-ui/components'
import { useList } from '@keystone-6/core/admin-ui/context'
import { Button } from '@keystone-ui/button'
import { Stack } from '@keystone-ui/core'
import { FieldContainer, FieldLabel } from '@keystone-ui/fields'
import { AlertDialog, DrawerController } from '@keystone-ui/modals'
// import {  } from '@keystone-ui/'
import { CheckBox, ContentPaste, QueryBuilder } from '@mui/icons-material'
import { ListItemSecondaryAction, Tooltip } from '@mui/material'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { gql } from '@ts-gql/tag/no-transform'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Match } from '../../data/match'
import { alc } from '../../data/types'
import { theme } from '../../data/utils'

function ShowStatus({ item, role }: {
  item?: NonNullable<import('../../__generated__/ts-gql/STMNTS_AUTH').type['___type']['result']['statements']>[number]
  role?: Roles
}) {
  if (!role || !item)
    return null

  const myConfirmationStatusField = alc.find(i => i.for === role)

  if (!myConfirmationStatusField)
    return null
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  const confirmedByMe = item[myConfirmationStatusField.gqlkey] as boolean | undefined

  if (typeof confirmedByMe === 'undefined')
    return null

  return confirmedByMe
    ? (
        <Tooltip title={
          ` تایید شده توسط ${Match.AclRole(myConfirmationStatusField.gqlkey)}`
        }
        >
          <CheckBox style={{ color: '#16a34a' }} fontSize="small" />
        </Tooltip>
      )

    : (
        <Tooltip title="در انتظار تایید شما">
          <QueryBuilder style={{ color: '#ffc107' }} color="inherit" fontSize="small" />
        </Tooltip>
      )
}

export function Field({
  field,
  value,
  itemValue,
  onChange,
}: FieldProps<typeof controller>) {
  if (typeof value === 'symbol' || !value.id)
    return null

  if (value.kind !== 'many')
    return <div>relationship kind is not supported :/ </div>

  type ItemValue = undefined | { isApproved: { kind: string, value: boolean } }

  const contractIsApproved = (itemValue as unknown as ItemValue)?.isApproved.value

  // const keystone = useKeystone()
  // const localList = useList(field.listKey)
  const foreignList = useList(field.refListKey)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isAlertOpen, setIsAlertOpen] = useState(false)

  const router = useRouter()

  const STMNTS_AUTH = gql`
        query STMNTS_AUTH($id: ID!) {
          statements(where : {contract:{id: {equals: $id}}}) {
            id
            title
            confirmedByTheUploader
            confirmedByTechnicalSupervisor
            confirmedBySupervisor
            confirmedByProjectControlSupervisor
            confirmedByFinancialSupervisor
          }
          authenticatedItem {
              ... on User {
              id
              role
              name
              createdAt
              }
          }
        }
      ` as import('../../__generated__/ts-gql/STMNTS_AUTH').type

  const { data } = useQuery(STMNTS_AUTH, { variables: { id: value.id }, fetchPolicy: 'no-cache' })

  return (

    <FieldContainer>

      <FieldLabel>{field.label}</FieldLabel>

      <AlertDialog
        title="هشدار"
        tone="negative"
        isOpen={isAlertOpen}
        actions={{
          confirm: {
            action() {
              setIsAlertOpen(false)
            },
            label: 'بستن',
          },

        }}
      >
        <p>

          امکان بارگذاری
          &nbsp;
          {foreignList.label}
&nbsp;
          جدید وجود ندارد
          زیرا این قرارداد توسط مدیر کل تایید نشده است
        </p>
      </AlertDialog>
      <Stack
        gap="small"
      // across
      >
        <ThemeProvider theme={theme}>
          <List
            sx={{ width: '100%', bgcolor: '#fafbfc', borderRadius: 1, border: '1px solid #e1e5e9', p: 0 }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            {
              data?.statements?.map(i => (

                <ListItemButton
                  onClick={() => router.push(`/statements/${i.id}`)}
                  key={i.id}

                >
                  <ListItemIcon>
                    <ContentPaste color="info" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={i.title} />

                  <ListItemSecondaryAction>

                    <ShowStatus item={i} role={data.authenticatedItem?.role || undefined} />

                  </ListItemSecondaryAction>
                </ListItemButton>
              ))
            }

          </List>
        </ThemeProvider>

        {onChange !== undefined
        && (
          <Button
            onClick={() => {
              if (typeof contractIsApproved === 'undefined' || contractIsApproved)
                setIsDrawerOpen(true)
              else
                setIsAlertOpen(true)
            }}
          >
            اضافه کردن
            &nbsp;
            {foreignList.label}
            &nbsp;
            جدید

          </Button>
        )}

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
