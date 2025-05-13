import type { Lists } from '.keystone/types'
import type { Session } from '../data/types'
import type { ExcludesFalse } from '../data/utils'
import { graphql, list } from '@keystone-6/core'
import { allOperations } from '@keystone-6/core/access'
import {
  json,
  relationship,
  text,
  timestamp,
  virtual,
} from '@keystone-6/core/fields'
import { gql } from '@ts-gql/tag/no-transform'
import DeviceDetector from 'node-device-detector'
import { isLoggedIn } from '../data/access'
import { changeLog } from '../data/functions'
import { Notif } from '../data/message'
import { getRoleFromArgs, Roles } from '../data/types'
import { persianCalendar } from '../src/custom-fields/persian-calander'

const detector = new DeviceDetector({
  clientIndexes: false,
  deviceIndexes: true,
  deviceAliasCode: false,
  deviceTrusted: false,
  deviceInfo: false,
  maxUserAgentSize: 500,
})

export const Invoice = list<Lists.Invoice.TypeInfo<Session>>({
  access: {
    operation: {
      ...allOperations(isLoggedIn),
    },
    item: {
      update: args => getRoleFromArgs(args) <= Roles.operator || args.item.createdById === args.context.session?.itemId,
      delete: args => getRoleFromArgs(args) <= Roles.operator || args.item.createdById === args.context.session?.itemId,
    },

  },
  hooks: {
    async afterOperation(args) {
      if (args.operation === 'create') {
        const setting = await args.context.prisma.setting.findFirst({
          select: {
            sendMessageToTelegram: true,
          },
        })

        if (setting?.sendMessageToTelegram) {
          const CURRENT_INVOICE = gql`
          query CURRENT_INVOICE($id: ID!) {
  invoice(where: {id: $id }) {
    attachments {
      id
      title
      file {
        filename
        url
      }
    }
    createdBy {
      fullname
    }
  }
}` as import('../__generated__/ts-gql/CURRENT_INVOICE').type

          const sudo = args.context.sudo()

          const result = await sudo.graphql.run({
            query: CURRENT_INVOICE,
            variables: {
              id: args.item.id,
            },
          })

          Notif.newInvoiceCreated({
            attachmentsUrl: result.invoice?.attachments?.map(i => i.file?.url ? { label: i.title || '.', url: i.file.url } : null).filter(Boolean as unknown as ExcludesFalse) ?? [],
            invoiceUrl: `${process.env.PUBLICURL}/invoices/${args.item.id}`,
            title: args.item.title,
            uploader: result.invoice?.createdBy?.fullname || '',
          })
        }
      }
    },

  },
  ui: {
    label: 'فاکتور ها',
    listView: {
      initialColumns: ['title', 'totalPayable'],
      initialSort: {
        field: 'createdAt',
        direction: 'DESC',
      },
    },

  },
  fields: {

    title: text({
      label: 'عنوان',
      validation: { isRequired: true },
    }),
    contractor: relationship({
      label: 'پیمانکار',
      ref: 'Constractor.invoices',
      ui: {
        displayMode: 'select',
        searchFields: ['name'],
      },
    }),
    description: relationship({
      label: ' شرح مصوبه',
      ref: 'Description.invoices',
      many: false,
      ui: {
        views: './src/custome-fields-view/statement-description-realtion.tsx',
        itemView: {
          fieldPosition(args) {
            const userAgent = (args.context.req?.headers['user-agent'])

            if (userAgent)
              return detector.detect(userAgent).device.type === 'desktop' ? 'sidebar' : 'form'

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
      },
    }),
    dateOfStatement: persianCalendar({
      label: 'تاریخ فاکتور',
    }),
    rows: relationship({
      label: 'آیتم ها',
      ref: 'Row.invoice',
      many: true,
      ui: {
        itemView: {
          fieldMode(args) {
            const rule = getRoleFromArgs(args)
            return rule <= Roles.operator || args.item.createdById === args.session?.itemId ? 'edit' : 'read'
          },
        },
        displayMode: 'cards',
        cardFields: ['commodity', 'description', 'unit', 'unitPrice', 'quantity', 'tax', 'total'],
        inlineCreate: {
          fields: ['commodity', 'description', 'unit', 'unitPrice', 'quantity', 'tax', 'total'],
        },

        views: './src/custome-fields-view/table-relation',
      },
    }),
    totalPayable: virtual({
      ui: {
        views: './src/custome-fields-view/bigint-viewer.tsx',
        itemView: {
          fieldMode: 'hidden',
        },
        createView: {
          fieldMode: 'hidden',
        },

      },
      label: 'جمع  کل قابل پرداخت',
      field: graphql.field({
        type: graphql.BigInt,
        async resolve(item, args, context) {
          const {
            id: itemid,
          } = item

          if (itemid) {
            const x = await context.query.Row.findMany({
              where: {
                invoice: {
                  id: {
                    equals: itemid,
                  },
                },
              },
              query: 'total',
            })

            let total = 0n

            for (const i of x) {
              total += BigInt(i.total)
            }

            return BigInt(total)
          }
          else {
            return 0n
          }
        },
      }),
    }),
    attachments: relationship({
      label: 'فایل های ضمیمه شده',
      ref: 'FileStore.invoice',
      many: true,
      ui: {
        itemView: {
          fieldPosition(args) {
            const userAgent = (args.context.req?.headers['user-agent'])

            if (userAgent)
              return detector.detect(userAgent).device.type === 'desktop' ? 'sidebar' : 'form'

            return 'sidebar'
          },
        },
        displayMode: 'cards',
        cardFields: ['title', 'file'],
        inlineCreate: { fields: ['title', 'file'] },
        inlineConnect: false,
        inlineEdit: { fields: ['title', 'file'] },
        linkToItem: false,
      },
    }),

    notes: relationship({
      ref: 'Note.invoice',
      many: true,
      label: 'یادداشت ها',
      ui: {
        itemView: {
          fieldMode: 'edit',
        },
        views: './src/custome-fields-view/note-relation.tsx',
      },
    }),

    createdAt: timestamp({
      defaultValue: { kind: 'now' },
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: {
          fieldPosition: 'sidebar',
          fieldMode: 'read',
        },
      },
    }),
    createdBy: relationship({
      ref: 'User',
      many: false,
      hooks: {
        resolveInput(args) {
          if (args.operation === 'create')
            return { connect: { id: args.context.session?.itemId } }

          return args.resolvedData.createdBy
        },
      },
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: {
          fieldPosition: 'sidebar',
          fieldMode(_args) {
            return 'read'
          },
        },
      },
    }),
    changeLog: changeLog('title'),

  },
})
