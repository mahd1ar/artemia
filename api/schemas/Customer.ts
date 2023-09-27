import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { relationship, select, text, timestamp } from "@keystone-6/core/fields";

export const Customer = list({
  access: allowAll,
  fields: {
    name: text(),
    tel: text(),
    postalCode: text(),
    address: text(),
    city: text(),
    code: text(),
    orders: relationship({
      ref: "Order",
      many: true,
    }),
    createdAt: timestamp({
      defaultValue: { kind: "now" },
    }),
  },
});
