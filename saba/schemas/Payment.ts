import type { Lists } from '.keystone/types'
import { list } from '@keystone-6/core'
import { allowAll } from '@keystone-6/core/access'
import { bigInt, calendarDay, image, relationship, text, timestamp } from '@keystone-6/core/fields'
import { Roles, type Session } from '../data/types'
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
    attachment: image({
      storage: 'image',
      label: 'فایل پیوست',
    }),

  },
})
