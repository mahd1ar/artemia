import { useLazyQuery, useMutation } from '@apollo/client'
import { PageContainer } from '@keystone-6/core/admin-ui/components'
import { Button } from '@keystone-ui/button'
import { Stack, useTheme } from '@keystone-ui/core'
import { FieldContainer, FieldLabel, TextArea, TextInput } from '@keystone-ui/fields'
import { ChevronRightIcon, ClipboardIcon, MoreVerticalIcon, PlusIcon } from '@keystone-ui/icons'
import { LoadingDots } from '@keystone-ui/loading'
import {
  Alert,
  Box,
  Collapse,
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Modal,
  Paper,
  Snackbar,
  Tab,
  Tabs,
  Typography,
} from '@mui/material'
import MuiButton from '@mui/material/Button'
import { createTheme, styled, ThemeProvider } from '@mui/material/styles'
import { gql } from '@ts-gql/tag/no-transform'
import { useRouter } from 'next/router'
import React from 'react'
import { useDebouncedValue } from '../../../data/utils'

interface PageState {
  snackbarIsOpen: boolean
  snackbarMessage: string
  snackbarSeverity: 'success' | 'error' | 'warning' | 'info'
}

const GroupContext = React.createContext<[PageState, React.Dispatch<React.SetStateAction<PageState>>]>([{ snackbarIsOpen: false, snackbarMessage: '', snackbarSeverity: 'success' }, () => { }])

const theme = createTheme({
  typography: {
    fontFamily:
            'system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",sans-serif',
  },
})

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.grey[800],
}))

const GroupIcon: React.FC<{ width: string, height: string }> = ({ width: w, height: h }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24">
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
        <circle cx={17} cy={7} r={3}></circle>
        <circle cx={7} cy={17} r={3}></circle>
        <path d="M14 14h6v5a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zM4 4h6v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"></path>
      </g>
    </svg>
  )
}

