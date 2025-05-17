import type { Lists } from '.keystone/types'
import { list } from '@keystone-6/core'
import { allowAll } from '@keystone-6/core/access'
import { bigInt, image, relationship, text } from '@keystone-6/core/fields'
import { changeLog, createdBy } from '../data/functions'
import { Roles, type Session } from '../data/types'
import { persianCalendar } from '../src/custom-fields/persian-calander'

export const Payment = list<Lists.Payment.TypeInfo<Session>>({
  access: allowAll,
  ui: {
    label: 'پرداخت ها',
    labelField: 'title',
    listView: {
      initialSort: {
        direction: 'DESC',
        field: 'dateOfPayment',
      },
    },
  },
  hooks: {
    async beforeOperation({ operation, item, context }) {
      // TODO test this
      if (operation === 'delete') {
        await context.prisma.paymentItem.deleteMany({
          where: {
            payment: {
              id: item.id,
            },
          },
        })
      }
    },
  },
  fields: {
    title: text(),
    // TODO deprecated delete this after fixing the db
    dateOfPayment: persianCalendar({
      label: 'تاریخ پرداخت',
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'hidden' },
      },
    }),
    // paymentDate: calendarDay({
    //   // ui: {
    //   //   views: './src/custome-fields-view/persian-calander.tsx',

    //   // },
    // }),

    description: text({
      label: 'توضیحات',
      ui: {
        displayMode: 'textarea',
      },
    }),

    paymentItems: relationship({
      ref: 'PaymentItem.payment',
      many: true,
      label: 'آیتم های پرداخت',
      ui: {
        displayMode: 'cards',
        cardFields: ['title', 'price', 'dateOfPayment', 'attachment'],
        inlineCreate: { fields: ['title', 'price', 'dateOfPayment', 'attachment'] },
        inlineConnect: false,
        inlineEdit: { fields: ['title', 'price', 'dateOfPayment', 'attachment'] },
        linkToItem: false,
      },
    }),
    // TODO deprecated delete this after fixing the db
    // TODO this field can be replaced with sum of paymentItems's price
    price: bigInt({
      label: 'مبلغ',
      validation: {
        min: BigInt(0),
      },
      ui: {
        views: './src/custome-fields-view/bigint-with-farsi-letters.tsx',
        createView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'hidden' },
      },
    }),
    constractor: relationship({
      ref: 'Constractor',
      many: false,
      label: 'پیمانکار',

    }),
    // TODO deprecated delete this after fixing the db
    attachment: image({
      storage: 'image',
      label: 'فایل پیوست',
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'hidden' },
      },
    }),
    statement: relationship({
      ref: 'Statement.peyment',
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
        },
      },
    }),
    invoice: relationship({
      ref: 'Invoice.payment',
      many: false,
      label: 'فاکتور',
      ui: {
        createView: { fieldMode: 'hidden' },
      },
    }),
    createdBy: createdBy(),
    changeLog: changeLog('title'),

  },
})
