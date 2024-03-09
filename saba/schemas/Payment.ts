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
  hooks: {
    async resolveInput(args) {
      if (args.operation === 'create') {

        try {

          const reff = (args.context.res?.req.headers.referer as string)
            .split('/')
            .pop();

          const prisma = args.context.prisma as PrismaClient;

          const statement = await prisma.statement.findUnique({
            where: {
              id: reff
            },
            select: {
              title: true,
            },
          })

          const totalPrynemts = await prisma.payment.count({
            where: {
              statement: {
                id: reff
              }
            }
          })

          if (statement && statement.title)
            args.resolvedData.title =
              `رسید ${totalPrynemts + 1} 
              از
               "${statement.title.length > 30 ? statement.title.substring(0, 30) + '...' : statement.title}"`
          else
            args.resolvedData.title = `رسید ${totalPrynemts + 1}`
        } catch (error) {
          console.error(error)
        }
      }

      return args.resolvedData
    },
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