function ChangeParent(props: { parentId: string | null, id: string, onChange: (i: string) => void }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [newParentId, setNewParentId] = React.useState<string>('')
  const debounceNewParent = useDebouncedValue(newParentId, 1300)
  const theme = useTheme()

  const CATEGORIES_1 = gql`
query CATEGORIES_1($where: CategoryWhereInput!) {
    categories(where: $where) {
        id
        title
        code
    }
}
` as import('../../../__generated__/ts-gql/CATEGORIES_1').type

  const UPDATE_CATEGORY_1 = gql`
mutation UPDATE_CATEGORY_1($id: ID!, $data: CategoryUpdateInput!) {
    updateCategory(where: { id: $id }, data: $data) {
        id
        title
        code
    }
}
` as import('../../../__generated__/ts-gql/UPDATE_CATEGORY_1').type

  const [load, { data, loading, refetch }] = useLazyQuery(CATEGORIES_1, {})
  const [updateCategoryMutation, { loading: updateLoading }] = useMutation(UPDATE_CATEGORY_1)
  const [pageState, setPageState] = React.useContext(GroupContext)

  React.useEffect(() => {
    if (debounceNewParent) {
      load({
        variables: {
          where: {
            OR: [
              { id: { equals: debounceNewParent } },
              { code: { equals: debounceNewParent } },
            ],
          },
        },
        fetchPolicy: 'no-cache',
      })
    }
  }, [debounceNewParent])

  const isLoading = React.useMemo(() => {
    return loading || updateLoading || newParentId !== debounceNewParent
  }, [loading, newParentId, debounceNewParent, updateLoading])

  const candidateCategory = React.useMemo(() => {
    if (data?.categories?.at(0))
      return data.categories.at(0)
    else
      return null
  }, [data])

  async function tryUpdate() {
    if (candidateCategory) {
      try {
        const res = await updateCategoryMutation({
          variables: {
            id: props.id,
            data: {
              parent: { connect: { id: candidateCategory.id } },
            },
          },
        })

        if (res.errors)
          throw new Error(res.errors[0].message)
        if (!res.data?.updateCategory)
          throw new Error('دسته بندی یافت نشد')

        props.onChange(res.data.updateCategory.id)

        setTimeout(() => {
          window.location.reload()
        }, 1000)
      }
      catch (error) {
        setPageState({ ...pageState, snackbarIsOpen: true, snackbarMessage: String(error), snackbarSeverity: 'error' })
      }
      setIsOpen(false)
    }
    else {
      if (!confirm('?انتقال به دسته بندی اصلی'))
        return
      try {
        const res = await updateCategoryMutation({
          variables: {
            id: props.id,
            data: {
              parent: { disconnect: true },
            },
          },
        })

        if (res.errors)
          throw new Error(res.errors[0].message)
        if (!res.data?.updateCategory)
          throw new Error('دسته بندی یافت نشد')
        alert('انتقال به دسته بندی اصلی با موفقیت انجام شد')
        location.reload()
      }
      catch (error) {
        setPageState({ ...pageState, snackbarIsOpen: true, snackbarMessage: String(error), snackbarSeverity: 'error' })
      }
    }
  }

  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #ccc',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px',
  }

  return (
    <>

      <MuiButton color="primary" variant="contained" onClick={() => { setIsOpen(true) }}>
        نغییر دسته ی پدر
      </MuiButton>

      <Modal
        open={isOpen}
        onClose={() => {
          setIsOpen(false)
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            تغییر دسته ی والد
          </Typography>
          <Typography id="modal-modal-description" sx={{ my: 2 }}>
            این دسته بندی را به زیرمجموعه ی دسته ی دیگری
            منتقل کنید
          </Typography>

          <FieldContainer>
            <FieldLabel>
              شناسه
              والد جدید

            </FieldLabel>
            <TextInput

              placeholder={props.parentId || ''}
              value={newParentId}
              onChange={(e) => {
                setNewParentId(e.target.value)
              }}
            />
            <div style={{ height: '6px' }}>
              {
                isLoading && <LoadingDots size="small" label="loading" />
              }
              {
                !isLoading && debounceNewParent !== '' && !candidateCategory && (
                  <span style={{ padding: theme.spacing.small, color: theme.tones.negative.fill['1'] }}>
                    دسته بندی یافت نشد
                  </span>
                )
              }
              {

                !isLoading && candidateCategory && (
                  <span style={{ color: theme.tones.positive.fill['1'] }}>
                    {candidateCategory.title}
                    {' '}
                    -
                    {candidateCategory.code}
                  </span>
                )
              }
            </div>
          </FieldContainer>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>

            <Button isLoading={updateLoading} tone="active" onClick={async () => { tryUpdate() }}>
              به روز رسانی
            </Button>
          </Box>
        </Box>
      </Modal>

    </>
  )
}

const Group: React.FC<{
  parentId: string | null
  index: number
  onClick?: (categoryId: string) => void
  collapsed?: boolean
}> = (props) => {
  const CATEGORY_BY_PARENT = gql`
    query CATEGORY_BY_PARENT($categoryWhereInput: CategoryWhereInput!) {
      categories(where:  $categoryWhereInput  ) {
        id
        code
        title
        childrenCount
        children {
          id
          title
        }
      }
    }
  ` as import('../../../__generated__/ts-gql/CATEGORY_BY_PARENT').type

  const router = useRouter()
  const myParam = router.query['']?.at(props.index + 1) || '' as string

  const [open, setOpen] = React.useState(false)
  const [selectedItemToEdit, setSelectedItemToEdit] = React.useState<null | string>('')

  const [load, { data, loading, refetch }] = useLazyQuery(CATEGORY_BY_PARENT, {
    variables: {
      categoryWhereInput: props.parentId ? { parent: { id: { equals: props.parentId } } } : { parent: null },
    },
    fetchPolicy: 'network-only',
  })

  React.useEffect(() => {
    load()
  }, [])

  if (loading)
    return <div style={{ padding: '20px' }}><LoadingDots label="loading" tone="passive" /></div>

  return (
    <>
      <Drawer open={open} anchor="right" onClose={() => setOpen(false)}>
        <CategoryEditor
          itemId={selectedItemToEdit}
          parentId={props.parentId}
          onClose={() => setOpen(false)}
          onSubmit={() => {
            refetch()
          }}
        />

      </Drawer>
      <List dense>
        {
          data?.categories?.map(i => (
            <ListItem key={i.id} disablePadding onClick={() => props.onClick?.(i.id)}>
              <ListItemButton style={{ color: i.id !== myParam ? '#777' : undefined }} selected={i.id === myParam}>
                <ListItemIcon sx={{ minWidth: '32px' }}>
                  <GroupIcon width="1.2em" height="1.2em" />

                </ListItemIcon>

                <ListItemText
                  primary={props.collapsed && i.title ? '' : i.title}
                  secondary={(
                    <code style={{ color: '#888', fontWeight: 'bold', fontSize: '11px' }}>
                      {i.code || '/'}
                    </code>
                  )}
                />

                {
                  !props.collapsed && (

                    <ListItemSecondaryAction
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedItemToEdit?.(i.id)
                        setOpen(true)
                      }}
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      <MoreVerticalIcon size="small" />

                      {i.id === myParam && <ChevronRightIcon size={14} />}
                    </ListItemSecondaryAction>
                  )
                }
              </ListItemButton>

            </ListItem>
          ))
        }

        {data?.categories?.length !== 0 && <Divider />}
        <ListItem color="#fce4ec">
          <MuiButton
            fullWidth
            endIcon={<PlusIcon size="small" />}
            onClick={() => {
              setSelectedItemToEdit(null)
              setOpen(true)
            }}
          >
            {

              !props.collapsed && 'گروه جدید'
            }

          </MuiButton>

        </ListItem>

      </List>
    </>
  )
}

