import { group, list } from '@keystone-6/core'
import { allowAll } from '@keystone-6/core/access'
import { bigInt, image, relationship, select, text } from '@keystone-6/core/fields'
import { persianCalendar } from '../src/custom-fields/persian-calander'

export const Payment = list({
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
    statement: relationship({
      ref: 'Statement.peyments',
      many: false,
      ui: {
        createView: { fieldMode: 'hidden' },
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
