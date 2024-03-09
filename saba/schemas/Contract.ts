import { list, group } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { bigInt, file, integer, relationship, select, text, timestamp } from "@keystone-6/core/fields";
import { persianCalendar } from "../src/custom-fields/persian-calander";

export const Contract = list({
  access: allowAll,
  ui: {
    label: 'قرارداد',
  },
  fields: {
    title: text(),
    description: text({
      ui: {
        displayMode: 'textarea'
      }
    }),
    ...group({
      label: 'date of contract',
      fields: {
        startFrom: persianCalendar(),
        end: persianCalendar(),
      }
    }),
    price: bigInt({
      validation: {
        min: BigInt(0)
      }
    }),
    contractor: relationship({
      ref: 'Constractor.contracts',
    }),
    attachment: file({
      storage: "file",
    }),
  },
});
