import type { Lists } from '.keystone/types'
import type { Session } from '../data/types'
// import { graphql } from "@graphql-ts/schema";
import { graphql, list } from '@keystone-6/core'
import { allowAll } from '@keystone-6/core/access'
import { relationship, text, timestamp, virtual } from '@keystone-6/core/fields'
import { gql } from '@ts-gql/tag/no-transform'

export const Description = list<Lists.Description.TypeInfo<Session>>({
  access: allowAll, // FIXME

  ui: {
    label: 'شرح مصوبه',
    plural: 'شرح مصوبات',
    listView: {
      initialColumns: ['subject', 'totalStatementsPayed', 'totalStatementsPayable'],
      initialSort: {
        field: 'title',
        direction: 'ASC',
      },
    },
  },
  fields: {
    subject: virtual({
      ui: {
        createView: {
          fieldMode: 'hidden',
        },
      },
      field: graphql.field({
        type: graphql.String,
        async resolve(item, _, context) {
          const { approvalsId, title } = item

          if (approvalsId) {
            const prisma = context.prisma
            const approval = await prisma.approval.findUnique({
              where: {
                id: approvalsId || undefined,
              },
              select: {
                code: true,
              },
            })

            return `${title} (${approval!.code})`
          }
          return title
        },
      }),
      // graphQLReturnType: "String",
    }),
    title: text(),
    code: text(),
    statements: relationship({
      ref: 'Statement.description',
      many: true,
      label: 'صورت وضعیت',
    }),
    invoices: relationship({
      ref: 'Invoice.description',
      many: true,
      label: 'فاکتور ها',
    }),
    approvals: relationship({
      ref: 'Approval.description',
      many: false,
      ui: {
        itemView: {
          fieldMode: 'hidden',
        },
      },
    }),
    totalStatementsPayable: virtual({
      label: 'مجموع قابل پرداخت',
      ui: {
        views: './src/custome-fields-view/bigint-viewer.tsx',
      },
      field: graphql.field({
        type: graphql.BigInt,
        async resolve(item, args, context) {
          const { id } = item

          const CURRENT_DESCRIPTION = gql`
          query CURRENT_DESCRIPTION($id: ID!) {
            description( where: { id:  $id}) {
            id
            invoices {
              totalPayable
            }
            statements (where: {confirmedByTheUploader: {equals: true}}) {
            totalPayable
            }
        }
}` as import('../__generated__/ts-gql/CURRENT_DESCRIPTION').type

          const sudo = context.sudo()
          const { description } = await sudo.graphql.run({
            query: CURRENT_DESCRIPTION,
            variables: {
              id,
            },
          })

          let total = BigInt(0)

          description?.statements?.forEach((i) => {
            total += BigInt(i.totalPayable)
          })

          description?.invoices?.forEach((i) => {
            total += BigInt(i.totalPayable)
          })

          return total
        },
      }),
    }),
    totalStatementsPayed: virtual({
      label: 'مجموع پرداختی ها',
      ui: {
        views: './src/custome-fields-view/bigint-viewer.tsx',
      },
      field: graphql.field({
        type: graphql.BigInt,
        async resolve(item, args, context) {
          const { id } = item
          const prisma = context.prisma
          // NOTICE: you can use query instead of prisma as well
          const currentDescription = await prisma.description.findUnique({
            where: {
              id,
            },
            select: {
              statements: {
                select: {
                  confirmedByTheUploader: true,
                  peyments: {
                    select: {
                      price: true,
                    },
                  },
                },
              },
            },
          })

          let total = BigInt(0)

          currentDescription?.statements.forEach((i) => {
            if (i.confirmedByTheUploader) {
              i.peyments.forEach((j) => {
                if (j.price) {
                  total += j.price + total
                }
              })
            }
          })

          return total
        },
      }),
    }),
    createdAt: timestamp({
      defaultValue: { kind: 'now' },
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: {
          fieldMode: 'read',
          fieldPosition: 'sidebar',
        },
      },
    }),
    createdBy: relationship({
      ref: 'User.descriptions',
      many: false,
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: {
          fieldMode: 'read',
          fieldPosition: 'sidebar',
        },
      },
      hooks: {
        resolveInput(args) {
          if (args.operation === 'create') {
            const session = args.context.session as Session
            args.resolvedData.createdBy = { connect: { id: session?.itemId } }
          }
          return args.resolvedData.createdBy
        },
      },
    }),
  },
})
