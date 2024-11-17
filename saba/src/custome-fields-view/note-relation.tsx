import type { controller } from '@keystone-6/core/fields/types/relationship/views'
import type { FieldProps } from '@keystone-6/core/types'
import { useLazyQuery, useMutation } from '@apollo/client'
import { useKeystone } from '@keystone-6/core/admin-ui/context'
import { Button } from '@keystone-ui/button'
import { FieldContainer, FieldLabel, TextArea } from '@keystone-ui/fields'
import { EditIcon, TrashIcon } from '@keystone-ui/icons'
import { AlertDialog } from '@keystone-ui/modals'
import { useToasts } from '@keystone-ui/toast'
import { Avatar, Card, CardActions, CardContent, CardHeader, IconButton, ThemeProvider, Typography } from '@mui/material'
import { gql } from '@ts-gql/tag/no-transform'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Match } from '../../data/match'
import { Roles } from '../../data/types'
import { theme } from '../../data/utils'

interface Option {
  id: string
  message: string
  userName: string
  userId: string
  userRole: Roles
  date: string
  avatar: string | null
}

export function Field({
  field,
  value,
  onChange,
}: FieldProps<typeof controller>) {
  if (value.kind !== 'many')
    return <div>cant</div>

  const router = useRouter()
  const toast = useToasts()
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState<string | undefined>(undefined)
  const [mode, setMode] = useState<'create' | 'update'>('create')
  const [data, setData] = useState<Option[]>([])
  const [candidateNoteId, setCandidateNoteId] = useState<string | undefined>(undefined)
  const currentPath = router.pathname.split('/').filter(Boolean).at(0)

  let itemQueryName = ''

  const keystoneLists = useKeystone().adminMeta.lists

  for (const i in keystoneLists) {
    if (keystoneLists[i].plural.toLowerCase() === currentPath) {
      itemQueryName = (keystoneLists[i].key).toLowerCase()
      break
    }
  }

  const NOTES = gql`
  query NOTES($where: NoteWhereInput!) {
  notes(where: $where) {
    message
    createdAt
    id
    createdBy {
      fullname
      id
      role
      avatar {
        url
      }
    }
  }
  authenticatedItem {
    ... on User {
      id
    }
  }      
}` as import('../../__generated__/ts-gql/NOTES').type

  const NOTES_CREATE = gql`
  mutation NOTES_CREATE($data: NoteCreateInput!) {
    createNote(data: $data) {
      id
      message
      createdAt
      createdBy {
        id
        fullname
        role
        avatar {
          url
        }
      }
    }
  }
` as import('../../__generated__/ts-gql/NOTES_CREATE').type

  const NOTE_UPDATE = gql`
  mutation NOTE_UPDATE($data: NoteUpdateInput!, $where: NoteWhereUniqueInput!) {
    updateNote(data: $data, where: $where) {
      id
      message
      createdAt
      createdBy {
        id
        fullname
        role
        avatar {
          url
        }
      }
    }
  }
` as import('../../__generated__/ts-gql/NOTE_UPDATE').type

  const [load, { data: persistedData }] = useLazyQuery(NOTES, {
    nextFetchPolicy: 'network-only',
    variables: {
      where: {
        [itemQueryName]: {
          id: {
            equals: value.id,
          },
        },
      },
    },
  })

  const [createNote, { loading: loadingCreate }] = useMutation(NOTES_CREATE)

  const [updateNote, { loading: loadingUpdate }] = useMutation(NOTE_UPDATE)

  useEffect(() => {
    load().then((res) => {
      setData(res.data?.notes?.map(i => ({
        id: i.id,
        message: i.message || '',
        userName: i.createdBy?.fullname || '',
        userId: i.createdBy?.id || '',
        userRole: i.createdBy?.role || Roles.guest,
        date: i.createdAt,
        avatar: i.createdBy?.avatar?.url || null,
      })) || [])
    })
  }, [])

  async function tryCreate() {
    try {
      const res = await createNote({
        variables: {
          data: {
            message,
          },
        },
      })

      if (res.errors?.length)
        throw new Error(res.errors[0].message)

      const createdNote = res.data?.createNote

      if (!createdNote)
        throw new Error('no note created')

      if (value.kind !== 'many')
        return

      if (onChange) {
        onChange({
          initialValue: value.initialValue,
          kind: 'many',
          id: value.id,
          value: [
            ...value.value,
            { id: createdNote.id, label: createdNote.id },
          ],
        })

        setData([
          ...data,
          {
            id: createdNote.id,
            message: createdNote.message || '',
            userName: createdNote.createdBy?.fullname || '',
            userId: createdNote.createdBy?.id || '',
            date: createdNote.createdAt,
            userRole: createdNote.createdBy?.role || Roles.guest,
            avatar: createdNote.createdBy?.avatar?.url || null,
          },
        ])
      }
    }
    catch (error) {
      console.error(error)
      toast.addToast({
        title: `error! ${String(error)}`,
        tone: 'negative',
      })
    }

    setIsOpen(false)
  }

  async function tryUpdate() {
    try {
      const res = await updateNote({
        variables: {
          where: {
            id: candidateNoteId!,
          },
          data: {
            message,
          },
        },
      })

      if (res.errors?.length)
        throw new Error(res.errors[0].message)

      const updatedNote = res.data?.updateNote

      if (!updatedNote)
        throw new Error('no note created')

      if (value.kind !== 'many')
        return

      setData([
        ...data.map(i => i.id === candidateNoteId ? { id: i.id, message: message || '', userName: i.userName, userId: i.userId, userRole: i.userRole, date: i.date, avatar: i.avatar } : i),
      ])
    }
    catch (error) {
      console.error(error)

      toast.addToast({
        title: `error! ${String(error)}`,
        tone: 'negative',
      })
    }

    setIsOpen(false)
  }

  return (

    <FieldContainer>

      <FieldLabel>{field.label}</FieldLabel>

      <AlertDialog
        isOpen={isOpen}
        title="اضافه یا تغییر یادداشت"
        tone="active"
        actions={{
          confirm: {
            label: mode === 'create' ? 'اضافه کردن یاداشت جدید' : 'ویرایش یاداشت',
            action: async () => {
              if (mode === 'create') {
                tryCreate()
              }
              else {
                tryUpdate()
              }
            },
            loading: loadingCreate || loadingUpdate,
          },
          cancel: {
            label: 'لغو',
            action() {
              setIsOpen(false)
              setMessage(undefined)
            },
          },
        }}
      >
        <TextArea dir="rtl" onChange={e => setMessage(e.target.value)} value={message} />
      </AlertDialog>

      <ThemeProvider theme={theme}>
        {
          data.map(note => (
            <Card variant="outlined" key={note.id} sx={{ maxWidth: 400, marginTop: 2 }}>
              <CardHeader
                avatar={(
                  <Avatar variant="rounded" aria-label="recipe">
                    {
                      note.avatar
                        ? (
                            <img
                              style={{
                                objectFit: 'cover',
                                width: '100%',
                                height: '100%',
                              }}
                              src={note.avatar}
                              alt={note.userName.at(0)}
                            />
                          )
                        : note.userName.at(0)
                    }
                  </Avatar>
                )}
                action={(
                  <>
                    <IconButton
                      aria-label="edit"
                      disabled={persistedData?.authenticatedItem?.id !== note.userId}
                      onClick={() => {
                        setMessage(note.message || '')
                        setMode('update')
                        setIsOpen(true)
                        setCandidateNoteId(note.id)
                      }}
                    >
                      <EditIcon size={18} />
                    </IconButton>
                    <IconButton disabled={persistedData?.authenticatedItem?.id !== note.userId} color="error" aria-label="delete">
                      <TrashIcon size={18} />
                    </IconButton>
                  </>
                )}
                title={note.userName}
                subheader={Match.Role(note.userRole)}
              />

              <CardContent>

                <Typography variant="body1" color="gray.600">
                  {note.message}
                </Typography>
              </CardContent>

              <CardActions>
                <Typography dir="rtl" marginLeft="auto" variant="caption" color="text.secondary" align="right">

                  {note.date && Intl.DateTimeFormat('fa-IR', { dateStyle: 'medium' }).format(new Date(note.date))}
                  <span style={{ marginLeft: '6px', marginRight: '6px' }}>
                    •
                  </span>
                  {note.date && Intl.DateTimeFormat('fa-IR', { timeStyle: 'short' }).format(new Date(note.date))}

                </Typography>
              </CardActions>

            </Card>
          ))
        }
      </ThemeProvider>

      <Button
        style={{ marginTop: '20px' }}
        tone="positive"
        onClick={() => {
          setIsOpen(true)
          setMode('create')
          setMessage('')
        }}
      >
        {' '}
        افزودن یادداشت
        {' '}
      </Button>

    </FieldContainer>

  )
}
