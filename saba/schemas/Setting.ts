import type { Lists } from '.keystone/types'
import type { Session } from '../data/types'
import { group, list } from '@keystone-6/core'
import { allOperations, allowAll } from '@keystone-6/core/access'
import { checkbox, relationship, text } from '@keystone-6/core/fields'
import { isAdmin } from '../data/access'
import { getRoleFromArgs, Roles } from '../data/types'

export const Setting = list<Lists.Setting.TypeInfo<Session>>({
  access: {
    operation: {
      ...allOperations(isAdmin),
      query: allowAll,
    },
  },
  isSingleton: true,
  ui: {
    isHidden(args) {
      return getRoleFromArgs(args) > Roles.operator
    },
  },
  fields: {
    sendMessageToTelegram: checkbox(),
    ...group({
      label: 'Categories',
      fields: {
        parentCategoryOfDesign: text(),
        rootCategoryOfGoodsAndServices: text({
          ui: {
            description: '2 digit code from the category. eg, 42 ',
          },
        }),
      },
    }),
    contractSample: relationship({
      ref: 'FileStore',
      label: 'نمونه قرارداد',
      many: true,
      ui: {
        labelField: 'title',
      },
    }),
  },
})
