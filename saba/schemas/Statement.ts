import type { Lists } from '.keystone/types'
import type { PrismaClient } from '@prisma/client'
import type { Session } from '../data/types'
import type { ExcludesFalse } from '../data/utils'
import { graphql, list } from '@keystone-6/core'
import {
  bigInt,
  checkbox,
  integer,
  json,
  relationship,
  select,
  text,
  timestamp,
  virtual,
} from '@keystone-6/core/fields'
import { gql } from '@ts-gql/tag/no-transform'
import DeviceDetector from 'node-device-detector'
import { Notif } from '../data/message'
import { alc, getRoleFromArgs, Roles } from '../data/types'
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

export const Statement = list<Lists.Statement.TypeInfo<Session>>({
  access: {
    operation: {
      create: args => !!args.session,
      delete: args => !!args.session,
      query: args => !!args.session,
      update: args => !!args.session,
    },

    filter: {
      query: (args) => {
        const role = getRoleFromArgs(args, Roles.guest)

        if (role === Roles.admin || role === Roles.workshop || role === Roles.operator)
          return true

        return {
          confirmedByTheUploader: {
            equals: true,
          },
        }
      },
    },
  },
  hooks: {
    async validate(args) {
      const role = getRoleFromArgs(args.context)

      // if (args.operation === 'update') {
      //   if (role > Roles.operator && args.item.confirmedByTheUploader) {
      //     if (!alc.find(i => args.inputData![i.gqlkey] === true && role === i.for)) {
      //       args.addValidationError('این صورت وضعیت قبلا تایید شده است و فقط اپراتور میتواند این صورت وضعیت را ویرایش کند')
      //     }
      //   }
      // }

      if (args.operation === 'delete') {
        if (role !== Roles.admin && role !== Roles.operator && role !== Roles.supervisor) {
          if (args.item.confirmedByTheUploader) {
            args.addValidationError('این صورت وضعیت تایید شده و قابل حذف نیست، لطفا با اپراتور تماس بگیرید')
          }
        }
      }

      if (args.operation !== 'delete') {
        const currentValue = args.inputData.physicalProgress || args.resolvedData.physicalProgress || args.item?.physicalProgress

        if (!currentValue) {
          return args.addValidationError('درصد پیشرفت فیزیکی نمیتواند خالی باشد')
        }

        if (+currentValue < 0 || +currentValue > 100) {
          args.addValidationError('درصد پیشرفت فیزیکی باید بین 0 و 100 باشد')
        }
      }
    },

    async afterOperation(args) {
      const session = args.context.session as Session

      const prisma = args.context.prisma as PrismaClient

      if (args.operation === 'delete') {
        await prisma.row.deleteMany({
          where: {
            statement: {
              id: {
                equals: args.originalItem.id.toString(),
              },
            },
          },
        })

        // TODO DELETE PAYMENT

        await prisma.payment.deleteMany({
          where: {
            statement: {
              id: {
                equals: args.originalItem.id.toString(),
              },
            },
          },
        })
      }

      if (args.operation === 'update') {
        let conformationHappend = false

        alc.forEach(async ({ gqlkey: key, for: _ }) => {
          if (typeof args.inputData![key] === 'boolean') {
            conformationHappend = true
          }
        })

        if (conformationHappend) { // confirmation or un confirmation has happend
          const settings = await prisma.setting.findFirst()

          if (settings?.sendMessageToTelegram) {
            const notif_statementTile = `${args.inputData?.title || args.resolvedData?.title || args.item?.title || args.originalItem?.title || '#'}`
            const notif_url = `saba.netdom.ir/statements/${args.item?.id}`

            if (session /* && session.data.role > Roles.operator */) {
              const notif_username = session.data.name

              if (args.inputData.confirmedByTheUploader) {
                await Notif.workShopIsDoneUploadingStatement(notif_statementTile, notif_username, notif_url)

                // send files to telegram

                const CURRENT_STATEMENT = gql`
                  query CURRENT_STATEMENT($id: ID!) {
                    statement(where: { id:  $id  }) {
                      id
                      title
                      attachments {
                        id
                        title
                        file {
                          url
                        }
                      }
                    }
                  }
                ` as import('../__generated__/ts-gql/CURRENT_STATEMENT').type

                const currentStatement = await args.context.graphql.run({
                  query: CURRENT_STATEMENT,
                  variables: {
                    id: args.item.id,
                  },
                })

                if (currentStatement.statement) {
                  setTimeout(async () => {
                    await Notif.sendStatementAttachmenets(
                      currentStatement.statement?.title || '',
                      currentStatement.statement?.attachments?.map(i => i.file && i.file.url ? ({ label: i.title || '', url: i.file.url || '' }) : null).filter(Boolean as unknown as ExcludesFalse) || [],
                      null,
                    )
                  }, 1000)
                }
              }

              else if (args.inputData.confirmedByProjectControlSupervisor) {
                await Notif.statementIsConfirmedByProjectManager(notif_statementTile, notif_username, notif_url)
              }

              else if (args.inputData.confirmedByFinancialSupervisor) {
                await Notif.statementIsConfirmedByFinancialSupervisor(notif_statementTile, notif_username, notif_url)
              }
            }
          }
        }
      }

      if (args.operation === 'create') {
        const settings = await prisma.setting.findFirst()

        if (settings?.sendMessageToTelegram) {
          if (!session)
            return
          const notif_statementTile = `${args.inputData?.title || args.resolvedData?.title || args.item?.title || '#'}`
          const notif_url = `saba.netdom.ir/statements/${args.item?.id}`
          const notif_username = session.data.name
          const workshopUsers = await prisma.user.findMany({
            where: {
              role: { equals: Roles.workshop },
            },
            select: {
              id: true,
              name: true,
              telegramId: true,
            },
          })

          await Notif.statementCreated(notif_statementTile, notif_url, notif_username, workshopUsers.map(i => i.telegramId).filter(Boolean as unknown as ExcludesFalse))
        }
      }
    },
  },
  ui: {

    label: 'صورت وضعیت',
    listView: {
      initialColumns: ['title', 'status', 'statementConfirmationStatus'],
      initialSort: {
        field: 'sateOfStatement',
        direction: 'DESC',
      },
    },
    hideCreate: true,
    itemView: {
      defaultFieldMode: args =>
        [Roles.admin, Roles.workshop, Roles.operator].includes(getRoleFromArgs(args)) ? 'edit' : 'read',
    },
    hideDelete(args) {
      const role = getRoleFromArgs(args)
      return role > Roles.operator && role !== Roles.workshop
    },
  },
  fields: {
    statementConfirmationStatus: virtual({
      label: ' تایید صورت وضعیت',
      ui: {
        // itemView: { fieldMode: 'hidden' },
        createView: { fieldMode: 'hidden' },
        views: './src/custome-fields-view/statement-confirmation-status.tsx',
      },
      field: graphql.field({
        type: graphql.JSON,

        async resolve(item, args, context) {
          return {
            ok: !!item.id,
            userRole: context.session!.data.role,
            data: alc.map(i => ({
              key: i.gqlkey,
              value: item.id ? item[i.gqlkey] : null,
              isCurrent: context.session?.data.role === i.for,
            })),
          }
        },
      }),
    }),
    confirmedByTheUploader: checkbox({
      label: 'تایید توسط ناظر کارگاه',
      ui: {
        itemView: {
          fieldMode(args) {
            return setPermitions(args, [
              { role: Roles.workshop, fieldMode: 'edit' },
              { role: Roles.admin, fieldMode: 'edit' },
              { role: Roles.operator, fieldMode: 'edit' },
              // { role: Roles.supervisor, fieldMode: 'edit' },
            ], 'hidden')
          },
        },
        createView: { fieldMode: 'hidden' },
        views: './src/custome-fields-view/confirm-statement-by.tsx',
      },
    }),
    confirmedByFinancialSupervisor: checkbox({
      label: 'تایید توسط ناظر مالی',

      ui: {
        itemView: {
          fieldMode(args) {
            return setPermitions(args, [
              { role: Roles.financial, fieldMode: 'edit' },
              { role: Roles.admin, fieldMode: 'edit' },
              { role: Roles.operator, fieldMode: 'edit' },
              // { role: Roles.supervisor, fieldMode: 'edit' },
            ], 'hidden')
          },
        },
        createView: { fieldMode: 'hidden' },
        views: './src/custome-fields-view/confirm-statement-by.tsx',
      },
    }),
    confirmedByProjectControlSupervisor: checkbox({
      label: 'تایید توسط ناظر کنترل پروژه',

      ui: {
        itemView: {
          fieldMode(args) {
            return setPermitions(args, [
              { role: Roles.projectControl, fieldMode: 'edit' },
              { role: Roles.admin, fieldMode: 'edit' },
              { role: Roles.operator, fieldMode: 'edit' },
              // { role: Roles.supervisor, fieldMode: 'edit' },
            ], 'hidden')
          },
        },
        createView: { fieldMode: 'hidden' },
        views: './src/custome-fields-view/confirm-statement-by.tsx',
      },
    }),
    confirmedBySupervisor: checkbox({
      label: 'تایید توسط سرپرست کل ',

      ui: {
        itemView: {
          fieldMode(args) {
            return setPermitions(args, [
              { role: Roles.supervisor, fieldMode: 'edit' },
              { role: Roles.admin, fieldMode: 'edit' },
              { role: Roles.operator, fieldMode: 'edit' },
            ], 'hidden')
          },
        },
        createView: { fieldMode: 'hidden' },
        views: './src/custome-fields-view/confirm-statement-by.tsx',
      },
    }),

    type: select({
      label: 'نوع صورت وضعیت',
      options: [
        {
          label: 'موقت',
          value: 'temporary',

        },
        {
          label: 'ماقبل قطعی ',
          value: 'before-final',
        },
        {
          label: 'قطعی',
          value: 'final',
        },
      ],
      defaultValue: 'temporary',
      ui: {
        displayMode: 'segmented-control',
        views: './src/fa-fields/select',
      },
    }),

    title: text({
      label: 'عنوان',
      hooks: {
        // afterOperation(args) {
        //   if(args.operation === 'create') {
        //     args.
        //   }
        // },
      },
      ui: {
        views: './src/fa-fields/text',
      },
    }),

    statementNumber: integer({
      label: 'شماره صورت وضعیت',
      ui: {
        description: `ie: 1,2,3`,
        views: './src/custome-fields-view/integer_conditonal.tsx',
      },
      hooks: {
        resolveInput(args) {
          if (args.operation === 'create' || args.operation === 'update') {
            if (args.inputData?.type && args.inputData.type !== 'temporary') {
              return null
            }
          }

          return args.resolvedData.statementNumber
        },
      },
    }),

    contract: relationship({
      label: 'قرارداد',
      ref: 'Contract.statements',
      ui: {
        displayMode: 'select',
        searchFields: ['title'],
        labelField: 'summery',
        hideCreate: true,
        createView: {
          fieldMode: 'hidden',
        },
      },
    }),

    sateOfStatement: persianCalendar({
      label: 'تاریخ صورت وضعیت',
    }),

    attachments: relationship({
      label: ' عکس و فایل های ضمیمه شده',
      ref: 'FileStore.statement',
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

    peyment: relationship({
      label: 'رسید پرداختی',
      ref: 'Payment.statement',
      ui: {

        itemView: {
          fieldMode: (args) => {
            const role = getRoleFromArgs(args)
            return role === Roles.workshop || role <= Roles.operator || role === Roles.financial ? 'edit' : 'read'
          },
          fieldPosition(args) {
            const userAgent = (args.context.req?.headers['user-agent'])

            if (userAgent)
              return detector.detect(userAgent).device.type === 'desktop' ? 'sidebar' : 'form'

            return 'sidebar'
          },
        },
        views: './src/custome-fields-view/createItem.tsx',
      },
    }),

    rows: relationship({
      label: 'ردیف ها',
      ref: 'Row.statement',
      many: true,
      ui: {
        itemView: {
          fieldMode: (args) => {
            const role = getRoleFromArgs(args)
            return role === Roles.workshop || role <= Roles.operator ? 'edit' : 'read'
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

    grossTotal: virtual({
      ui: {
        itemView: { fieldMode: 'hidden' },
        createView: { fieldMode: 'hidden' },
        views: './src/custome-fields-view/bigint-viewer.tsx',
      },
      label: 'جمع کل صورت وضعیت',
      field: graphql.field({
        type: graphql.BigInt,
        async resolve(item, args, context) {
          if (item.id) {
            const x = await context.query.Row.findMany({
              where: {
                statement: {
                  id: {
                    equals: item.id,
                  },
                },
              },
              query: 'total',
            })

            return x.reduce((sum, { total }) => sum + BigInt(total), 0n)
          }
          else {
            return 0n
          }
        },
      }),
    }),
    deductionOnAccountOfAdvancePayment: bigInt({
      label: 'کسر علی الحساب',
      ui: {
        description: 'جمع پرداختی های گذشته',
        // itemView: { fieldMode: 'edit' },
        views: './src/custome-fields-view/bigint-with-farsi-letters',
      },
      defaultValue: 0n,
    }),

    workGuarantee: bigInt({
      label: 'حسن انجام کار',
      ui: {
        views: './src/custome-fields-view/bigint-with-farsi-letters',
      },
      defaultValue: 0n,
    }),

    totalPayable: virtual({
      ui: {
        views: './src/custome-fields-view/bigint-viewer.tsx',
        createView: { fieldMode: 'hidden' },
      },
      label: 'جمع  کل کارکرد',
      field: graphql.field({
        type: graphql.BigInt,
        async resolve(item, args, context) {
          const {
            id: itemid,
            deductionOnAccountOfAdvancePayment: deduction,
            workGuarantee,
          } = item

          if (itemid) {
            const x = await context.query.Row.findMany({
              where: {
                statement: {
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

            return BigInt(total - (deduction || 0n) - (workGuarantee || 0n))
          }
          else {
            return 0n
          }
        },
      }),
    }),

    physicalProgress: integer({
      label: 'درصد پیشرفت فیزیکی',
      ui: {
        views: './src/fa-fields/integer',
      },
    }),

    notes: relationship({
      ref: 'Note.statement',
      many: true,
      label: 'یادداشت ها',
      ui: {
        itemView: {
          fieldMode: 'edit',
        },
        views: './src/custome-fields-view/note-relation.tsx',
      },
    }),

    status: select({
      label: 'وضعیت پرداخت',
      options: [
        { label: 'در انتظار پرداخت', value: 'pending' },
        { label: 'پرداخت شد', value: 'paid' },
      ],
      defaultValue: 'pending',
      ui: {
        displayMode: 'segmented-control',
        // TODO remove this field completely, we don't need it
        createView: { fieldMode: 'hidden' },
        itemView: {
          fieldMode: 'hidden',
        },
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
    changeLog: json({
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: {
          fieldPosition: 'sidebar',
          fieldMode(args) {
            if (args.session?.data && args.session.data.role <= Roles.operator)
              return 'read'
            else
              return 'hidden'
          },
        },
        views: './src/custome-fields-view/changelog-view.tsx',
      },
      hooks: {
        resolveInput(args) {
          const state = (args.item?.changeLog) ? JSON.parse(args.item.changeLog) : []
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
