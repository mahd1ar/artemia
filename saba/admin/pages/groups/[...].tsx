import {
    Alert,
    Box,
    Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemSecondaryAction, ListItemText,
    Paper,
    Snackbar,
} from '@mui/material'
import MuiButton from '@mui/material/Button'
import React from 'react'
import { ActivityIcon, PlusIcon, MoreVerticalIcon, ChevronRightIcon } from '@keystone-ui/icons';
import { gql } from '@ts-gql/tag/no-transform';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import { LoadingDots } from '@keystone-ui/loading'
import { FieldContainer, FieldLabel, TextInput, TextArea } from "@keystone-ui/fields";
import { Stack } from '@keystone-ui/core'
import { PageContainer } from '@keystone-6/core/admin-ui/components';
import { Button, ButtonContext } from "@keystone-ui/button"

type PageState = {
    snackbarIsOpen: boolean,
    snackbarMessage: string,
    snackbarSeverity: "success" | "error" | "warning" | "info",
}

const GroupContext = React.createContext<[PageState, React.Dispatch<React.SetStateAction<PageState>>]>([{ snackbarIsOpen: false, snackbarMessage: "", snackbarSeverity: "success" }, () => { }]);

const theme = createTheme({
    typography: {
        fontFamily:
            'system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",sans-serif',
    },
});



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.grey[800],
}));

const GroupIcon: React.FC<{ width: string, height: string }> = ({ width: w, height: h }) => {
    return <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}><circle cx={17} cy={7} r={3}></circle><circle cx={7} cy={17} r={3}></circle><path d="M14 14h6v5a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zM4 4h6v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"></path></g></svg>
}

