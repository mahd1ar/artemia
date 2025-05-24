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
    label: 'ساختار شکست',
    plural: 'ساخنار های شکست',
    listView: {
      initialColumns: ['subject'],
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
        itemView: {
          fieldMode(args) {
            return args.item.approvalsId ? 'read' : 'hidden'
          },
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
      label: 'مصوبه متناظر',
      ref: 'Approval.description',
      many: false,
      ui: {
        itemView: {
          fieldMode: 'read',
          fieldPosition: 'sidebar',
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

    status: virtual({
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'hidden' },
        listView: { fieldMode: 'hidden' },
      },
      field: graphql.field({
        type: graphql.nonNull(
          graphql.object<{
            percentageOfPhysicalProgress: number
            totalStatementsPayed: bigint
            totalInvoicesPayed: bigint
            totalPayed: bigint
          }>()({
            name: 'DescriptionStatus',
            fields: {
              percentageOfPhysicalProgress: graphql.field({ type: graphql.nonNull(graphql.Int) }),
              totalStatementsPayed: graphql.field({ type: graphql.nonNull(graphql.BigInt) }),
              totalInvoicesPayed: graphql.field({ type: graphql.nonNull(graphql.BigInt) }),
              totalPayed: graphql.field({ type: graphql.nonNull(graphql.BigInt) }),
            },
          }),
        ),
        async resolve(item, args, context) {
          // Always return a value of the expected type
          if (!item.id) {
            return {
              percentageOfPhysicalProgress: 0,
              totalStatementsPayed: 0n,
              totalInvoicesPayed: 0n,
              totalPayed: 0n,
            }
          }

          const EXTRACT_STATUS = gql`
          query EXTRACT_STATUS($where: DescriptionWhereUniqueInput!) {
            description(where: $where) {
              invoices {
                payment {
                  grossTotal
                }
              }
              contracts {
                id
                physicalProgress
                totalPaid
              }
            }
          }` as import('../__generated__/ts-gql/EXTRACT_STATUS').type

          const sudo = context.sudo()
          const { description } = await sudo.graphql.run({
            query: EXTRACT_STATUS,
            variables: {
              where: {
                id: item.id,
              },
            },
          })

          if (!description) {
            return {
              percentageOfPhysicalProgress: 0,
              totalStatementsPayed: 0n,
              totalInvoicesPayed: 0n,
              totalPayed: 0n,
            }
          }

          const percentageOfPhysicalProgress = (description.contracts?.map(i => i.physicalProgress) || []).reduce((a, b) => a + b, 0) / (description.contracts?.length || 1)
          const totalStatementsPayed = (description.contracts?.map(i => BigInt(i.totalPaid || 0n)) || []).reduce((a, b) => a + b, 0n)
          const totalInvoicesPayed = (description.invoices?.map(i => i.payment?.grossTotal ? BigInt(i.payment.grossTotal) : 0n) || []).reduce((a, b) => a + b, 0n) as bigint
          return {
            percentageOfPhysicalProgress,
            totalStatementsPayed,
            totalInvoicesPayed,
            totalPayed: totalStatementsPayed + totalInvoicesPayed,
          }
        },
      }),
    }),
    statusView: virtual({
      ui: {
        views: './src/custome-fields-view/description-status-card.tsx',
        createView: { fieldMode: 'hidden' },
        itemView: { fieldPosition() { return 'sidebar' } },
      },
      field: graphql.field({
        type: graphql.nonNull(
          graphql.JSON,
        ),
        async resolve(item, args, context) {
          // Always return a value of the expected type
          if (!item.id) {
            return {
              percentageOfPhysicalProgress: 0,
              totalStatementsPayed: '0',
              totalInvoicesPayed: '0',
              totalPayed: '0',
            }
          }

          const d = await context.query.Description.findOne({
            where: { id: item.id },
            query: 'status { percentageOfPhysicalProgress, totalStatementsPayed, totalInvoicesPayed, totalPayed } ',
          })
          return {
            percentageOfPhysicalProgress: d?.status?.percentageOfPhysicalProgress || 0,
            totalStatementsPayed: d?.status?.totalStatementsPayed !== undefined ? String(d.status.totalStatementsPayed) : '0',
            totalInvoicesPayed: d?.status?.totalInvoicesPayed !== undefined ? String(d.status.totalInvoicesPayed) : '0',
            totalPayed: d?.status?.totalPayed !== undefined ? String(d.status.totalPayed) : '0',
          }
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
