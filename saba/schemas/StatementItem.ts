import { graphql, group, list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { integer, relationship, select, text, virtual } from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";
import { persianCalendar } from "../src/custom-fields/persian-calander";
import { NumUtils } from "../data/utils";
import { Roles, Session } from "../data/types";
export const StatementItem = list({
  access: allowAll,
  ui: {
    isHidden(args) {
      return !((args.session as Session)?.data.role === Roles.admin)
    },
  },
  fields: {
    description: text({
      label: 'توضیحات'
    }),
    unit: select({
      label: 'واحد',
      options: [
        {
          value: 'meters',
          label: 'متر',
        },
        {
          value: 'hours',
          label: 'ساعت',
        },
        {
          value: "kilograms",
          label: 'کیلوگرم',
        },
        {
          value: 'days',
          label: 'روز',
        }
      ]
    }),
    unitPrice: integer({ label: 'قیمت واحد', validation: { isRequired: true } }),
    quantity: integer({
      label: 'مقدار',
      validation: { isRequired: true }
    }),
    percentageOfWorkDone: integer({
      label: 'درصد انجام کار',
      defaultValue: 100
    }),
    total: virtual({
      label: 'جمع کل',
      field: graphql.field({
        type: graphql.String,
        resolve(item) {
          const { unitPrice = 0, quantity = 0, percentageOfWorkDone = 100 } = item as unknown as {
            unitPrice: number
            quantity: number,
            percentageOfWorkDone: number
          }

          return NumUtils.format(unitPrice * quantity * percentageOfWorkDone / 100)
        }
      }),
      ui: {
        itemView: {
          fieldMode: 'hidden'
        }
      }
    }),
    statement: relationship({ ref: 'Statement.items', many: false })
  },
});
