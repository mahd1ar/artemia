import { group, list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text } from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";

export const ContactUs = list({
  access: allowAll,
  isSingleton: true,
  fields: {
    aboutUs: document({
      label: 'about us (english)',
      formatting: true,
      layouts: [
        [1, 1],
        [1, 1, 1],
        [2, 1],
        [1, 2],
        [1, 2, 1],
      ],
      links: true,
      dividers: true,
    }),
    aboutFa: document({
      label: 'درباره ی ما (فارسی)',
      formatting: true,
      layouts: [
        [1, 1],
        [1, 1, 1],
        [2, 1],
        [1, 2],
        [1, 2, 1],
      ],
      links: true,
      dividers: true,
    }),
 
    shortDescription: text({
      label: 'short description (english)',
      ui: {
        displayMode: 'textarea'
      }
    }),
    shortDescriptionFa: text({
      label: 'توضیح کوتاه (فارسی)',
      ui: {
        displayMode: 'textarea'
      }
    }),
    tel: text(),
    telegram: text(),
    whatsapp: text(),
    instagram: text(),
    email: text(),
    address: text({
      label: 'address (english)',
      ui: {
        displayMode: 'textarea'
      }
    }),
    addressFa: text({
      label: 'آدرس (فارسی)',
      ui: {
        displayMode: 'textarea'
      }
    }),
    bale: text(),
    ...group({
      label: 'lat&long',
      fields: {
        lat: text(),
        long: text()
      }
    })
  },
});
