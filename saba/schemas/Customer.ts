import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { relationship, select, text, timestamp } from "@keystone-6/core/fields";

export const Constractor = list({
  access: allowAll,
  ui: {
    label: 'پیمانکار',
  },
  fields: {
    name: text({
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
      ref: 'Contract.contractor.',
      many: true,
      ui: { createView: { fieldMode: 'hidden' } }
    }),
  },
});
