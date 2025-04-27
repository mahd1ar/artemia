import type { Lists } from '.keystone/types'
import type { Session } from '../data/types'
import { graphql, list } from '@keystone-6/core'
import { allowAll } from '@keystone-6/core/access'
import {
  bigInt,
  relationship,
  text,
  timestamp,
  virtual,
} from '@keystone-6/core/fields'
import { getRoleFromArgs, Roles } from '../data/types'
import { editIfAdmin } from '../data/utils'
import { persianCalendar } from '../src/custom-fields/persian-calander'

export const Approval = list<Lists.Approval.TypeInfo<Session>>({
  access: allowAll,
  ui: {
    label: 'مصوبات',
    listView: {
      initialColumns: ['code', 'title', 'estimatedBudget', 'totalStatementsPayable'],
    },
    isHidden(args) {
      return (args.session)?.data.role === Roles.workshop
    },
    itemView: {
      defaultFieldMode(args) {
        const currentRole = getRoleFromArgs(args)
        return currentRole > Roles.operator ? 'read' : 'edit'
      },
    },
  },
  fields: {
    code: text(),
    title: text({
      label: 'عنوان',
    }),
    project: relationship({
      ref: 'Project.approvals',
      many: false,
      label: 'پروژه',
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: {
          fieldMode(args) { return editIfAdmin(args) },
          fieldPosition: 'sidebar',
        },
      },
    }),
    estimatedBudget: bigInt({
      label: 'بودجه تخمینی',
      ui: {
        views: './src/custome-fields-view/bigint-with-farsi-letters.tsx',
      },
    }),

    totalStatementsPayable: virtual({
      label: 'مجموع پرداخت شده',
      ui: {
        itemView: {
          fieldPosition: 'sidebar',
        },
        views: './src/custome-fields-view/virtual-total-payable.tsx',
      },
      field: graphql.field({
        type: graphql.BigInt,
        async resolve(item, args, context) {
          if (!item.id)
            return 0n

          let cost = 0n
          const data = await context.query.Approval.findOne({
            where: { id: item.id.toString() },
            query: 'description { id totalStatementsPayable } ',
          })
          data.description.forEach((i: any) => {
            cost = cost + BigInt(i.totalStatementsPayable)
          })

          return cost
        },
      }),
    }),

    startDate: persianCalendar({
      label: 'تاریخ شروع',
      ui: {

      },
    }),
    estimatedEndDate: persianCalendar({
      label: 'تاریخ تخمینی پایان پروژه',
    }),

    description: relationship({
      ref: 'Description.approvals',
      many: true,
      label: 'شرح مصوبات',
      ui: {
        createView: {
          fieldMode: 'hidden',
        },
        views: './src/custome-fields-view/list-relationship.tsx',
      },
    }),
    createdAt: timestamp({
      defaultValue: { kind: 'now' },
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: {
          fieldPosition: 'sidebar',
        },
      },
    }),
    createdBy: relationship({
      ref: 'User.approvals',
      many: false,
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: {
          fieldMode(args) { return editIfAdmin(args) },
          fieldPosition: 'sidebar',
        },
      },
      hooks: {
        resolveInput(args) {
          if (args.operation === 'create') {
            const session = args.context.session
            args.resolvedData.createdBy = { connect: { id: session?.itemId } }
          }
          return args.resolvedData.createdBy
        },
      },
    }),
  },
})
