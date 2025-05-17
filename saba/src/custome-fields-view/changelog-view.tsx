import type { controller } from '@keystone-6/core/fields/types/json/views'
import type { FieldProps } from '@keystone-6/core/types'
import { gql, useQuery } from '@apollo/client'
import { useList } from '@keystone-6/core/admin-ui/context'
import { FieldContainer, FieldLabel } from '@keystone-ui/fields'
import { ThemeProvider, Typography } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import { useRouter } from 'next/router'
import React from 'react'
import { theme } from '../../data/utils'

const GETUSER = gql`
  query GETUSER($ids: [ID!]) {
    users(where: {id: {in : $ids }}) {
      id
      name
      avatar {
        url
      }
    }
  }
` as import('../../__generated__/ts-gql/GETUSER').type

function capitalizeFirstLetter(string: string) {
  return string.split('-').map(i => i.charAt(0).toUpperCase() + i.slice(1)).join('')
}

function FolderList(srt: { values?: string }) {
  const router = useRouter()
  const param = router.asPath.split('/').filter(Boolean).at(0)
  const resource = param === 'invoices'
    ? 'Invoice'
    : param === 'statements'
      ? 'Statement'
      : param === 'contracts' ? 'Contract' : capitalizeFirstLetter(param?.slice(0, -1) || '')

  if (!srt.values)
    return null

  const val: {
    ops: string
    items: string[]
    by: string
    at: string
  }[] = JSON.parse(srt.values)

  const { data: users } = useQuery(GETUSER, {
    variables: {
      ids: Array.from(new Set(val.map(i => i.by))),
    },
  })

  if (Array.isArray(val) === false) {
    return <div>.</div>
  }

  if (val.length === 0) {
    return <div>.</div>
  }
  const list = useList(resource as string)

  return (
    <ThemeProvider theme={theme}>

      <List dir="rtl" sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {
          val.map(i => (

            <ListItem dir="rtl" key={i.at}>
              <ListItemAvatar>
                <Avatar>
                  <img src={users?.users?.find(u => u.id === i.by)?.avatar?.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {/* <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"></path><path fill="currentColor" d="M12 2c5.523 0 10 4.477 10 10a9.96 9.96 0 0 1-2.258 6.33l.02.022l-.132.112A9.98 9.98 0 0 1 12 22c-2.95 0-5.6-1.277-7.43-3.307l-.2-.23l-.132-.11l.02-.024A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2m0 15c-1.86 0-3.541.592-4.793 1.406A7.97 7.97 0 0 0 12 20a7.97 7.97 0 0 0 4.793-1.594A8.9 8.9 0 0 0 12 17m0-13a8 8 0 0 0-6.258 12.984C7.363 15.821 9.575 15 12 15s4.637.821 6.258 1.984A8 8 0 0 0 12 4m0 2a4 4 0 1 1 0 8a4 4 0 0 1 0-8m0 2a2 2 0 1 0 0 4a2 2 0 0 0 0-4"></path></g></svg> */}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                dir="rtl"
                style={{ textAlign: 'right' }}
                primary={users?.users?.find(u => u.id === i.by)?.name}
                secondary={(
                  <React.Fragment>
                    <Typography
                      dir="rtl"
                      component="span"
                      variant="body2"
                      sx={{ color: 'text.primary', display: 'inline' }}
                    >
                      ایتم &nbsp;
                      {

                        i.items.map(i => list.fields[i]?.label || i).join('، ')
                      }
                      {
                        i.ops === 'update' ? ' تغییر یافت' : ' اضافه شد'
                      }
                    </Typography>
                    <br />
                    <span dir="rtl">

                      -
                      {' '}
                      {
                        Intl.DateTimeFormat('fa', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(i.at))
                      }
                    </span>
                  </React.Fragment>
                )}
              />
            </ListItem>
          ))
        }

      </List>
    </ThemeProvider>
  )
}

export function Field({
  field,
  value,
}: FieldProps<typeof controller>) {
  return (
    <>
      <FieldContainer>
        <FieldLabel>{field.label}</FieldLabel>
        <FolderList values={value} />
      </FieldContainer>

    </>
  )
}
// const onSubmitNewRelatedLink = () => {
//     if (onChange) {
//         const relatedLinksCopy = [...relatedLinks, { label: labelValue, href: hrefValue }]
//         onChange(JSON.stringify(relatedLinksCopy))
//         onCancelRelatedLink()
//     }
// }

// const onDeleteRelatedLink = (index: number) => {
//     if (onChange) {
//         const relatedLinksCopy = [...relatedLinks]
//         relatedLinksCopy.splice(index, 1)
//         onChange(JSON.stringify(relatedLinksCopy))
//         onCancelRelatedLink()
//     }
// }

// const onEditRelatedLink = (index: number) => {
//     if (onChange) {
//         setIndex(index)
//         setLabelValue(relatedLinks[index].label)
//         setHrefValue(relatedLinks[index].href)
//     }
// }

// const onUpdateRelatedLink = () => {
//     if (onChange && index !== null) {
//         const relatedLinksCopy = [...relatedLinks]
//         relatedLinksCopy[index] = { label: labelValue, href: hrefValue }
//         onChange(JSON.stringify(relatedLinksCopy))
//         onCancelRelatedLink()
//     }
// }

// const onCancelRelatedLink = () => {
//     setIndex(null)
//     setLabelValue('')
//     setHrefValue('')
// }
