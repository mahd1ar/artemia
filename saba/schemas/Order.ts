import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import {
  relationship,
  select,
  text,
  timestamp,
  json,
} from "@keystone-6/core/fields";

export const Order = list({
  access: allowAll,
  ui: {
    listView: {
      initialColumns: [
        "orderType",
        "orderContent",
        "customerName",
        "createdAt",
      ],
      initialSort: { field: "createdAt", direction: "DESC" },
    },
  },
  fields: {
    orderType: json(),
    orderContent: text({
      ui: {
        displayMode: "textarea",
      },
    }),
    customerName: text(),
    customer: relationship({
      ref: "Customer.orders",
    }),

    createdAt: timestamp({
      defaultValue: { kind: "now" },
    }),
  },
});
