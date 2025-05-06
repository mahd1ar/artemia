import type { Lists } from '.keystone/types'
import { list } from '@keystone-6/core'
import { allowAll } from '@keystone-6/core/access'
import { bigInt, calendarDay, image, json, relationship, text, timestamp } from '@keystone-6/core/fields'
import { Roles, type Session } from '../data/types'
import { editIfAdmin } from '../data/utils'
import { persianCalendar } from '../src/custom-fields/persian-calander'

export const Payment = list<Lists.Payment.TypeInfo<Session>>({
  access: allowAll,
  ui: {
    label: 'پرداخت ها',
    labelField: 'title',
  },
  fields: {
    title: text({
      ui: { createView: { fieldMode: 'hidden' } },
    }),
    dateOfPayment: persianCalendar({
      label: 'تاریخ پرداخت',
    }),
    // paymentDate: calendarDay({
    //   // ui: {
    //   //   views: './src/custome-fields-view/persian-calander.tsx',

    //   // },
    // }),
    statement: relationship({
      ref: 'Statement.peyments',
      many: false,
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: {
          fieldMode(args) {
            const role = args.session?.data.role

            if (role === Roles.admin || role === Roles.operator) {
              return 'edit'
            }
            else {
              return 'read'
            }
          },
          fieldPosition: 'sidebar',
        },
      },
    }),
    description: text({
      label: 'توضیحات',
      ui: {
        displayMode: 'textarea',
      },
    }),
    price: bigInt({
      label: 'مبلغ',
      validation: {
        min: BigInt(0),
      },
      ui: {
        views: './src/custome-fields-view/bigint-with-farsi-letters.tsx',
      },
    }),
    constractor: relationship({
      ref: 'Constractor',
      many: false,
      label: 'پیمانکار',

    }),
    attachment: image({
      storage: 'image',
      label: 'فایل پیوست',
    }),
    changeLog: json({
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: {
          fieldPosition: 'sidebar',
          fieldMode(args) {
            if (args.session?.data.role === Roles.admin)
              return 'read'
            else
              return 'hidden'
          },
        },
        views: './src/custome-fields-view/changelog-view.tsx',
      },
      hooks: {
        resolveInput(args) {
          const state = (args.item?.changeLog) ? JSON.parse(args.item.changeLog || '[]') : []
          const info = {
            ops: args.operation,
            items: Object.keys(args.inputData),
            by: args.context.session?.itemId,
            at: new Date(),
          }

          state.push(info)

          return JSON.stringify(state)
        },
      },
    }),
    createdBy: relationship({
      ref: 'User',
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
