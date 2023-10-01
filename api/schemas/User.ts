import { list } from "@keystone-6/core";
import { allowAll, allOperations } from "@keystone-6/core/access";
import { password, relationship, select, text, timestamp } from "@keystone-6/core/fields";
import { isAdmin } from "../data/access";
import { Roles, enumToArrayOfKeyValue } from "../data/types";

export const User = list({
  access: {
    operation: allOperations(
      isAdmin
    )

  },
  ui: {
    isHidden() {
      return process.env.NODE_ENV === "production";
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
    posts: relationship({ ref: "PostTranslation.author", many: true }),
    createdAt: timestamp({
      defaultValue: { kind: "now" },
    }),
  },
})
