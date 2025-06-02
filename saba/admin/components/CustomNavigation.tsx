import type { NavigationProps } from '@keystone-6/core/admin-ui/components'
import type { ListMeta } from '@keystone-6/core/types'
import { useQuery } from '@apollo/client'
import { ListNavItems, NavigationContainer, NavItem } from '@keystone-6/core/admin-ui/components'
import { useKeystone } from '@keystone-6/core/admin-ui/context'
import { json } from '@keystone-6/core/fields'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import AddIcon from '@mui/icons-material/Add'
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'
import CloudDoneOutlinedIcon from '@mui/icons-material/CloudDoneOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import DesignServicesOutlinedIcon from '@mui/icons-material/DesignServicesOutlined'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial'
import FolderSpecialIconOutlined from '@mui/icons-material/FolderSpecialOutlined'
import HistoryEduOutlinedIcon from '@mui/icons-material/HistoryEduOutlined'
import MailIcon from '@mui/icons-material/Mail'
import MapOutlinedIcon from '@mui/icons-material/MapOutlined'
import MiscellaneousServicesOutlinedIcon from '@mui/icons-material/MiscellaneousServicesOutlined'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import OutlinedFlagOutlinedIcon from '@mui/icons-material/OutlinedFlagOutlined'
import PaymentIcon from '@mui/icons-material/Payment'
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined'
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined'
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined'
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined'
import { Collapse, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, ThemeProvider, Toolbar } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { gql } from '@ts-gql/tag/no-transform'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { customtheme } from '../theme'

