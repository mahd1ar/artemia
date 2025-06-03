import type { Lists } from '.keystone/types'
import type { Session } from '../data/types'
import { list } from '@keystone-6/core'
import { allOperations } from '@keystone-6/core/access'
import { relationship, select, text, timestamp } from '@keystone-6/core/fields'
import { isAdmin } from '../data/access'
import { Roles } from '../data/types'

export const Log = list<Lists.PaymentItem.TypeInfo<Session>>({
  access: {
    operation: allOperations(isAdmin),
  },
  ui: {
    listView: {
      initialColumns: ['message', 'type', 'message', 'date'],
      initialSort: {
        direction: 'DESC',
        field: 'date',
      },
    },
    isHidden(args) {
      return (args.session as Session)?.data.role !== Roles.admin
    },
    itemView: {
      defaultFieldMode: 'read',
    },
  },
  fields: {
    type: select({
      options: ['info', 'warning', 'error'],
      defaultValue: 'info',
      ui: {
        displayMode: 'segmented-control',
      },
      type: 'string',
    }),
    action: select({
      options: [
        {
          label: 'ثبت صورت وضعیت',
          value: 'STATEMENT_FINALIZED_REGISTRATION',
        },
        {
          label: 'تایید صورت وضعیت',
          value: 'STATEMENT_CONFIRMED',
        },
        {
          label: 'تایید نهایی صورت وضعیت',
          value: 'STATEMENT_FINALIZED',
        },
        {
          label: 'delete resource',
          value: 'DELETE_RESOURCE',
        },
        {
          label: 'remove unreferenced rows',
          value: 'REMOVE_UNREFERENCED_ROWS',
        },
        {
          label: 'عمومی',
          value: 'GENERAL',
        },
      ],
      type: 'enum',
    }),
    message: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    date: timestamp({ defaultValue: { kind: 'now' } }),
    user: relationship({
      ref: 'User',
      many: false,
    }),
  },
})