const Group: React.FC<{
    parentId: string | null,
    index: number,
    onClick?: (categoryId: string) => void,
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
  ` as import("../../../__generated__/ts-gql/CATEGORY_BY_PARENT").type;

    const router = useRouter();
    const myParam = router.query[""]?.at(props.index + 1) || '' as string
    console.log({ myParam })

    const [open, setOpen] = React.useState(false);
    const [selectedItemToEdit, setSelectedItemToEdit] = React.useState<null | string>("");

    const [load, { data, loading, refetch }] = useLazyQuery(CATEGORY_BY_PARENT, {
        variables: {
            categoryWhereInput: props.parentId ? { parent: { id: { equals: props.parentId } } } : { parent: null }
        },
        fetchPolicy: "network-only",
    })

    React.useEffect(() => {

        load()
    }, [])


    if (loading) return <div style={{ padding: "20px" }} ><LoadingDots label='loading' tone='passive' /></div>

    return (
        <>
            <Drawer open={open} anchor="right" onClose={() => setOpen(false)} >
                <CategoryEditor
                    itemId={selectedItemToEdit}
                    parentId={props.parentId}
                    onClose={() => setOpen(false)}
                    onSubmit={() => {
                        refetch()
                    }}
                />
            </Drawer>
            <List dense >
                {
                    data?.categories?.map(i => (
                        <ListItem key={i.id} disablePadding onClick={() => props.onClick?.(i.id)}>
                            <ListItemButton style={{ color: i.id !== myParam ? '#777' : undefined }} selected={i.id === myParam}  >
                                <ListItemIcon  >
                                    <GroupIcon width='1.2em' height='1.2em' />

                                </ListItemIcon>
                                <ListItemText primary={i.title} secondary={<code style={{ color: '#888', fontWeight: 'bold', fontSize: '11px' }} >
                                    ({i.code || "/"})
                                </code>} />
                                <ListItemSecondaryAction
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setSelectedItemToEdit?.(i.id)
                                        setOpen(true)
                                    }}
                                    style={{ display: 'flex', alignItems: 'center' }}
                                >
                                    <MoreVerticalIcon size={"small"} />

                                    {i.id === myParam && <ChevronRightIcon size={14} />}
                                </ListItemSecondaryAction>
                            </ListItemButton>

                        </ListItem>
                    ))
                }

                {data?.categories?.length !== 0 && <Divider />}
                <ListItem color='#fce4ec'>
                    <MuiButton fullWidth
                        endIcon={<PlusIcon size={"small"} />}
                        onClick={() => {
                            setSelectedItemToEdit(null)
                            setOpen(true)
                        }}
                    >
                        گروه جدید

                    </MuiButton>

                </ListItem>


            </List>
        </>
    )
}

type CategoryEditorProps = {
    itemId: string | null, // null for create and string for edit and Update
    parentId: string | null, // null for update
    onClose: () => void,
    onSubmit: () => void
}
const CategoryEditor: React.FC<CategoryEditorProps> = (props) => {

    const [editableInfo, setEditableInfo] = React.useState({
        title: '',
        code: '',
        description: ''
    })

    const [pageState, setPageState] = React.useContext(GroupContext);

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
    }` as import("../../../__generated__/ts-gql/CATEGORY_DETAIL").type;


    const UPDATE_CATEGORY = gql`
    mutation UPDATE_CATEGORY($id: ID!, $data: CategoryUpdateInput!) {
    updateCategory(where: { id: $id }, data: $data) {
        id
    }
    }` as import("../../../__generated__/ts-gql/UPDATE_CATEGORY").type;

    const CREATE_CATEGORY = gql`
    mutation CREATE_CATEGORY($data: CategoryCreateInput!) {
    createCategory(data: $data) {
        id
    }
    }` as import("../../../__generated__/ts-gql/CREATE_CATEGORY").type;

    const DELETE_CATEGORY = gql`
mutation DELETE_CATEGORY($id: ID!) {
  deleteCategory(where: { id: $id }) {
    id
  }
}` as import("../../../__generated__/ts-gql/DELETE_CATEGORY").type;

    const [load, { loading, refetch }] = useLazyQuery(CATEGORY_DETAIL, {
        variables: {
            id: props.itemId!
        },
        fetchPolicy: 'no-cache'
    })

    const [updateCategory] = useMutation(UPDATE_CATEGORY)

    const [createCategory] = useMutation(CREATE_CATEGORY)

    const [deleteCategory] = useMutation(DELETE_CATEGORY)

    React.useEffect(() => {
        if (!props.itemId) return
        load().then(res => {

            setEditableInfo({
                code: res.data?.category?.code || '',
                title: res.data?.category?.title || '',
                description: res.data?.category?.description || '',
            })
        })
    }, [])

    if (loading)
        return (
            <Box sx={{ width: 350 }} padding={2} role="presentation">
                <LoadingDots label='loading' />
            </Box>
        )

    return (
        <Box sx={{ width: 350 }} height={'100%'} padding={2} role="presentation">
            <FieldContainer style={{ display: 'flex', flexDirection: 'column', height: '100%' }} >
                <div style={{ marginTop: "20px" }}>
                    <FieldLabel>title</FieldLabel>
                    <Stack gap="small">

                        <TextInput value={editableInfo.title} onChange={e => setEditableInfo({ ...editableInfo, title: e.target.value })} />
                    </Stack>
                </div>
                <div style={{ marginTop: "20px" }}>

                    <FieldLabel  >code</FieldLabel>
                    <Stack gap="small">

                        <TextInput value={editableInfo.code} onChange={e => setEditableInfo({ ...editableInfo, code: e.target.value })} />
                    </Stack>
                </div>
                <div style={{ marginTop: "20px" }}>

                    <FieldLabel  >Description</FieldLabel>
                    <Stack gap="small">

                        <TextArea value={editableInfo.description} onChange={e => setEditableInfo({ ...editableInfo, description: e.target.value })} />
                    </Stack>
                </div>

                <Grid container spacing={2} style={{ marginTop: "auto" }}>
                    <Grid item xs={props.itemId ? 8 : 12}>
                        <Button tone='active' weight='bold' style={{ width: "100%" }} onClick={async () => {

                            try {




                                if (props.itemId) {

                                    const res = await updateCategory({ variables: { id: props.itemId, data: { title: editableInfo.title, code: editableInfo.code, description: editableInfo.description } } })
                                    if (res.errors)
                                        throw new Error(res.errors[0].message)


                                    setPageState({
                                        ...pageState,
                                        snackbarIsOpen: true,
                                        snackbarMessage: 'با موفقیت به روز شد',
                                        snackbarSeverity: 'success'
                                    })


                                } else {

                                    const res = await createCategory({
                                        variables: {
                                            data: {
                                                title: editableInfo.title,
                                                code: editableInfo.code,
                                                description: editableInfo.description,
                                                parent: props.parentId ? {
                                                    connect: { id: props.parentId }
                                                } : null
                                            }
                                        }
                                    })

                                    if (res.errors)
                                        throw new Error(res.errors[0].message)

                                    await setPageState({
                                        ...pageState,
                                        snackbarIsOpen: true,
                                        snackbarMessage: 'با موفقیت ایجاد شد',
                                        snackbarSeverity: 'success'
                                    })
                                }

                                props.onSubmit()

                                props.onClose()


                            } catch (error) {
                                console.error(error)
                                setPageState({
                                    snackbarIsOpen: true,
                                    snackbarMessage: String(error),
                                    snackbarSeverity: 'error'
                                })
                                props.onClose()
                            }

                        }

                        } >

                            {props.itemId ? "ویرایش" : "افزودن"}
                        </Button>
                    </Grid>
                    {props.itemId && <Grid item xs={4} >
                        <Button tone='negative' style={{ width: "100%" }}
                            onClick={async () => {
                                //delete
                                await deleteCategory({ variables: { id: props.itemId! } })

                                props.onSubmit()
                                // refetch()
                                props.onClose()
                            }

                            } >
                            حذف
                        </Button>
                    </Grid>
                    }
                </Grid>

            </FieldContainer>
        </Box>
    );
}


export default function GroupsPage() {

    const router = useRouter()
    const params = router.query[""] as string[]


    const [pageState, setPageState] = React.useState<PageState>({
        snackbarIsOpen: false,
        snackbarMessage: "",
        snackbarSeverity: "success" as "success" | "error" | "warning" | "info",

    })

    return (
        <PageContainer header="گروه بندی ها" title="گروه بندی ها">
            <ThemeProvider theme={theme}>

                <GroupContext.Provider value={[pageState, setPageState]}>
                    <Grid container direction="row" spacing={1}   >

                        {
                            params?.map((i, inx) => <Grid xs={params.length === 1 ? 8 : 12 / params.length} key={i} item > <Item> <Group
                                index={inx}
                                parentId={i === "index" ? null : i}
                                onClick={(i) => {
                                    console.log(i)
                                    router.push(`/groups/${params.slice(0, inx + 1).join("/")}/${i}`)
                                }}
                            /> </Item> </Grid>)
                        }
                    </Grid>
                    <Snackbar open={pageState.snackbarIsOpen} autoHideDuration={4000} onClose={() => setPageState({ ...pageState, snackbarIsOpen: false })} >
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