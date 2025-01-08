import type { controller } from '@keystone-6/core/fields/types/relationship/views'
import type { FieldProps } from '@keystone-6/core/types'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { useKeystone } from '@keystone-6/core/admin-ui/context'
import { Button } from '@keystone-ui/button'
import { Stack } from '@keystone-ui/core'
import { FieldContainer, FieldLabel, MultiSelect, TextArea } from '@keystone-ui/fields'
import { EditIcon, TrashIcon } from '@keystone-ui/icons'
import { AlertDialog } from '@keystone-ui/modals'
import { useToasts } from '@keystone-ui/toast'
import { Alert, Avatar, Card, CardActions, CardContent, CardHeader, IconButton, ThemeProvider, Typography } from '@mui/material'
import { gql } from '@ts-gql/tag/no-transform'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Match } from '../../data/match'
import { Roles } from '../../data/types'
import { saveCurrentTab, theme } from '../../data/utils'

interface Option {
  id: string
  message: string
  userName: string
  userId: string
  userRole: Roles
  date: string
  avatar: string | null
  mentions: string[]
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
  const [isOpenWarning, setIsOpenWarning] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState<string | undefined>(undefined)
  const [mentions, setMentions] = useState<{ label: string, value: string }[]>([])

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

  const ALLUSERS = gql`
  query ALLUSERS {
  users {
    name
    id
   
  }  
}` as import('../../__generated__/ts-gql/ALLUSERS').type

  const NOTES = gql`
  query NOTES($where: NoteWhereInput!) {
  notes(where: $where) {
    message
    createdAt
    id
    mentions
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
      mentions
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
      mentions
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

  const DELETE_NOTE = gql`
  mutation DELETE_NOTE($where: NoteWhereUniqueInput!) {
    deleteNote(where: $where) {
      id
    }
  }` as import('../../__generated__/ts-gql/DELETE_NOTE').type

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

  const [deleteNote, { loading: loadingDelete }] = useMutation(DELETE_NOTE)

  const { data: allUsers } = useQuery(ALLUSERS)

  useEffect(() => {
    load().then((res) => {
      setData(res.data?.notes?.map((i) => {
        return {
          id: i.id,
          message: i.message || '',
          userName: i.createdBy?.fullname || '',
          userId: i.createdBy?.id || '',
          userRole: i.createdBy?.role || Roles.guest,
          date: i.createdAt,
          avatar: i.createdBy?.avatar?.url || null,
          mentions: parseMentions(i.mentions) || [],
        }
      }) || [])
    })
  }, [])

  async function tryCreate() {
    try {
      if (!message) {
        return toast.addToast({
          title: 'پیام خالی است',
          message: 'لطفا پیام را وارد کنید',
          tone: 'negative',
        })
      }

      // eslint-disable-next-line no-alert
      if (!window.confirm('آیا مطمئن هستید؟')) {
        return false
      }

      const res = await createNote({
        variables: {
          data: {
            message,
            mentions: JSON.stringify(mentions.map(i => i.value)),
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
            mentions: createdNote.mentions || [],
          },
        ])

        await saveCurrentTab()
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
    if (!message?.trim()) {
      toast.addToast({
        title: 'پیام خالی است',
        message: 'لطفا پیام را وارد کنید',
        tone: 'negative',
      })
      return false
    }

    try {
      const res = await updateNote({
        variables: {
          where: {
            id: candidateNoteId!,
          },
          data: {
            message,
            mentions: mentions.map(i => i.value),
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
        ...data.map(i => i.id === candidateNoteId
          ? {
              id: i.id,
              message: message || '',
              userName: i.userName,
              userId: i.userId,
              userRole: i.userRole,
              date: i.date,
              avatar: i.avatar,
              mentions: parseMentions(i.mentions),
            }
          : i),
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

  async function tryDelete(id: string) {
    // eslint-disable-next-line no-alert
    if (!window.confirm('آیا مطمئن هستید؟'))
      return

    await deleteNote({
      variables: {
        where: {
          id,
        },
      },
    })

    setData(data.filter(i => i.id !== id))
  }

  function parseMentions(x?: string | string[]) {
    try {
      if (Array.isArray(x))
        return x
      else
        return JSON.parse(x || '[]') as string[]
    }
    catch {
      return []
    }
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
            loading: loadingCreate || loadingUpdate || loadingDelete,
          },
          cancel: {
            label: 'لغو',
            action() {
              setIsOpen(false)
              setMessage(undefined)
              setMentions([])
            },
          },
        }}
      >
        <Stack gap="small">

          <FieldLabel dir="rtl">
            یادداشت
          </FieldLabel>
          <TextArea dir="rtl" onChange={e => setMessage(e.target.value)} value={message} />
          <FieldLabel dir="rtl">
            رونوشت
          </FieldLabel>
          <MultiSelect
            value={mentions}
            onChange={(e) => {
              setMentions(e.map(ei => ({
                label: ei.label,
                value: ei.value,
              })))
            }}
            options={allUsers?.users?.map(i => ({
              label: i.name || '#',
              value: i.id,
            })) || []}
          />
        </Stack>
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
                        setMentions(
                          parseMentions(note?.mentions).map(i => ({ label: allUsers?.users?.find(j => j.id === i)?.name || '', value: i })),
                        )
                      }}
                    >
                      <EditIcon size={18} />
                    </IconButton>
                    <IconButton onClick={() => tryDelete(note.id)} disabled={persistedData?.authenticatedItem?.id !== note.userId} color="error" aria-label="delete">
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

                  <span style={{ marginLeft: '6px', marginRight: '6px' }}>
                    •
                  </span>
                  {
                    parseMentions(note?.mentions).length > 0 && 'رونوشت: '
                  }
                  {
                    parseMentions(note?.mentions).map(i => (
                      allUsers?.users?.find(u => u.id === i)?.name
                    )).filter(Boolean).join(', ')
                  }
                </Typography>
              </CardActions>

            </Card>
          ))
        }
      </ThemeProvider>

      {
        isOpenWarning
          ? (

              <Alert
                variant="standard"
                severity="warning"
                sx={{ width: '100%' }}
              >
                لطفا قبل از اضافه کردن یادداشت، تغییرات را ذخیره کنید
              </Alert>
            )
          : (
              <Button
                style={{ marginTop: '20px' }}
                tone="positive"
                onClick={() => {
                  if (router.route.split('/').at(-1) === 'create') {
                    setIsOpenWarning(true)
                  }
                  else {
                    setIsOpen(true)
                    setMode('create')
                    setMessage('')
                    setMentions([])
                  }
                }}
              >
                {' '}
                افزودن یادداشت
                {' '}
              </Button>
            )
      }

    </FieldContainer>

  )
}
