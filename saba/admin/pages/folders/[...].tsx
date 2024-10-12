import React from "react";
import Link from "next/link";
import { PageContainer } from "@keystone-6/core/admin-ui/components";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { FolderIcon, FileIcon, PlusIcon, TrashIcon } from "@keystone-ui/icons";
import {
    Backdrop,
    Box,
    Breadcrumbs,
    Button,
    buttonClasses,
    Container,
    Fade,
    IconButton,
    InputAdornment,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Modal,
    TextField,
    Toolbar,
    Typography,
} from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { LoadingDots } from '@keystone-ui/loading'

export default function CustomPage() {
    const style = {
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

    // modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [newFolderName, setNewFolderName] = React.useState("");

    const theme = createTheme({
        typography: {
            fontFamily:
                'system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",sans-serif',
        },
    });

    const router = useRouter();
    const params = router.query[""];
    const [folderNames, setFolderNames] = React.useState<
        { label: string; value: string }[]
    >([]);

    if (typeof params === "string")
        return <div>err::typeof params is string!</div>;

    const parent = params?.at(-1);

    const FOLDERPATH = gql`
    query FOLDERPATH($id: ID!) {
      category(where: { id: $id }) {
        id
        title
        childrenCount
        children {
          id
          title
        }
        parent {
          id
          title
        }
        designs {
          id
          title
          createdAt
        }
      }
    }
  ` as import("../../../__generated__/ts-gql/FOLDERPATH").type;

    const CREATEFOLDER = gql`
    mutation CREATEFOLDER($data: CategoryCreateInput!) {
      createCategory(data: $data) {
        id
      }
    }
  ` as import("../../../__generated__/ts-gql/CREATEFOLDER").type;

    const REMOVEFOLDER = gql`
mutation REMOVEFOLDER($id: ID!) {
  deleteCategory(where: { id: $id }) {
    id
  }
}
` as import("../../../__generated__/ts-gql/REMOVEFOLDER").type

    const { data, loading, refetch } = useQuery(FOLDERPATH, {
        variables: {
            id: parent!,
        },
        fetchPolicy: "no-cache",
    });

    const [createFolderMutation] = useMutation(CREATEFOLDER, {
        fetchPolicy: "no-cache",
    });

    const [removeFolderMutation] = useMutation(REMOVEFOLDER, {
        fetchPolicy: "no-cache",
    });


    function getName(id: string): string {
        return folderNames.find((i) => i.value === id)?.label || "..";
    }

    function createFolder() {

        if (newFolderName.trim() === "") {
            alert("نام فولدر را وارد کنید");
            return
        }

        createFolderMutation({
            variables: {
                data: {
                    parent: { connect: { id: parent! } },
                    title: newFolderName.trim()
                }
            }
        })

        refetch()
        handleClose();
    }

    React.useEffect(() => {
        setFolderNames([]);
        const _folderNames: typeof folderNames = [];
        data?.category?.children?.forEach((i) => {
            _folderNames.push({
                label: i.title || "",
                value: i.id,
            });
        });

        _folderNames.push({
            value: data?.category?.id || "",
            label: data?.category?.title || "",
        });

        _folderNames.push({
            label: data?.category?.parent?.title || "",
            value: data?.category?.parent?.id || "",
        });

        setFolderNames(_folderNames);
    }, [data]);


    if (loading)
        return <PageContainer header='نقشه ها' title='نقشه ها'  >
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: "300px" }} >

                <LoadingDots label='loadinggg' />
            </Box>
        </PageContainer>

    return (
        <PageContainer header="نقشه ها" title="نقشه ها">
            <ThemeProvider theme={theme}>
                <Toolbar>
                    <Breadcrumbs sx={{ flexGrow: 1 }} aria-label="breadcrumb">
                        {params?.map((i, inx) =>
                            params.length > inx + 1 ? (
                                <Link
                                    key={inx}
                                    color="inherit"
                                    href={
                                        "/folders/" +
                                        params.slice(0, params.indexOf(i) + 1).join("/")
                                    }
                                >
                                    {getName(i)}
                                </Link>
                            ) : (
                                <Typography key={i} color="grey.500">
                                    {getName(i)}
                                </Typography>
                            )
                        )}
                    </Breadcrumbs>

                    <Button
                        endIcon={<PlusIcon />}
                        variant="contained"
                        onClick={() =>
                            router.push({
                                pathname: '/designs/create',
                                query: {
                                    with_category: parent,
                                    callbackurl: router.asPath
                                }
                            })
                        }
                    >
                        نقشه جدید
                    </Button>
                </Toolbar>

                {data?.category?.children?.length === 0 &&
                    data.category.designs?.length === 0 && (
                        <Container maxWidth="sm">
                            <Box
                                sx={{
                                    padding: "2rem",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                هیچ فایلی ای یافت نشد
                            </Box>
                        </Container>
                    )}
                <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                    {data?.category?.children?.map((i) => (
                        <ListItemButton
                            key={i.id}
                            onClick={(e) => {
                                router.push(router.asPath + "/" + i.id);
                            }}
                        >
                            <ListItemIcon>
                                <FolderIcon />
                            </ListItemIcon>
                            <ListItemText primary={i.title} />
                            <ListItemSecondaryAction
                                onClick={async (e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    if (confirm("آیا از حذف این فولدر اطمینان دارید؟")) {
                                        await removeFolderMutation({
                                            variables: { id: i.id },
                                        })
                                        refetch()
                                    }
                                }}
                            ><TrashIcon size={"small"} color="red" /></ListItemSecondaryAction>
                        </ListItemButton>
                    ))}
                    {data?.category?.designs?.map((i) => (
                        <ListItemButton
                            key={i.id}
                            onClick={(e) => {
                                router.push("/designs/" + i.id + '?callbackurl=' + router.asPath);
                            }}
                        >
                            <ListItemIcon>
                                <FileIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={i.title}
                                secondary={Intl.DateTimeFormat("fa-ir").format(
                                    new Date(i.createdAt)
                                )}
                            />
                        </ListItemButton>
                    ))}
                </List>
                <div>
                    <Button onClick={handleOpen}>New Folder</Button>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        slots={{ backdrop: Backdrop }}
                        slotProps={{
                            backdrop: {
                                timeout: 500,
                            },
                        }}
                    >
                        <Fade in={open}>
                            <Box sx={style}>
                                <Typography
                                    id="transition-modal-title"
                                    variant="h6"
                                    component="h2"
                                >
                                    Create a new folder
                                </Typography>

                                <Box
                                    sx={{ display: "flex", alignItems: "flex-end", gap: "10px" }}
                                >
                                    <FolderIcon color="gray" />
                                    <TextField
                                        onChange={(e) => setNewFolderName(e.target.value)}
                                        id="transition-modal-description"
                                        label="folder's name"
                                        size="medium"
                                        variant="standard"
                                    />
                                    <Button variant="text" size="medium" onClick={createFolder}>
                                        Create
                                    </Button>
                                </Box>

                            </Box>
                        </Fade>
                    </Modal>
                </div>
            </ThemeProvider>
        </PageContainer>
    );
}
