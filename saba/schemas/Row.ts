import type { Lists } from '.keystone/types'
import type { Session } from '../data/types'
import { graphql, list } from '@keystone-6/core'
import { allowAll } from '@keystone-6/core/access'
import { bigInt, float, integer, relationship, select, text, virtual } from '@keystone-6/core/fields'
import { Roles } from '../data/types'

export const Row = list<Lists.Row.TypeInfo<Session>>({
  access: allowAll,
  ui: {
    isHidden(args) {
      return !(args.session?.data.role === Roles.admin)
    },
  },
  fields: {
    commodity: relationship({
      ref: 'Category',
      label: 'کالا',
      many: false,
    }),
    description: text({
      label: 'توضیحات',
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
          value: 'kilograms',
          label: 'کیلوگرم',
        },
        {
          label: 'لیتر',
          value: 'litre',
        },
        {
          value: 'days',
          label: 'روز',
        },
        {
          label: 'پرس',
          value: 'press',
        },
        {
          label: 'سرویس',
          value: 'service',
        },
        {
          label: 'مقطوع',
          value: 'piece',
        },
        {
          label: 'فاکتوری',
          value: 'facture',
        },
        {
          label: 'کیسه',
          value: 'bag',
        },
        {
          label: 'متر طول',
          value: 'meter long',
        },
        {
          label: 'متر مکعب',
          value: 'meter cubed',
        },
        {
          label: 'متر مربع',
          value: 'meter square',
        },
        {
          label: 'نفر / روز',
          value: 'person/day',
        },
        {
          label: 'حلقه',
          value: 'ring',
        },
        {
          label: 'دستگاه',
          value: 'device',
        },
        {
          label: 'شاخه',
          value: 'section',
        },
        {
          label: 'شیت / رول',
          value: 'sheet/roll',
        },
        {
          label: 'عدد',
          value: 'number',
        },

      ],
    }),
    unitPrice: bigInt({ label: 'قیمت واحد', validation: { isRequired: true } }),
    quantity: float({
      label: 'مقدار',
      validation: { isRequired: true },
    }),
    /**
     * deprecated: delete this field in future
     * This field is deprecated and should not be used in new code.
     * @deprecated
     */
    percentageOfWorkDone: integer({
      label: 'درصد انجام کار',
      defaultValue: 100,
    }),
    tax: bigInt({
      defaultValue: 0n,
      label: 'مالیات و عوارض',
    }),
    total: virtual({
      label: 'جمع کل',
      field: graphql.field({
        type: graphql.BigInt,
        resolve(item) {
          const { unitPrice, quantity, tax } = item
          const numUnitPrice = Number(unitPrice ?? 0n)
          const numTax = Number(tax ?? 0n)

          return BigInt(Math.round((numUnitPrice * (quantity ?? 0) + numTax)))
        },
      }),
      ui: {
        itemView: {
          // fieldMode: 'hidden'
        },
        views: './src/custome-fields-view/bigint-viewer.tsx',
      },
    }),

    invoice: relationship({ ref: 'Invoice.rows', many: false }),
    statement: relationship({ ref: 'Statement.rows', many: false }),
    contract: relationship({ ref: 'Contract.rows', many: false }),
    approval: relationship({ ref: 'Approval.rows', many: false }),
  },
})