function Drawer(props: { listMeta: ListMeta[] }) {
  interface subItemsType { label: string, href: string, isSelected: boolean, icon: React.ReactNode }

  const PARENTCATEGORYOFRESOURSE1 = gql`
  query PARENTCATEGORYOFRESOURSE1 {
      setting {
        parentCategoryOfDesign
      }
      usersCount
      projects {
        title
        id
      }
      approvals {
        code
        title
        id
      }
    }
` as import('../../__generated__/ts-gql/PARENTCATEGORYOFRESOURSE1').type

  const { data } = useQuery(PARENTCATEGORYOFRESOURSE1)

  const router = useRouter()
  const ks = useKeystone()
  const [openSubs, setOpenSubs] = React.useState<string[]>([])
  const [contextMenu, setContextMenu] = React.useState<{
    mouseX: number
    mouseY: number
    selectedResource: string
  } | null>(null)

  const menuItems = React.useMemo(() => {
    const items: { resource: string, icon: React.ReactNode, label?: string, href?: string, subItems?: subItemsType[] }[][] = [
      [{
        resource: 'Dashboard',
        icon: <SpaceDashboardOutlinedIcon />,
        href: '/',
        label: 'داشبورد',
      }],
      [
        {
          resource: 'Project',
          icon: <DesignServicesOutlinedIcon />,
          subItems: (data?.projects?.length || 0) > 0
            ? data!.projects!.map(i => ({
              label: i?.title || 'بدون عنوان',
              href: `/projects/${i.id}`,
              isSelected: router.pathname.search(`/projects/${i.id}`) > -1,
              icon: <DesignServicesOutlinedIcon />,
            }))
            : [
                {
                  label: ' ایجاد پروژه جدید',
                  href: '/projects/create',
                  isSelected: false,
                  icon: <AddIcon />,
                },
              ],
        },
        {
          resource: 'Approval',
          icon: <FolderSpecialIcon />,
          subItems: (data?.approvals?.length || 0) > 0
            ? data?.approvals?.map((i) => {
              return {
                label: i.code === i.title ? (i.code || 'بدون عنوان') : `${i.title} (${i.code})`,
                href: `/approvals/${i.id}`,
                isSelected: router.pathname.search(`/approvals/${i.id}`) > -1,
                icon: <FolderSpecialIconOutlined />,
              }
            })
            : [],
        },
        {
          resource: 'Contract',
          icon: <HistoryEduOutlinedIcon />,
        },

      ],
      [
        {
          resource: 'Invoice',
          icon: <ReceiptOutlinedIcon />,
        },
        {
          resource: 'Statement',
          icon: <DescriptionOutlinedIcon />,
        },
        {
          resource: 'Payment',
          icon: <PaymentIcon />,
        },
      ],
      [
        {
          resource: 'DailyReport',
          icon: <OutlinedFlagOutlinedIcon />,
        },
        {
          resource: 'SafetyReport',
          icon: <ReportOutlinedIcon />,
        },
        {
          resource: 'Map',
          label: 'نقشه ها',
          icon: <MapOutlinedIcon />,
          href: `/folders/${data?.setting?.parentCategoryOfDesign}`,
        },
        {
          resource: 'FileStore',
          icon: <CloudDoneOutlinedIcon />,
        },
        {
          resource: 'User',
          icon: <AccountCircleOutlinedIcon />,
          // @ts-expect-error authenticatedItem have invalid type.d.ts
          href: data?.usersCount === 1 ? `/users/${ks.authenticatedItem.id}` : '',
        },
        {
          resource: 'Setting',
          icon: <MiscellaneousServicesOutlinedIcon />,
        },
        {
          resource: 'Groups',
          label: 'گروه ها',
          icon: <CategoryOutlinedIcon />,
          href: '/groups/index',
        },

        {
          resource: 'Log',
          icon: <QuestionMarkOutlinedIcon />,
        },
      ],
    ]

    return items.map(i => i.map((j) => {
      const schema = props.listMeta.find(lm => lm.key === j.resource)
      const result = {
        resource: j.resource,
        label: j.label || '',
        isSelected: false,
        icon: j.icon,
        href: j.href || '#',
        subItems: j.subItems || [],
      }

      if (!schema)
        return result

      if (!result.label)
        result.label = schema.label || j.resource

      result.href = j.href || `/${schema.path}`

      result.isSelected = router.pathname.search(result.href) > -1

      return result
    }).filter(j => !!j.label))
  }, [data])

  const handleContextMenu = (event: React.MouseEvent, resource: string) => {
    event.preventDefault()
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
            selectedResource: resource,
          }
        : null,
    )

    // Prevent text selection lost after opening the context menu on Safari and Firefox
    const selection = document.getSelection()
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)

      setTimeout(() => {
        selection.addRange(range)
      })
    }
  }

  const handleClose = () => {
    setContextMenu(null)
  }

  useEffect(() => {
    return
    const targetElement = document.querySelector('main')

    if (!targetElement) {
      console.warn('Target element not found for MutationObserver')
      return
    }

    const observer = new MutationObserver((mutationsList, _observer) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList' || mutation.type === 'characterData') {
          if ((targetElement.querySelector('div div')?.className.indexOf('ColumnLayout') || -1) === -1) {
            console.warn('[2] Target element not found for MutationObserver')
            return
          }
          const firstCol = targetElement.querySelector('div div div div > div') as HTMLDivElement | null
          if (
            firstCol
          ) {
            firstCol.style.direction = 'rtl'
          }
        }
      }
    })

    // Start observing with specific configurations
    observer.observe(targetElement, {
      childList: true, // Watch for added/removed child nodes
      characterData: true, // Watch for changes to text content
      subtree: true, // Optional: extend observation to all descendants
    })
  }, [])

  return (
    <div>

      {
        menuItems.map((i, ixi) => (
          <>
            <List key={ixi}>

              {
                i.map((j, inx) => (
                  j.subItems && j.subItems.length > 0
                    ? (
                        <>
                          <ListItemButton
                            onDoubleClick={() => {
                              router.push(j.href || '#')
                            }}
                            onClick={() => {
                              if (openSubs.includes(j.resource)) {
                                setOpenSubs(openSubs.filter(s => s !== j.resource))
                              }
                              else {
                                setOpenSubs([...openSubs, j.resource])
                              }
                            }}
                            onContextMenu={(event) => {
                              handleContextMenu(event, j.resource || '#')
                            }}
                          >
                            <ListItemIcon>
                              {j.icon || <InboxIcon />}
                            </ListItemIcon>
                            <ListItemText primary={j.label} />
                            {openSubs.includes(j.resource) ? <ExpandLess /> : <ExpandMore />}
                          </ListItemButton>
                          <Collapse in={openSubs.includes(j.resource)} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                              {
                                j.subItems.map((k, ixk) => (
                                  <ListItemButton
                                    sx={{ pl: 4 }}
                                    onClick={() => {
                                      router.push(k.href || '#')
                                    }}
                                    key={ixk}
                                  >
                                    <ListItemIcon>
                                      {k.icon || <InboxIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={k.label} />
                                  </ListItemButton>
                                ))
                              }
                            </List>
                          </Collapse>
                        </>
                      )
                    : (
                        <ListItem
                          key={inx}
                          disablePadding
                          onContextMenu={(event) => {
                            handleContextMenu(event, j.resource || '#')
                          }}
                        >
                          <ListItemButton
                            onClick={() => {
                              router.push(j.href || '#')
                            }}
                            selected={j.isSelected}
                          >
                            <ListItemIcon>
                              {j.icon}
                            </ListItemIcon>
                            <ListItemText

                              primaryTypographyProps={{
                                color: '#666',
                                fontWeight: 'medium',
                                letterSpacing: 0,
                              }}
                              primary={j.label}
                            />

                          </ListItemButton>
                        </ListItem>
                      )
                ))
              }
            </List>
            <Divider />

            <Menu
              open={contextMenu !== null}
              onClose={handleClose}
              anchorReference="anchorPosition"
              anchorPosition={
                contextMenu !== null
                  ? { top: contextMenu.mouseY + 10, left: contextMenu.mouseX }
                  : undefined
              }
            >
              <MenuItem onClick={() => {
                const href = menuItems.flat().find(i => i.resource === contextMenu?.selectedResource)?.href
                if (href)
                  window.open(href, '_blank')
                handleClose()
              }}
              >
                open in new tab
              </MenuItem>
              <MenuItem onClick={() => {
                const href = menuItems.flat().find(i => i.resource === contextMenu?.selectedResource)?.href
                if (href)
                  window.open(href, '_blank', `width=${screen.width},height=${screen.height},top=100,left=100,menubar=no,toolbar=no,status=no`)
                handleClose()
              }}
              >
                open in new window
              </MenuItem>
            </Menu>
          </>
        ))
      }

    </div>
  )
}

export function CustomNavigation({ lists, authenticatedItem }: NavigationProps) {
  return (
    <NavigationContainer authenticatedItem={authenticatedItem}>
      <ThemeProvider theme={customtheme}>
        <Drawer listMeta={lists} />
      </ThemeProvider>
    </NavigationContainer>
  )
}
