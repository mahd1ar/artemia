import type { Lists } from '.keystone/types'
import { graphql, group, list } from '@keystone-6/core'
import { allOperations } from '@keystone-6/core/access'
import {
  bigInt,
  checkbox,
  file,
  integer,
  json,
  relationship,
  select,
  text,
  timestamp,
  virtual,
} from '@keystone-6/core/fields'
import axios from 'axios'
import DeviceDetector from 'node-device-detector'
import { isLoggedIn, isMemberOfAdminGroup } from '../data/access'
import { Notif } from '../data/message'
import { getRoleFromArgs, Roles, type Session } from '../data/types'
import { setPermitions } from '../data/utils'
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
      initialSort: {
        field: 'createdAt',
        direction: 'DESC',
      },
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
    async afterOperation(args) {
      if (args.operation === 'update' && args.inputData.isApproved) {
        Notif.contractIsApproved({
          title: args.inputData.title || args.resolvedData.title?.toString() || args.item.title,
          url: `${args.context.req?.headers.origin ?? 'saba.netdom.ir'}/contracts/${args.item.id}`,
        })
      }

      if (args.operation === 'create') {
        if (typeof args.inputData.isApproved !== 'boolean') {
          Notif.newContractCreated({
            title: args.inputData.title || args.resolvedData.title || args.item.title,
            url: `${args.context.req?.headers.origin ?? 'saba.netdom.ir'}/contracts/${args.item.id}`,
          })

          args.context.prisma.user.findMany({
            where: {
              role: { equals: Roles.supervisor },
            },
            select: {
              phone: true,
              name: true,
            },
          }).then((users) => {
            users.forEach(async (user) => {
              if (!user.phone)
                return

              try {
                const response = await axios.post('http://ippanel.com/api/select', {
                  op: 'pattern',
                  user: 'omid30',
                  pass: 'oh3383717',
                  fromNum: '3000505',
                  toNum: user.phone,
                  patternCode: 'ffvygfwi5ky8u1v',
                  inputData: [
                    { name: user.name, URL: args.item.id },
                  ],
                })
                // console.log(response)
                if (Boolean(Number(response.data)) === false) {
                  // error
                  throw new Error(String(response.data))
                }
              }
              catch (error) {
                console.error('!! error sending sms')
                console.error(error)
              }
            })
          })
        }
      }
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
        const creaticalFieldsIsChanged = !!args.inputData?.startFrom || !!args.inputData?.end || !!args.inputData?.cost

        if (creaticalFieldsIsChanged)
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
            = startDate && endDate ? `${startDate} ~ ${endDate} ` : ''

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
        views: './src/custome-fields-view/confirm-btn-for-contact.tsx',
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

    rows: relationship({
      label: 'آیتم ها',
      ref: 'Row.contract',
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

    cost: bigInt({
      label: 'پیشبینی مبلغ قرارداد',
      ui: {
        views: './src/custome-fields-view/bigint-with-farsi-letters.tsx',
      },
    }),

    statementDescription: relationship({
      label: ' شرح مصوبه',
      ref: 'Description.contracts',
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
        labelField: 'title',

        itemView: {
          // fieldMode: 'read',
          fieldMode(args) {
            return setPermitions(args, [
              { role: Roles.admin, fieldMode: 'edit' },
              { role: Roles.workshop, fieldMode: 'edit' },
              { role: Roles.operator, fieldMode: 'edit' },
              { role: Roles.supervisor, fieldMode: 'edit' },
            ], 'read')
          },
        },
        views: './src/custome-fields-view/contract-statement-list-relationship-view.tsx',
      },
    }),
    physicalProgress: virtual({
      label: 'پیشرفت فیزیکی',
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: {
          fieldMode: 'read',
          fieldPosition: 'sidebar',
        },
      },
      field: graphql.field({
        type: graphql.nonNull(graphql.Int),
        async resolve(item, args, context) {
          const data = await context.prisma.statement.findMany({
            where: {
              contractId: item.id,
            },
            orderBy: {
              createdAt: 'desc',
            },
          })

          if (data.length === 0)
            return 0

          if (data.find(s => s.type === 'final' || s.type === 'before-final'))
            return 100

          const tempStatements = data.filter(s => s.type === 'temporarly')
          const lastestTempStatement = tempStatements.length > 0 ? tempStatements.sort((a, b) => (b.statementNumber || 0) - (a.statementNumber || 0))[0] : null
          if (lastestTempStatement)
            return lastestTempStatement.physicalProgress || 0
          return 0
        },
      }),

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
    contractSample: virtual({
      label: 'نمونه قرارداد',
      field: graphql.field({
        type: graphql.JSON,
        async resolve(item, _, context) {
          const result = await context.sudo().prisma.setting.findFirst({
            where: { id: 1 },
            select: {
              contractSample: {
                select: {
                  id: true,
                  title: true,
                  file_filename: true,
                },
              },
            },
          })

          return result?.contractSample.map((i) => {
            return {
              label: i.title,
              href: i.file_filename ? `/files/${i.file_filename}` : '#',
            }
          }) || []
        },
      }),
      ui: {
        itemView: {
          fieldMode: 'read',
          fieldPosition: 'sidebar',
        },
        views: './src/custome-fields-view/links-viewer.tsx',
      },
    }),
    changeLog: json({
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: {
          fieldPosition: 'sidebar',
          fieldMode(args) {
            if (args.session?.data.role === Roles.admin)
              return 'read'
            else
              return 'hidden'
          },
        },
        views: './src/custome-fields-view/changelog-view.tsx',
      },
      hooks: {
        resolveInput(args) {
          const state = (args.item?.changeLog) ? JSON.parse(args.item.changeLog || '[]') : []
          const info = {
            ops: args.operation,
            items: Object.keys(args.inputData),
            by: args.context.session?.itemId,
            at: new Date(),
          }

          state.push(info)

          return JSON.stringify(state)
        },
      },
    }),
  },
})
