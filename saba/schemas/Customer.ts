import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { relationship, select, text, timestamp } from "@keystone-6/core/fields";
import { Lists } from ".keystone/types";
import { Session } from "../data/types";

export const Constractor = list<Lists.Constractor.TypeInfo<Session>>({
  access: allowAll,
  ui: {
    label: 'پیمانکار',
  },
  fields: {
    name: text({
      validation: { isRequired: true },
      label: "نام",
      ui: {
        itemView: {
        },
      },
    }),
    type: select({
      options: ['individual', 'company'],
      defaultValue: 'individual',
      ui: {
        displayMode: 'segmented-control',
      },
      type: 'string',
    }),
    contracts: relationship({
      ref: 'Contract.contractor',
      many: true,
      ui: { createView: { fieldMode: 'hidden' } }
    }),
    invoices: relationship({
      ref: 'Invoice.contractor',
      many: true,
      ui: { createView: { fieldMode: 'hidden' } }
    }),

  },
});
