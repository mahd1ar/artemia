import type { NavigationProps } from '@keystone-6/core/admin-ui/components'
import { useQuery } from '@apollo/client'
import { ListNavItems, NavigationContainer, NavItem } from '@keystone-6/core/admin-ui/components'
import { gql } from '@ts-gql/tag/no-transform'
import React from 'react'
// '@keystone-6/core/dist/declarations/src/admin-ui/apollo';

export function CustomNavigation({ lists, authenticatedItem }: NavigationProps) {
  const PARENTCATEGORYOFRESOURSE1 = gql`
        query PARENTCATEGORYOFRESOURSE1 {
            setting {
              parentCategoryOfDesign
            }
          }
  ` as import('../../__generated__/ts-gql/PARENTCATEGORYOFRESOURSE1').type

  const { data } = useQuery(PARENTCATEGORYOFRESOURSE1)

  return (
    <NavigationContainer authenticatedItem={authenticatedItem}>
      <NavItem href="/">Dashboard</NavItem>

      {
        data?.setting?.parentCategoryOfDesign
        && (
          <NavItem
            href={`/folders/${data.setting.parentCategoryOfDesign}`}
          >
            نقشه ها
          </NavItem>
        )

      }
      <ListNavItems
        lists={lists}
        include={['Approval', 'Invoice', 'Contract', 'Statement', 'DailyReport', 'SafetyReport', 'FileStore', 'Contract', 'User', 'Log', 'Setting']}
      />
      <NavItem href="/groups/index">
        گروه بندی ها
      </NavItem>
      <NavItem href="/changelog">Change Log</NavItem>
    </NavigationContainer>
  )
}
