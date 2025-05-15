import type { Lists } from '.keystone/types'
import type { Session } from '../data/types'
import { list } from '@keystone-6/core'
import { allowAll } from '@keystone-6/core/access'
import { bigInt, image, relationship, text } from '@keystone-6/core/fields'
import { changeLog, createdBy } from '../data/functions'
import { persianCalendar } from '../src/custom-fields/persian-calander'

export const PaymentItem = list<Lists.PaymentItem.TypeInfo<Session>>({
  access: allowAll,
  ui: {
    label: 'آیتم پرداخت ها',
    labelField: 'title',
    listView: {
      initialSort: {
        direction: 'DESC',
        field: 'dateOfPayment',
      },
    },
  },
  fields: {
    title: text(),
    dateOfPayment: persianCalendar({
      label: 'تاریخ پرداخت',
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
    payment: relationship({
      ref: 'Payment.paymentItems',
      label: 'پرداخت ها',
      ui: {
        createView: {
          fieldMode: 'hidden',
        },
      },
    }),
    createdBy: createdBy(),
    changeLog: changeLog('title'),

  },
})
