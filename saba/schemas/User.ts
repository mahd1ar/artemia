import { list, graphql } from "@keystone-6/core";
import { allowAll, allOperations } from "@keystone-6/core/access";
import { password, relationship, select, text, timestamp, virtual } from "@keystone-6/core/fields";
import { Roles, Session, getRoleFromArgs } from "../data/types";

export const User = list({
  access: {
    // operation: allOperations(
    //   isAdmin
    // ),
    operation: allowAll,
  },
  ui: {
    isHidden(args) {
      return getRoleFromArgs(args) > Roles.operator
    },
    listView: {
      initialColumns: ['name', 'role']
    }
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
    role: select({
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
          value: Roles.projectControl,
          label: 'کنترل پروژه'
        },
        {
          value: Roles.financial,
          label: 'مالی'
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
    statements: relationship({ ref: "Statement.createdBy", many: true }),
    approvals: relationship({ ref: "Approval.createdBy", many: true }),
    descriptions: relationship({ ref: "Description.createdBy", many: true }),
    Designs: relationship({ ref: "Design.createdBy", many: true }),
    dailyReports: relationship({ ref: "DailyReport.createdBy", many: true }),

    createdAt: timestamp({
      defaultValue: { kind: "now" },
    }),
  },
})
