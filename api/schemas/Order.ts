import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { relationship, select, text, timestamp } from "@keystone-6/core/fields";

export const Order = list({
  access: allowAll,
  fields: {
    orderContent: text({
      ui: {
        displayMode: "textarea",
      },
    }),
    customerName: text(),
    customer: relationship({
      ref: "Customer",
    }),

    createdAt: timestamp({
      defaultValue: { kind: "now" },
    }),
  },
});
