import { list, graphql, group } from "@keystone-6/core";
import { allowAll, allOperations } from "@keystone-6/core/access";
import { image, password, relationship, select, text, timestamp, virtual } from "@keystone-6/core/fields";
import { Roles, Session, getRoleFromArgs } from "../data/types";
import type { Lists } from ".keystone/types";
import { isMemberOfAdminGroup } from "../data/access";


const ui = { itemView: { fieldMode(args: any) { return getRoleFromArgs(args) > Roles.operator ? 'hidden' : 'edit' } } }

export const User = list<Lists.User.TypeInfo<any>>({
  access: {
    // operation: allOperations(
    //   isAdmin
    // ),
    operation: {
      create: args => getRoleFromArgs(args) <= Roles.operator,
      delete: args => getRoleFromArgs(args) <= Roles.operator,
      query: () => true,
      update: () => true
    },
    filter: {
      query: args => {

        if (isMemberOfAdminGroup(args))
          return true

        const resource = new URL((args.context.res?.req.headers.referer as string)).pathname.split('/').filter(Boolean).at(0)

        if (resource === 'users')
          return {
            id: {
              equals: (args.session as Session)?.itemId
            }
          }

        return true

      },
    }
  },

  ui: {
    label: 'کاربر',
    // isHidden(args) {
    //   return getRoleFromArgs(args) > Roles.operator
    // },
    listView: {
      initialColumns: ['name', 'role']
    },

    hideCreate(args) {
      return getRoleFromArgs(args) > Roles.operator
    },
  },
  fields: {
    fullname: virtual({
      field: graphql.field({
        type: graphql.String,
        async resolve(item) {
          return `${item.name} ${item.role}`
        },
      }),
    }),
    name: text({ validation: { isRequired: true } }),
    email: text({
      validation: { isRequired: true },
      isIndexed: "unique",
    }),
    avatar: image({
      storage: "image",
    }),
    role: select({
      ui: {
        itemView: {
          fieldMode(args) {
            return process.env.NODE_ENV !== 'production' ? 'edit' : getRoleFromArgs(args) > Roles.operator ? 'read' : 'edit'
          },
        }
      },
      options: [
        {
          label: " مدیر کل",
          value: Roles.admin,
        },
        {
          label: "مدیر",
          value: Roles.supervisor,
        },
        {
          value: Roles.operator,
          label: 'اپراتور'
        },
        {
          value: Roles.technical,
          label: 'فنی'
        },
        {
          value: Roles.financial,
          label: 'مالی'
        },
        {
          value: Roles.projectControl,
          label: 'کنترل پروژه'
        },
        {
          value: Roles.workshop,
          label: 'کارگاه'
        }
      ],
      type: "integer",
      defaultValue: Roles.guest,
    }),
    password: password({ validation: { isRequired: true } }),
    ...group({
      label: 'data',
      fields: {
        approvals: relationship({ ui, ref: "Approval.createdBy", many: true }),
        descriptions: relationship({ ui, ref: "Description.createdBy", many: true }),
        approvedContracts: relationship({ ui, ref: "Contract.approvedBy", many: true }),
        contracts: relationship({ ui, ref: "Contract.createdBy", many: true }),
        Designs: relationship({ ui, ref: "Design.createdBy", many: true }),
        dailyReports: relationship({ ui, ref: "DailyReport.createdBy", many: true }),
      }
    }),

    createdAt: timestamp({
      ui: {
        itemView: {
          fieldPosition: 'sidebar',
          fieldMode: 'read'
        }
      },
      defaultValue: { kind: "now" },
    }),
  },
})
