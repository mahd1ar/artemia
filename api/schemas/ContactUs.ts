import { group, list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import {  text } from "@keystone-6/core/fields";

export const ContactUs = list({
  access: allowAll,
  isSingleton: true,
  fields: {
    aboutUs: text({
      ui: {
        displayMode: 'textarea'
      }
    }),
    tel: text(),
    telegram: text(),
    whatsapp: text(),
    instagram : text(),
    email: text(),
    address: text(),
    addressFa: text(),
    ...group({
      label: 'lat&long',
      fields: {
        lat: text(),
        long: text()
      }
    })
  },
});
