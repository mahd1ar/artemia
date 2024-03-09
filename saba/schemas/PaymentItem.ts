import { group, list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text } from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";

export const Payment = list({
  access: allowAll,
  ui: {
    label: 'پرداخت ها',
  },
  fields: {
    title: text(),
  },
});
