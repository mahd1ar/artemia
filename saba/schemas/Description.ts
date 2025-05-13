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
    label: 'شرح مصوبات',
    plural: 'شرح مصوبات',
    listView: {
      initialColumns: ['subject', 'totalStatementsPayed', 'totalInvoicesPayable'],
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

    contracts: relationship({
      label: 'قرارداد ها',
      ref: 'Contract.statementDescription',
      ui: {
        createView: {
          fieldMode: 'hidden',
        },
      },
      many: true,
    }),
    invoices: relationship({
      ref: 'Invoice.description',
      many: true,
      label: 'فاکتور ها',
      ui: {
        createView: {
          fieldMode: 'hidden',
        },
      },
    }),
    approvals: relationship({
      ref: 'Approval.description',
      many: false,
      ui: {
        itemView: {
          fieldMode: 'hidden',
        },
        createView: {
          fieldMode: 'hidden',
        },
      },
    }),
    fromOnGoingProject: relationship({
      ref: 'Project.onGoing',
      many: false,
      ui: {
        itemView: {
          fieldMode: 'hidden',
        },
        createView: {
          fieldMode: 'hidden',
        },
      },
    }),
    fromOutsideProject: relationship({
      ref: 'Project.outside',
      many: false,
      ui: {
        itemView: {
          fieldMode: 'hidden',
        },
        createView: {
          fieldMode: 'hidden',
        },
      },
    }),
    totalStatementsPayable: virtual({
      label: 'مجموع قابل پرداخت',
      ui: {
        views: './src/custome-fields-view/hidden.tsx',
        createView: {
          fieldMode: 'hidden',
        },

      },
      field: graphql.field({
        type: graphql.BigInt,
        async resolve(item, args, context) {
          const { id } = item

          const PROJECTBUDGET = gql`
          query PROJECTBUDGET($id: ID!) {
            description( where: { id:  $id}) {
            id
            invoices {
              totalPayable
            }
            contracts {
              totalPaid
            }
        }
}` as import('../__generated__/ts-gql/PROJECTBUDGET').type

          const sudo = context.sudo()
          const { description } = await sudo.graphql.run({
            query: PROJECTBUDGET,
            variables: {
              id,
            },
          })

          let total = BigInt(0)

          description?.contracts?.forEach((i) => {
            try {
              total += BigInt(i.totalPaid || 0n)
            }
            catch {}
          })

          description?.invoices?.forEach((i) => {
            total += BigInt(i.totalPayable)
          })

          return total
        },
      }),
    }),
    totalInvoicesPayed: virtual({
      label: 'مجموع پرداختی فاکتور ها',
      ui: {
        views: './src/custome-fields-view/hidden.tsx',
        createView: {
          fieldMode: 'hidden',
        },

      },
      field: graphql.field({
        type: graphql.BigInt,
        async resolve(item, _, context) {
          const { id } = item

          const CURRENT_DESCRIPTION_INVOCES = gql`
          query CURRENT_DESCRIPTION_INVOCES($where: DescriptionWhereUniqueInput!) {
            description(where: $where) {
              invoices {
                totalPayable
              }
            }
          }` as import('../__generated__/ts-gql/CURRENT_DESCRIPTION_INVOCES').type

          const sudo = context.sudo()
          const { description } = await sudo.graphql.run({
            query: CURRENT_DESCRIPTION_INVOCES,
            variables: {
              where: {
                id,
              },
            },
          })

          if (description) {
            let total = BigInt(0)

            description.invoices?.forEach((i) => {
              total += BigInt(i.totalPayable)
            })

            return total
          }

          return BigInt(0)
        },
      }),
    }),
    totalPayed: virtual({
      label: 'مجموع پرداختی  ها',
      ui: {
        views: './src/custome-fields-view/virtual-total-payable-detailed.tsx',
        createView: {
          fieldMode: 'hidden',
        },
        itemView: {
          fieldPosition() {
            return 'sidebar'
          },
        },
      },
      field: graphql.field({
        type: graphql.JSON,
        async resolve() {
          return [
            {
              id: 'totalInvoicesPayed',
              label: 'مجموع  فاکتور ها',
            },
            {
              id: 'totalStatementsPayable',
              label: 'مجموع صورت وضعیت ها',
            },
          ]
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
