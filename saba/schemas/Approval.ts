import type { Lists } from '.keystone/types'
import type { Session, tableRelationConfig } from '../data/types'
import { graphql, list } from '@keystone-6/core'
import { allowAll } from '@keystone-6/core/access'
import {
  bigInt,
  relationship,
  text,
  timestamp,
  virtual,
} from '@keystone-6/core/fields'
import { createdBy } from '../data/functions'
import { getRoleFromArgs, Roles } from '../data/types'
import { editIfInDebugMode } from '../data/utils'
import { persianCalendar } from '../src/custom-fields/persian-calander'

export const Approval = list<Lists.Approval.TypeInfo<Session>>({
  access: allowAll,
  ui: {
    label: 'مصوبات',
    listView: {
      initialColumns: ['code', 'title', 'estimatedBudget', 'totalPayed'],
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
          fieldMode({ context }) { return editIfInDebugMode(context) },
          fieldPosition: 'sidebar',
        },
      },
    }),
    explanation: text({
      label: 'شرح مصوبه',
      ui: {
        displayMode: 'textarea',
      },
    }),
    estimatedBudget: bigInt({
      label: 'بودجه پیشبینی شده (تخمینی)',
      ui: {
        views: './src/custome-fields-view/bigint-with-farsi-letters.tsx',
      },
    }),

    totalPayed: virtual({
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
            query: 'description { id status {totalStatementsPayed totalInvoicesPayed} } ',
          })

          data.description.forEach((i: any) => {
            cost = cost
            + BigInt(i.status.totalStatementsPayed)
            + BigInt(i.status.totalInvoicesPayed)
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

    rows: relationship({
      label: 'ساختار شکست (  پیش‌بینی شده ) ',
      ref: 'Row.approval',

      many: true,
      ui: {
        description: JSON.stringify({ type: 'Predicted' } as tableRelationConfig),
        displayMode: 'cards',
        cardFields: ['commodity', 'description', 'unit', 'unitPrice', 'quantity', 'tax', 'total'],
        inlineCreate: {
          fields: ['commodity', 'description', 'unit', 'unitPrice', 'quantity', 'tax', 'total'],
        },

        views: './src/custome-fields-view/table-relation',
      },
    }),

    description: relationship({
      ref: 'Description.approvals',
      many: true,
      label: 'ساختار شکست ( اجرا شده ) ',
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
    createdBy: createdBy(),
  },
})
