import type { NavigationProps } from '@keystone-6/core/admin-ui/components'
import type { ListMeta } from '@keystone-6/core/types'
import { useQuery } from '@apollo/client'
import { ListNavItems, NavigationContainer, NavItem } from '@keystone-6/core/admin-ui/components'
import { useKeystone } from '@keystone-6/core/admin-ui/context'
import { json } from '@keystone-6/core/fields'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'
import CloudDoneOutlinedIcon from '@mui/icons-material/CloudDoneOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial'
import HistoryEduOutlinedIcon from '@mui/icons-material/HistoryEduOutlined'
import MailIcon from '@mui/icons-material/Mail'
import MapOutlinedIcon from '@mui/icons-material/MapOutlined'
import MiscellaneousServicesOutlinedIcon from '@mui/icons-material/MiscellaneousServicesOutlined'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import OutlinedFlagOutlinedIcon from '@mui/icons-material/OutlinedFlagOutlined'
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined'
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined'
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined'
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined'
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ThemeProvider, Toolbar } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { gql } from '@ts-gql/tag/no-transform'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { customtheme } from '../theme'

function Drawer(props: { listMeta: ListMeta[] }) {
  const PARENTCATEGORYOFRESOURSE1 = gql`
  query PARENTCATEGORYOFRESOURSE1 {
      setting {
        parentCategoryOfDesign
      }
      usersCount
    }
` as import('../../__generated__/ts-gql/PARENTCATEGORYOFRESOURSE1').type

  const { data } = useQuery(PARENTCATEGORYOFRESOURSE1)

  const router = useRouter()
  const ks = useKeystone()

  const menuItems = React.useMemo(() => {
    return [
      [{
        resource: 'Dashboard',
        icon: <SpaceDashboardOutlinedIcon />,
        href: '/',
        label: 'داشبورد',
      }],
      [
        {
          resource: 'Approval',
          icon: <FolderSpecialIcon />,
        },
        {
          resource: 'Contract',
          icon: <HistoryEduOutlinedIcon />,
        },
        {
          resource: 'Invoice',
          icon: <ReceiptOutlinedIcon />,
        },
        {
          resource: 'Statement',
          icon: <DescriptionOutlinedIcon />,
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
    ].map(i => i.map((j) => {
      const schema = props.listMeta.find(lm => lm.key === j.resource)
      const result = {
        label: j.label || '',
        isSelected: false,
        icon: j.icon,
        href: j.href || '#',
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

  // useEffect(() => {
  //   console.log(ks)
  // })
  return (
    <div>

      {
        menuItems.map(i => (
          <>
            <List>
              {
                i.map((j, inx) => (
                  <ListItem key={inx} disablePadding>
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
                ))
              }
            </List>
            <Divider />
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
