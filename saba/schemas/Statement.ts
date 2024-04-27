import { graphql, group, list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { file, image, integer, relationship, select, text, timestamp, virtual } from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";
import { persianCalendar } from "../src/custom-fields/persian-calander";
import { NumUtils, setPermitions } from "../data/utils";
import { Roles, Session } from "../data/types";
import { isMobayen } from "../data/access";
import { PrismaClient } from '@prisma/client'

export const Statement = list({
  access: allowAll,
  hooks: {
    async afterOperation(args) {
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

        console.log(x)

        // TODO DELETE PAYMENT
      } else {

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
                title: (args.originalItem!.title || args.resolvedData.title) + ' رسید '
              }
            })
          }
        }

      }



    },
  },
  ui: {
    label: 'صورت وضعیت',
    listView: {
      initialColumns: ['title', 'status'],
      initialSort: {
        field: 'dateOfPayment',
        direction: 'DESC',
      },
    },
    hideDelete(args) {
      return isMobayen(args)
    },
  },
  fields: {
    title: text({ validation: { isRequired: true } }),
    description: relationship({
      label: ' شرح مصوبه متناظر',
      ref: 'Description.statements',
      many: false,
      ui: {
        itemView: {
          // TOD if user role is operator
          fieldMode: 'edit',
          fieldPosition(args) {
            return 'sidebar'
          },
        },
        createView: {
          fieldMode(args) {

            // TODO abstract this to function
            const reff = new URL((args.context.res?.req.headers.referer as string))
            const referer = (reff.pathname.split('/').filter(Boolean).at(0))
            return referer === 'descriptions' ? 'hidden' : 'edit'
          },
        }
      }
    }),
    dateOfPayment: persianCalendar(),
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
      ref: 'StatementItem.statement',
      many: true,
      ui: {
        itemView: {
          fieldMode(args) {
            return setPermitions(args, [
              { role: Roles.supervisor, fieldMode: 'read' },
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
      ref: 'Payment.statement',
      many: true,
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: {
          fieldMode(args) {
            // TODO fix DRY here
            return (args.session as Session)?.data.role === Roles.supervisor ? 'read' : 'edit'
          },
        },
        cardFields: ['attachment', 'price', 'dateOfPayment'],
        displayMode: 'cards',
        inlineConnect: false,
        inlineCreate: { fields: ['attachment', 'price', 'dateOfPayment'] },
        inlineEdit: { fields: ['attachment', 'price', 'dateOfPayment'] }
      }
    }),

    deductionOnAccountOfAdvancePayment: integer({
      ui: {
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

    totalPayable: virtual({
      field: graphql.field({
        type: graphql.String,
        async resolve(item, args, context) {

          const { id: itemid, deductionOnAccountOfAdvancePayment: deduction } = item as unknown as { id: string, deductionOnAccountOfAdvancePayment: number }

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

            let total = 0

            for (const i of x) {
              total += parseFloat(i.total.replace(/,/g, ''))
            }
            return NumUtils.format(total - deduction)

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