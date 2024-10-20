import type { Lists } from '.keystone/types'
import type { Session } from '../data/types'
import { graphql, group, list } from '@keystone-6/core'
import { allOperations } from '@keystone-6/core/access'
import {
  bigInt,
  checkbox,
  file,
  integer,
  relationship,
  select,
  text,
  timestamp,
  virtual,
} from '@keystone-6/core/fields'
import DeviceDetector from 'node-device-detector'
import { isLoggedIn, isMemberOfAdminGroup } from '../data/access'
import { persianCalendar } from '../src/custom-fields/persian-calander'

const detector = new DeviceDetector({
  clientIndexes: false,
  deviceIndexes: true,
  deviceAliasCode: false,
  deviceTrusted: false,
  deviceInfo: false,
  maxUserAgentSize: 500,
})

export const Contract = list<Lists.Contract.TypeInfo<Session>>({
  access: {
    operation: {
      ...allOperations(isLoggedIn),
      delete: args => isMemberOfAdminGroup(args),
    },
    filter: {
      // query: (args) => {
      //   if (isMemberOfAdminGroup(args)) return true;

      //   const resource = new URL(
      //     args.context.res?.req.headers.referer as string
      //   ).pathname
      //     .split("/")
      //     .filter(Boolean)
      //     .at(0);

      //   if (resource === "contracts")
      //     return {
      //       OR: [
      //         {
      //           isApproved: { equals: true },
      //         },
      //         {
      //           createdBy: {
      //             id: { equals: (args.context.session as Session)!.itemId },
      //           },
      //         },
      //       ],
      //     };

      //   return {
      //     isApproved: { equals: true },
      //   };
      // },
    },
  },
  ui: {
    label: 'قرارداد',
    listView: {
      initialColumns: ['title', 'isApproved', 'contractor', 'cost'],
    },
  },
  hooks: {
    resolveInput(args) {
      if (
        typeof args.inputData.isApproved === 'boolean'
        && !args.inputData.approvedBy
      ) {
        if (args.inputData.isApproved) {
          args.resolvedData.approvedBy = {
            connect: { id: (args.context.session)!.itemId },
          }
        }
        else {
          args.resolvedData.approvedBy = { disconnect: true }
        }
      }

      return args.resolvedData
    },
    validate(args) {
      const isFromAdminGroup = isMemberOfAdminGroup(args.context)

      if (args.inputData?.isApproved && !isFromAdminGroup) {
        args.addValidationError(
          'تایید کننده این قرارداد باید از گروه ادمین باشد',
        )
      }

      if (
        args.operation !== 'create'
        && args.item?.isApproved
        && !isFromAdminGroup
      ) {
        args.addValidationError('امکان تغییر قرارداد تایید شده وجود ندارد')
      }
    },
  },
  fields: {
    summery: virtual({
      label: 'خلاصه',
      field: graphql.field({
        type: graphql.String,
        async resolve(item, _, context) {
          const startDate = item.startFrom
            ? new Date(item.startFrom * 1000).toLocaleDateString('fa-IR')
            : ''
          const endDate = item.end
            ? new Date(item.end * 1000).toLocaleDateString('fa-IR')
            : ''
          const dateTitle
            = startDate && endDate ? `${endDate} ~ ${startDate} ` : ''

          const contractor = await context.prisma.contract.findUnique({
            where: {
              id: item.id,
            },
            select: { id: true, contractor: { select: { name: true } } },
          })
          const result = [item.title, dateTitle, contractor?.contractor?.name]
            .filter(Boolean)
            .join(' - ')

          return result
        },
      }),
    }),
    isApproved: checkbox({
      label: 'تایید شده ',
      ui: {
        createView: {
          fieldMode: 'hidden',
        },
      },
    }),
    approvedBy: relationship({
      label: 'تایید کننده',
      ui: {
        createView: {
          fieldMode: 'hidden',
        },
        itemView: {
          fieldMode: 'read',
        },
      },
      ref: 'User.approvedContracts',
    }),
    title: text({
      label: 'عنوان',
    }),
    description: text({
      label: 'توضیحات',
      ui: {
        displayMode: 'textarea',
      },
    }),
    ...group({
      label: 'تاریخ قرارداد',
      fields: {
        startFrom: persianCalendar({
          label: 'از تاریخ',
        }),
        end: persianCalendar({
          label: 'تا تاریخ',
        }),
      },
    }),
    cost: bigInt({
      label: 'مبلغ قرارداد',
      ui: {
        views: './src/custome-fields-view/bigint-with-farsi-letters.tsx',
      },
    }),

    attachments: relationship({
      label: 'فایل های ضمیمه شده',
      ref: 'FileStore.contract',
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
        views: './src/custome-fields-view/relationship-file-viewer.tsx',
      },

    }),
    contractor: relationship({
      label: 'پیمانکار',
      ref: 'Constractor.contracts',
    }),
    statements: relationship({
      label: ' صورت وضعیت ها ',
      ref: 'Statement.contract',
      many: true,
      ui: {
        createView: {
          fieldMode: 'hidden',
        },
        itemView: {
          fieldMode: 'read',
        },
      },
    }),

    attachment: file({
      // temp hidden
      ui: {
        itemView: {
          fieldMode: 'hidden',
        },
        createView: { fieldMode: 'hidden' },
      },
      storage: 'file',
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
      ref: 'User.contracts',
      many: false,
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: {
          // fieldMode: 'read',
          fieldPosition: 'sidebar',
        },
      },
      hooks: {
        resolveInput(args) {
          if (args.operation === 'create') {
            return {
              connect: { id: args.context.session!.itemId },
            }
          }

          return args.resolvedData.createdBy
        },
      },
    }),
  },
})
