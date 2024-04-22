import { list } from "@keystone-6/core";
import { allowAll, allOperations } from "@keystone-6/core/access";
import { password, relationship, select, text, timestamp } from "@keystone-6/core/fields";
import { isAdmin } from "../data/access";
import { Roles, Session, enumToArrayOfKeyValue } from "../data/types";

export const User = list({
  access: {
    // operation: allOperations(
    //   isAdmin
    // ),
    operation: allowAll,
  },
  ui: {
    isHidden(args) {
      return !((args.session as Session)?.data.role === Roles.admin)
    },
  },
  fields: {
    name: text({ validation: { isRequired: true } }),
    email: text({
      validation: { isRequired: true },
      isIndexed: "unique",
    }),
    role: select({
      options: enumToArrayOfKeyValue(Roles).map(i => ({ label: i.key, value: i.value })),
    }),
    password: password({ validation: { isRequired: true } }),
    statements: relationship({ ref: "Statement.createdBy", many: true }),
    approvals: relationship({ ref: "Approval.createdBy", many: true }),
    descriptions: relationship({ ref: "Description.createdBy", many: true }),
    Designs: relationship({ ref: "Design.createdBy", many: true }),
    createdAt: timestamp({
      defaultValue: { kind: "now" },
    }),
  },
})
