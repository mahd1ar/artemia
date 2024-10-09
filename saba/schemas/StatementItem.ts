// NOTICE : this file is deprecated 
import { graphql, group, list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { float, integer, relationship, select, text, virtual } from "@keystone-6/core/fields";
import { NumUtils } from "../data/utils";
import { Roles, Session } from "../data/types";

/**
 * @deprecated
 */
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
    unitPrice: integer({ label: 'قیمت واحد', validation: { isRequired: true } }),
    quantity: float({
      label: 'مقدار',
      validation: { isRequired: true }
    }),
    // pi: float({
    //   label: 'maghdar',
    //   defaultValue: 3.14,
    //   validation: { isRequired: true }
    // }),
    percentageOfWorkDone: integer({
      label: 'درصد انجام کار',
      defaultValue: 100
    }),
    total: virtual({
      label: 'جمع کل',
      field: graphql.field({
        type: graphql.BigInt,
        resolve(item) {
          const { unitPrice = 0, quantity = 0, percentageOfWorkDone = 100 } = item as unknown as {
            unitPrice: number
            quantity: number,
            percentageOfWorkDone: number
          }

          return BigInt(Math.round(unitPrice * quantity * percentageOfWorkDone / 100))
        }
      }),
      ui: {
        itemView: {
          // fieldMode: 'hidden'
        },
        views: './src/custome-fields-view/bigint-viewer.tsx'
      }
    }),
  },
});
