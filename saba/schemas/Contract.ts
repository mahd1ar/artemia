import { list, group } from "@keystone-6/core";
import { allOperations } from "@keystone-6/core/access";
import { bigInt, checkbox, file, integer, relationship, select, text, timestamp } from "@keystone-6/core/fields";
import { persianCalendar } from "../src/custom-fields/persian-calander";
import { Lists } from '.keystone/types'
import { isLoggedIn, isMemberOfAdminGroup } from "../data/access";
import { Session } from "../data/types";

export const Contract = list<Lists.Contract.TypeInfo<any>>({
  access: {
    operation: {
      ...allOperations(isLoggedIn),
      delete: args => isMemberOfAdminGroup(args),
    },
    filter: {
      query: args => {

        if (isMemberOfAdminGroup(args))
          return true

        const resource = new URL((args.context.res?.req.headers.referer as string)).pathname.split('/').filter(Boolean).at(0)

        if (resource === 'contracts')
          return {
            OR: [
              {
                isApproved: { equals: true },
              }, {
                createdBy: { id: { equals: (args.context.session as Session)!.itemId } },
              }
            ]
          }


        return {
          isApproved: { equals: true },
        }
      }
    }
  },
  ui: {
    label: 'قرارداد',
    listView: {
      initialColumns: ['title', 'isApproved', 'contractor', 'cost'],
    }
  },
  hooks: {
    resolveInput(args) {

      if (typeof args.inputData.isApproved === 'boolean' && !args.inputData.approvedBy) {
        if (args.inputData.isApproved)
          args.resolvedData.approvedBy = { connect: { id: (args.context.session as Session)!.itemId } }
        else
          args.resolvedData.approvedBy = { disconnect: true }

      }

      return args.resolvedData
    },
    validate(args) {

      const isFromAdminGroup = isMemberOfAdminGroup(args.context)

      if (args.inputData?.isApproved && !isFromAdminGroup) {
        args.addValidationError('تایید کننده این قرارداد باید از گروه ادمین باشد')
      }

      if (args.operation !== 'create' && args.item?.isApproved && !isFromAdminGroup) {
        args.addValidationError('امکان تغییر قرارداد تایید شده وجود ندارد')
      }

    },
  },
  fields: {
    isApproved: checkbox({
      label: 'تایید شده ',
      ui: {
        createView: {
          fieldMode: 'hidden'
        },
      },

    }),
    approvedBy: relationship({
      label: 'تایید کننده',
      ui: {
        createView: {
          fieldMode: 'hidden'
        },
        itemView: {
          fieldMode: 'read'
        }
      },
      ref: 'User.approvedContracts',
    }),
    title: text({
      label: 'عنوان',
    }),
    description: text({
      label: 'توضیحات',
      ui: {
        displayMode: 'textarea'
      }
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
      }
    }),
    cost: bigInt({
      label: 'مبلغ قرارداد',
      ui: {
        views: "./src/custome-fields-view/bigint-with-farsi-letters.tsx"
      }
    }),
    contractor: relationship({
      label: 'پیمانکار',
      ref: 'Constractor.contracts',
    }),
    attachment: file({
      // temp hidden
      ui: {
        itemView: {
          fieldMode: 'hidden'
        },
        createView: { fieldMode: 'hidden' }
      },
      storage: "file",
    }),
    createdAt: timestamp({
      defaultValue: { kind: "now" },
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: {
          fieldMode: 'read',
          fieldPosition: 'sidebar'
        }
      }
    }),
    createdBy: relationship({
      ref: "User.contracts",
      many: false,
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: {
          // fieldMode: 'read',
          fieldPosition: 'sidebar'
        }
      },
      hooks: {
        resolveInput(args) {
          if (args.operation === 'create')
            return { connect: { id: (args.context.session as Session)!.itemId } }

          return args.resolvedData.createdBy
        }
      }
    })
  },
});
