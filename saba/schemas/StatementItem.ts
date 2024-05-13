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
  hooks: {
    validate(args) {
      console.log(args.item)
      console.log(args.inputData)
      console.log(args.resolvedData)
    },
  },
  fields: {
    description: text(),
    unit: select({
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
          label: 'لیتر',
          value: "litre",
        },
        {
          value: 'days',
          label: 'روز',
        }, {
          label: 'پرس',
          value: 'press'
        },
        {
          label: 'سرویس',
          value: 'service'
        }, {
          label: 'مقطوع',
          value: 'piece'
        }, {
          label: 'فاکتوری',
          value: 'facture'
        }, {
          label: 'کیسه',
          value: 'bag',
        },
        {
          label: 'متر طول',
          value: 'meter long'
        }, {
          label: 'متر مکعب',
          value: 'meter cubed'
        }, {
          label: 'متر مربع',
          value: 'meter square'
        }, {
          label: 'نفر / روز',
          value: 'person/day',
        }, {
          label: 'حلقه',
          value: 'ring'
        }, {
          label: 'دستگاه',
          value: 'device'
        },
        {
          label: "شاخه",
          value: "section",
        },
        {
          label: 'شیت / رول',
          value: 'sheet/roll',
        },
        {
          label: 'عدد',
          value: 'number'
        },

      ]
    }),
    unitPrice: integer({ validation: { isRequired: true } }),
    quantity: integer({
      validation: { isRequired: true }
    }),
    percentageOfWorkDone: integer({
      defaultValue: 100
    }),
    total: virtual({
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
