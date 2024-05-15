import { graphql, list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { bigInt, checkbox, file, image, integer, relationship, select, text, timestamp, virtual } from "@keystone-6/core/fields";
import { persianCalendar } from "../src/custom-fields/persian-calander";
import { NumUtils, setPermitions } from "../data/utils";
import { Roles, Session } from "../data/types";
import { isMobayen } from "../data/access";
import { PrismaClient } from '@prisma/client'

export const Statement = list({
  access: {
    operation: allowAll,
    item: {
      // update: (args) => !isMobayen(args),
      delete: (args) => !isMobayen(args)
    }
  },
  hooks: {

    async validate(args) {

      if (args.operation !== 'create') {

        if ((args.item as any).confirmedByTheUploader) {
          const session = args.context.session as Session
          if (session?.data.role === Roles.workshop) {
            args.addValidationError('این پیشنهاد قبلا تایید شده است')
          }
        }
      }
    },

    async afterOperation(args) {
      const session = args.context.session as Session



      const prisma = args.context.prisma as PrismaClient
      if (args.operation === 'delete') {

        const itemId = args.originalItem.id

        const x = await prisma.statementItem.deleteMany({
          where: {
            statement: {
              id: {
                equals: String(itemId)
              }
            }
          }
        })


        // TODO DELETE PAYMENT
      } else {
        // console.log(args.inputData)
        // console.log(args.originalItem)
        // console.log(args.item)
        // console.log(args.resolvedData)
        if (args.inputData.peyments) {

          if (args.item!.id) {
            await prisma.payment.updateMany({
              where: {
                statement: {
                  id: {
                    equals: String(args.item!.id)
                  }
                }
              },
              data: {
                // TODO check this on create item (operation===create)
                title: (args.inputData.title || args.originalItem!.title || args.resolvedData.title) + ' رسید '
              }
            })
          }
        }

      }

      if (args.operation === 'update') {
        if (typeof args.inputData.confirmedByTheUploader === 'boolean') {
          const confirmed = !!args.inputData.confirmedByTheUploader
          console.log("im here")
          await prisma.log.create({
            data: {
              action: 'STATEMENT_CONFIRMED',
              type: 'info',
              message: `statement with id ${args.item?.id} is ${confirmed ? 'confirmed ✔️' : 'UNconfirmed ❌'} by "${session?.data.name}"`
            },
            select: { id: true }
          })
        }
      }


    },
  },
  ui: {
    label: 'صورت وضعیت',
    listView: {
      initialColumns: ['title', 'status'],
      initialSort: {
        field: 'sateOfStatement',
        direction: 'DESC',
      },
    },
    itemView: {
      // defaultFieldMode(args) {
      //   return 'hidden'
      // },
    },
    hideDelete(args) {
      return isMobayen(args)
    },
  },
  fields: {
    confirmedByTheUploader: checkbox({
      label: '',
      ui: {
        createView: { fieldMode: 'hidden' },
        views: './src/custome-fields-view/confirmed-box.tsx',
      }
    }

    ),

    title: text({ validation: { isRequired: true } }),
    description: relationship({
      label: ' شرح مصوبه متناظر',
      ref: 'Description.statements',
      many: false,
      ui: {
        views: './src/custome-fields-view/statement-description-realtion.tsx',
        itemView: {
          // TOD if user role is operator
          fieldMode: 'edit',
          fieldPosition(args) {
            return 'sidebar'
          },
        },
        // createView: {
        //   fieldMode(args) {
        //     // TODO abstract this to function
        //     const reff = new URL((args.context.res?.req.headers.referer as string))
        //     const referer = (reff.pathname.split('/').filter(Boolean).at(0))
        //     return referer === 'descriptions' ? 'hidden' : 'edit'
        //   },
        // },
        // displayMode: 'select'
      }
    }),
    sateOfStatement: persianCalendar({
      label: 'تاریخ صورت وضعیت',
    }),
    image: image({
      storage: "image",
      ui: {
        itemView: {
          fieldPosition: 'sidebar',
          fieldMode(args) {


            return setPermitions(args, [
              { role: Roles.supervisor, fieldMode: 'read' },
            ], 'edit')

          },
        }
      }
    }),
    items: relationship({
      label: 'آیتم ها',
      ref: 'StatementItem.statement',
      many: true,
      ui: {
        itemView: {
          fieldMode(args) {
            return setPermitions(args, [
              { role: Roles.supervisor, fieldMode: 'read' },
              { role: Roles.workshop, fieldMode: 'read' },
            ], 'edit')
          },
        },
        displayMode: 'cards',
        cardFields: ['description', 'unit', 'unitPrice', 'quantity', 'percentageOfWorkDone', 'total'],
        inlineCreate: { fields: ['description', 'unit', 'unitPrice', 'quantity', 'percentageOfWorkDone'] },
        inlineEdit: { fields: ['description', 'unit', 'unitPrice', 'quantity', 'percentageOfWorkDone'] },
      }
    }),
    peyments: relationship({
      label: 'رسید پرداختی',
      ref: 'Payment.statement',
      many: true,
      ui: {
        // createView: { fieldMode: 'hidden' },
        itemView: {
          fieldMode(args) {
            return setPermitions(args, [
              { role: Roles.supervisor, fieldMode: 'read' },
              { role: Roles.workshop, fieldMode: 'read' },
            ], 'edit')
          },
        },
        cardFields: ['attachment', 'price', 'dateOfPayment', 'description'],
        displayMode: 'cards',
        inlineConnect: false,
        inlineCreate: { fields: ['attachment', 'price', 'dateOfPayment', 'description'] },
        inlineEdit: { fields: ['attachment', 'price', 'dateOfPayment', 'description'] }
      }
    }),

    deductionOnAccountOfAdvancePayment: bigInt({
      label: 'کسر علی الحساب',
      ui: {
        views: './src/custome-fields-view/bigint-with-farsi-letters',
        // createView: { fieldMode: 'hidden' },
        itemView: {
          fieldMode(args) {
            return setPermitions(args, [
              { role: Roles.supervisor, fieldMode: 'read' },
            ], 'edit')
          },
        }
      },
      defaultValue: 0n,
    }),

    tax: bigInt({
      label: 'مالیات',
      validation: { isRequired: true },
      defaultValue: 0n,
    }),

    totalPayable: virtual({
      label: 'جمع  کل قابل پرداخت ',
      field: graphql.field({
        type: graphql.String,
        async resolve(item, args, context) {

          const { id: itemid, deductionOnAccountOfAdvancePayment: deduction, tax } = item as unknown as { id: string, deductionOnAccountOfAdvancePayment: bigint, tax: bigint }

          if (itemid) {

            const x = await context.query.StatementItem.findMany({
              where: {
                statement: {
                  id: {
                    equals: itemid
                  }
                }
              },
              query: 'total'
            })

            let total = 0n

            for (const i of x) {
              total += BigInt(i.total.replace(/,/g, ''))
            }
            return NumUtils.format(total - (deduction || 0n) + (tax || 0n))

          } else
            return "0"


        },
      }),
    }),

    status: select({
      options: [
        { label: 'در انتظار پرداخت', value: 'pending' },
        { label: 'پرداخت شد', value: 'paid' },
      ],
      defaultValue: 'pending',
      ui: {
        displayMode: 'segmented-control',
        createView: { fieldMode: 'hidden' },
        itemView: {
          fieldMode(args) {
            return setPermitions(args, [
              { role: Roles.supervisor, fieldMode: 'read' },
            ], 'edit')
          },
        }
      }
    }),

    createdAt: timestamp({
      defaultValue: { kind: "now" },
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: {
          fieldPosition: 'sidebar',
          fieldMode(args) {
            return 'read'
          },
        }
      }
    }),
    createdBy: relationship({
      ref: 'User.statements',
      many: false,
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: {
          fieldPosition: 'sidebar',
          fieldMode(args) {
            return 'read'
          },
        }
      },
      hooks: {
        resolveInput(args) {

          if (args.operation === 'create') {

            const session = args.context.session as Session
            args.resolvedData.createdBy = { connect: { id: session?.itemId } }
          }

          return args.resolvedData.createdBy
        }
      }
    }),
    updatedBy: relationship({
      ref: 'User',
      many: false,
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: {
          fieldPosition: 'sidebar',
          fieldMode(args) {
            return 'read'
          },
        }
      },
      hooks: {
        resolveInput(args) {
          const session = args.context.session as Session
          args.resolvedData.createdBy = { connect: { id: session?.itemId } }

          return args.resolvedData.createdBy
        }
      }
    })
  },
});

//
//   field: graphql.field({
//     type: graphql.Float,
//     resolve(item) {
//       const { unitPrice = 0, quantity = 0 } = item as unknown as {
//         unitPrice: number
//         quantity: number
//       }

//       return 2
//     },
//   }),
// },