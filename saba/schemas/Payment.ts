import { group, list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { bigInt, image, relationship, select, text } from "@keystone-6/core/fields";
import { PrismaClient } from '@prisma/client'
import { persianCalendar } from "../src/custom-fields/persian-calander";
export const Payment = list({
  access: allowAll,
  ui: {
    label: 'پرداخت ها',
  },
  fields: {
    title: text({
      ui: { createView: { fieldMode: 'hidden' } },
    }),
    dateOfPayment: persianCalendar(),
    statement: relationship({
      ref: 'Statement.peyments',
      many: false,
      ui: {
        createView: { fieldMode: 'hidden' }
      }
    }),
    price: bigInt({
      validation: {
        min: BigInt(0)
      }
    }),
    attachment: image({ storage: "image" }),

  },
});
