import React from 'react'
import Link from 'next/link'
import { PageContainer } from '@keystone-6/core/admin-ui/components'
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { FolderIcon, FileIcon, PlusIcon } from "@keystone-ui/icons"
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Box, Button, Container, ListItemButton, Toolbar } from '@mui/material'





export default function CustomPage() {
    const router = useRouter()
    const params = router.query['']
    const [folderNames, setFolderNames] = React.useState<{ label: string, value: string }[]>([])

    if (typeof params === 'string')
        return <div>err::typeof params is string!</div>

    const parent = params?.at(-1)


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
  ` as import('../../../__generated__/ts-gql/FOLDERPATH').type

    const { data, loading } = useQuery(FOLDERPATH, {
        variables: {
            id: parent!
        },
        fetchPolicy: 'no-cache'
    })

    function getName(id: string): string {
        return folderNames.find(i => i.value === id)?.label || '..'
    }

    React.useEffect(() => {
        setFolderNames([])
        const _folderNames: typeof folderNames = []
        data?.category?.children?.forEach(i => {
            _folderNames.push({
                label: i.title || '',
                value: i.id
            })
        })

        _folderNames.push({
            value: data?.category?.id || '',
            label: data?.category?.title || ''
        })

        _folderNames.push({
            label: data?.category?.parent?.title || '',
            value: data?.category?.parent?.id || ''
        })

        setFolderNames(_folderNames)

    }, [data])


    return (
        <PageContainer header='نقشه ها' title='نقشه ها'  >
            <Toolbar>

                <Breadcrumbs sx={{ flexGrow: 1 }} aria-label="breadcrumb">
                    {
                        params?.map((i, inx) => (
                            params.length > inx + 1 ? <Link color="inherit" href={'/folders/' + params.slice(0, params.indexOf(i) + 1).join('/')} >
                                {getName(i)}
                            </Link> :
                                <Typography key={i} color="text.primary">{getName(i)}</Typography>
                        ))
                    }
                </Breadcrumbs>

                <Button endIcon={<PlusIcon />} variant='contained'
                    onClick={() => router.push('/designs/create?with_category=' + parent)}
                >نقشه جدید</Button>
            </Toolbar>

            {data?.category?.children?.length === 0 && data.category.designs?.length === 0 && <Container maxWidth="sm" >
                <Box sx={{ padding: '2rem', display: 'flex', justifyContent: 'center' }} >
                    هیچ فایلی ای یافت نشد
                </Box>
            </Container>}
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {
                    data?.category?.children?.map(i => (

                        <ListItemButton
                            key={i.id}
                            onClick={e => {
                                router.push(router.asPath + '/' + i.id)
                            }}
                        >
                            <ListItemIcon>
                                <FolderIcon />
                            </ListItemIcon>
                            <ListItemText primary={i.title} />
                        </ListItemButton>
                    ))
                }
                {
                    data?.category?.designs?.map(i => (

                        <ListItemButton
                            key={i.id}
                            onClick={e => {
                                router.push('/designs/' + i.id)
                            }}
                        >
                            <ListItemIcon>
                                <FileIcon />
                            </ListItemIcon>
                            <ListItemText primary={i.title} secondary={new Date(i.createdAt).toLocaleDateString()} />
                        </ListItemButton>
                    ))
                }

            </List>


        </PageContainer>

    );


}
