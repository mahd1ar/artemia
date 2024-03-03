import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { relationship, select, text, timestamp } from "@keystone-6/core/fields";

export const Customer = list({
  access: allowAll,
  fields: {
    name: text({
      ui: {
        itemView: {
          fieldMode: "read",
        },
      },
    }),
    tel: text({
      ui: {
        itemView: {
          fieldMode: "read",
        },
      },
    }),
    postalCode: text({
      ui: {
        itemView: {
          fieldMode: "read",
        },
      },
    }),
    address: text({
      ui: {
        itemView: {
          fieldMode: "read",
        },
      },
    }),
    city: text({
      ui: {
        itemView: {
          fieldMode: "read",
        },
      },
    }),
    code: text({
      ui: {
        itemView: {
          fieldMode: "read",
        },
      },
    }),
    orders: relationship({
      ref: "Order.customer",
      many: true,

      // ui: {
      //   displayMode: "cards",
      //   cardFields: ["orderContent", "orderType"],

      // itemView: {
      //   fieldMode: "read",
      // },
      // },
    }),
    createdAt: timestamp({
      defaultValue: { kind: "now" },
    }),
  },
});