interface CategoryEditorProps {
  itemId: string | null // null for create and string for edit and Update
  parentId: string | null // null for update
  onClose: () => void
  onSubmit: () => void
}
const CategoryEditor: React.FC<CategoryEditorProps> = (props) => {
  const [editableInfo, setEditableInfo] = React.useState({
    title: '',
    code: '',
    description: '',
  })

  const [pageState, setPageState] = React.useContext(GroupContext)
  const [tabIndex, setTabIndex] = React.useState(0)

  const CATEGORY_DETAIL = gql`
    query CATEGORY_DETAIL($id: ID!) {
      category(where: { id: $id } ) {
        id
        code
        title
        description
        childrenCount
        children {
          id
          title
        }
      }
    }` as import('../../../__generated__/ts-gql/CATEGORY_DETAIL').type

  const UPDATE_CATEGORY = gql`
    mutation UPDATE_CATEGORY($id: ID!, $data: CategoryUpdateInput!) {
    updateCategory(where: { id: $id }, data: $data) {
        id
    }
    }` as import('../../../__generated__/ts-gql/UPDATE_CATEGORY').type

  const CREATE_CATEGORY = gql`
    mutation CREATE_CATEGORY($data: CategoryCreateInput!) {
    createCategory(data: $data) {
        id
    }
    }` as import('../../../__generated__/ts-gql/CREATE_CATEGORY').type

  const DELETE_CATEGORY = gql`
mutation DELETE_CATEGORY($id: ID!) {
  deleteCategory(where: { id: $id }) {
    id
  }
}` as import('../../../__generated__/ts-gql/DELETE_CATEGORY').type

  const [load, { loading, refetch }] = useLazyQuery(CATEGORY_DETAIL, {
    variables: {
      id: props.itemId!,
    },
    fetchPolicy: 'no-cache',
  })

  const [updateCategory] = useMutation(UPDATE_CATEGORY)

  const [createCategory] = useMutation(CREATE_CATEGORY)

  const [deleteCategory] = useMutation(DELETE_CATEGORY)

  React.useEffect(() => {
    if (!props.itemId)
      return
    load().then((res) => {
      setEditableInfo({
        code: res.data?.category?.code || '',
        title: res.data?.category?.title || '',
        description: res.data?.category?.description || '',
      })
    })
  }, [])

  function a11yProps(index: number) {
    return {
      'id': `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
  }

  if (loading) {
    return (
      <Box sx={{ width: 350 }} padding={2} role="presentation">
        <LoadingDots label="loading" />
      </Box>
    )
  }

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabIndex}
          onChange={(_, nv) => {
            setTabIndex(nv)
          }}
          aria-label="basic tabs example"
        >
          <Tab label={props.itemId === null ? 'ایجاد گروه' : 'ویرایش گروه'} {...a11yProps(0)} />
          <Tab
            label="تنظیمات پیشرفته"
            {...a11yProps(1)}
            disabled={props.itemId === null}
          />
        </Tabs>
      </Box>
      {/* tab panel */}
      <Box sx={{ width: 450, display: 'flex', flexDirection: 'column' }} height="100%" padding={2} role="presentation">

        <div style={{ display: tabIndex === 0 ? 'block' : 'none' }}>

          <FieldContainer style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ marginTop: '20px' }}>
              <FieldLabel>title</FieldLabel>
              <Stack gap="small">

                <TextInput value={editableInfo.title} onChange={e => setEditableInfo({ ...editableInfo, title: e.target.value })} />
              </Stack>
            </div>
            <div style={{ marginTop: '20px' }}>

              <FieldLabel>code</FieldLabel>
              <Stack gap="small">

                <TextInput value={editableInfo.code} onChange={e => setEditableInfo({ ...editableInfo, code: e.target.value })} />
              </Stack>
            </div>
            <div style={{ marginTop: '20px' }}>

              <FieldLabel>Description</FieldLabel>
              <Stack gap="small">

                <TextArea value={editableInfo.description} onChange={e => setEditableInfo({ ...editableInfo, description: e.target.value })} />
              </Stack>
            </div>

            <Button
              tone="active"
              weight="bold"
              style={{ width: '100%', marginTop: '20px' }}
              onClick={async () => {
                try {
                  if (props.itemId) {
                    const res = await updateCategory({ variables: { id: props.itemId, data: { title: editableInfo.title, code: editableInfo.code, description: editableInfo.description } } })
                    if (res.errors)
                      throw new Error(res.errors[0].message)

                    setPageState({
                      ...pageState,
                      snackbarIsOpen: true,
                      snackbarMessage: 'با موفقیت به روز شد',
                      snackbarSeverity: 'success',
                    })
                  }
                  else {
                    const res = await createCategory({
                      variables: {
                        data: {
                          title: editableInfo.title,
                          code: editableInfo.code,
                          description: editableInfo.description,
                          parent: props.parentId
                            ? {
                                connect: { id: props.parentId },
                              }
                            : null,
                        },
                      },
                    })

                    if (res.errors)
                      throw new Error(res.errors[0].message)

                    await setPageState({
                      ...pageState,
                      snackbarIsOpen: true,
                      snackbarMessage: 'با موفقیت ایجاد شد',
                      snackbarSeverity: 'success',
                    })
                  }

                  props.onSubmit()

                  props.onClose()
                }
                catch (error) {
                  console.error(error)
                  setPageState({
                    snackbarIsOpen: true,
                    snackbarMessage: String(error),
                    snackbarSeverity: 'error',
                  })
                  props.onClose()
                }
              }}
            >

              {props.itemId ? 'ویرایش' : 'افزودن'}
            </Button>

          </FieldContainer>
        </div>
        {props.itemId && (
          <>
            <div style={{ display: tabIndex === 1 ? 'block' : 'none' }}>
              <FieldContainer style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <FieldLabel>id</FieldLabel>
                <div style={{ display: 'flex', gap: 4 }}>

                  <TextInput value={props.itemId} disabled />
                  <Button
                    style={{ display: 'flex', gap: 4, justifyContent: 'center', alignItems: 'center' }}
                    onClick={() => {
                      // TODO IMPEL ADD TO CLIPBOARD!!
                      setPageState({
                        ...pageState,
                        snackbarIsOpen: true,
                        snackbarSeverity: 'success',
                        snackbarMessage: 'در کلیپبرد ذخیره شد',
                      })
                    }}
                  >
                    <ClipboardIcon size={16} />
                  </Button>
                </div>
                <Divider textAlign="center" sx={{ marginTop: 4, marginBottom: 1 }}> Danger Zone</Divider>
                <Stack gap="large">

                  <FieldLabel>change parent</FieldLabel>
                  <ChangeParent id={props.itemId} parentId={props.parentId} onChange={i => console.log(i)} />

                  <MuiButton
                    variant="outlined"
                    color="error"
                    onClick={async () => {
                      if (!window.confirm('آیا از حذف اطمینان دارید؟'))
                        return

                      // delete
                      await deleteCategory({ variables: { id: props.itemId! } })

                      props.onSubmit()
                      // refetch()
                      props.onClose()
                    }}
                  >
                    <span>حذف</span>
                  </MuiButton>
                </Stack>
              </FieldContainer>
            </div>
          </>
        )}
      </Box>
    </>

  )
}

export default function GroupsPage() {
  const router = useRouter()
  const params = router.query[''] as string[]

  const [pageState, setPageState] = React.useState<PageState>({
    snackbarIsOpen: false,
    snackbarMessage: '',
    snackbarSeverity: 'success' as 'success' | 'error' | 'warning' | 'info',

  })

  return (
    <PageContainer header="گروه بندی ها" title="گروه بندی ها">
      <ThemeProvider theme={theme}>

        <GroupContext.Provider value={[pageState, setPageState]}>
          <Grid container direction="row" spacing={0} sx={{ height: '100%' }}>

            {
              params?.map((i, inx) => (
                <Grid xs={params.length < 3 ? 4 : inx < params.length - 3 ? 1 : 12 / params.length} key={i} item>
                  {' '}
                  <Item>
                    {' '}
                    <Group
                      index={inx}
                      parentId={i === 'index' ? null : i}
                      onClick={(i) => {
                        console.log(i)
                        router.push(`/groups/${params.slice(0, inx + 1).join('/')}/${i}`)
                      }}
                      collapsed={inx < params.length - 3}
                    />
                    {' '}

                  </Item>
                  {' '}

                </Grid>
              ))
            }
          </Grid>
          <Snackbar open={pageState.snackbarIsOpen} autoHideDuration={4000} onClose={() => setPageState({ ...pageState, snackbarIsOpen: false })}>
            <Alert
              severity={pageState.snackbarSeverity}
              variant="filled"
              sx={{ width: '100%' }}
            >
              {pageState.snackbarMessage}
            </Alert>
          </Snackbar>
        </GroupContext.Provider>
      </ThemeProvider>
    </PageContainer>
  )
}
