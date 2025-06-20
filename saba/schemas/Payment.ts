import type { Lists } from '.keystone/types'
import type { Session } from '../data/types'
import { graphql, list } from '@keystone-6/core'
import { allowAll } from '@keystone-6/core/access'
import { image, relationship, text, timestamp, virtual } from '@keystone-6/core/fields'
import { gql } from '@ts-gql/tag/no-transform'
import { changeLog, createdBy } from '../data/functions'
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

    validate(args) {
      // if (args.operation === 'create') {
      //   const haveStatement = !!args.inputData.statement?.create || !!args.inputData.statement?.connect?.id
      //   const haveInvoice = !!args.inputData.invoice?.create || !!args.inputData.invoice?.connect?.id

      //   if (!haveStatement && !haveInvoice) {
      //     return args.addValidationError('باید حداقل یک صورت وضعیت یا فاکتور برای پرداخت انتخاب شود')
      //   }
      //   else if (haveStatement && haveInvoice) {
      //     return args.addValidationError('باید فقط یک صورت وضعیت یا فاکتور برای پرداخت انتخاب شود')
      //   }
      // }
      // TODO implement this later
      if (args.operation === 'update') {
        let haveStatement = !!args.inputData.statement?.connect?.id || !!args.inputData.statement?.create || !!args.item.statementId
        let haveInvoice = !!args.inputData.invoice?.connect?.id || !!args.inputData.invoice?.create || !!args.item.invoiceId

        if (args.inputData.statement?.disconnect) {
          haveStatement = false
        }

        if (args.inputData.invoice?.disconnect) {
          haveInvoice = false
        }

        if (haveInvoice && haveStatement) {
          return args.addValidationError('باید فقط یک صورت وضعیت یا فاکتور برای پرداخت انتخاب شود')
        }

        if (!haveInvoice && !haveStatement) {
          return args.addValidationError('باید حداقل یک صورت وضعیت یا فاکتور برای پرداخت انتخاب شود')
        }
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

    grossTotal: virtual({
      label: 'جمع کل',
      field: graphql.field({
        type: graphql.nonNull(graphql.BigInt),
        async resolve(item, _, context) {
          const ITEMSPAYMENTITEMS = gql`
            query ITEMSPAYMENTITEMS($id: ID!) {
            payment(where: {id: $id}) {
              id
              paymentItems {
                price
              }
            }
          }
          ` as import('../__generated__/ts-gql/ITEMSPAYMENTITEMS').type

          const res = await context.graphql.run({
            query: ITEMSPAYMENTITEMS,
            variables: {
              id: item.id,
            },
          })

          return res.payment?.paymentItems?.reduce((acc, curr) => acc + BigInt(curr.price || 0), 0n) || 0n
        },
      }),
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: {
          fieldPosition: 'sidebar',
        },
        views: './src/custome-fields-view/bigint-viewer.tsx',
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
    description: text({
      label: 'توضیحات',
      ui: {
        displayMode: 'textarea',
      },
    }),
    statement: relationship({
      ref: 'Statement.peyment',
      many: false,
      label: 'صورت وضعیت',
      ui: {
        createView: {
          fieldMode(args) {
            const url = args.context.req?.headers.referer

            if (url) {
              const reff = new URL(url)
              const referer = (reff.pathname.split('/').filter(Boolean).at(0))
              return referer !== 'payments' ? 'hidden' : 'edit'
            }
            return 'hidden'
          },
        },
      },
    }),
    invoice: relationship({
      ref: 'Invoice.payment',
      many: false,
      label: 'فاکتور',
      ui: {
        createView: {
          fieldMode(args) {
            const url = args.context.req?.headers.referer
            if (url) {
              const reff = new URL(url)
              const referer = (reff.pathname.split('/').filter(Boolean).at(0))
              return referer !== 'payments' ? 'hidden' : 'edit'
            }
            return 'edit'
          },
        },
      },
    }),
    createdBy: createdBy(),
    createdAt: timestamp({
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: {
          fieldMode: 'read',
          fieldPosition: 'sidebar',
        },
      },
      hooks: {
        resolveInput: ({ resolvedData, operation }) => {
          if (operation === 'create') {
            resolvedData.createdAt = new Date()
          }
          return resolvedData.createdAt
        },
      },
    }),
    changeLog: changeLog('title'),

  },
})
