import type {
  BaseListTypeInfo,
  CommonFieldConfig,
  FieldTypeFunc,
} from '@keystone-6/core/types'
import { graphql } from '@keystone-6/core'

import {
  fieldType,
  orderDirectionEnum,
} from '@keystone-6/core/types'

const PairFilter = graphql.inputObject({
  name: 'PairFilter',
  fields: {
    equals: graphql.arg({ type: graphql.Int }),
    lt: graphql.arg({ type: graphql.Int }),
    lte: graphql.arg({ type: graphql.Int }),
    gt: graphql.arg({ type: graphql.Int }),
    gte: graphql.arg({ type: graphql.Int }),
  },
})

// this field is based on the integer field
// but with validation to ensure the value is within an expected range
// and a different input in the Admin UI
// https://github.com/keystonejs/keystone/tree/main/packages/core/src/fields/types/integer

export type JcalandarConfig<ListTypeInfo extends BaseListTypeInfo> =
  CommonFieldConfig<ListTypeInfo> & {
    isIndexed?: boolean | 'unique'
    Jcalandar?: number | null
  }

export function persianCalendar<ListTypeInfo extends BaseListTypeInfo>({
  isIndexed,
  Jcalandar = null,
  ...config
}: JcalandarConfig<ListTypeInfo> = {}): FieldTypeFunc<ListTypeInfo> {
  return meta =>
    fieldType({
      // this configures what data is stored in the database
      kind: 'scalar',
      mode: 'optional',
      scalar: 'Int',
      index: isIndexed === true ? 'index' : isIndexed || undefined,
    })({
      // this passes through all of the common configuration like access control and etc.
      ...config,
      hooks: {
        ...config.hooks,
        // We use the `validateInput` hook to ensure that the user doesn't set an out of range value.
        // This hook is the key difference on the backend between the stars field type and the integer field type.
        async validateInput(args) {
          const val = args.resolvedData[meta.fieldKey] as
            | string
            | undefined
          if (args.operation === 'create') {
            if (val === '' || val === undefined) {
              args.addValidationError(
                `The value must be within the range of 0-${Jcalandar}`,
              )
            }
          }

          await config.hooks?.validateInput?.(args)
        },
      },
      // all of these inputs are optional if they don't make sense for a particular field type
      input: {
        create: {
          arg: graphql.arg({ type: graphql.Int }),
          // this field type doesn't need to do anything special
          // but field types can specify resolvers for inputs like they can for their output GraphQL field
          // this function can be omitted, it is here purely to show how you could change it
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          resolve(val, context) {
            // if it's null, then the value will be set to null in the database
            if (val === null) {
              return null
            }
            // if it's undefined(which means that it was omitted in the request)
            // returning undefined will mean "don't change the existing value"
            // note that this means that this function is called on every update to an item
            // including when the field is not updated
            if (val === undefined) {
              return null
            }
            // if it's not null or undefined, it must be a number
            return val
          },
        },
        update: { arg: graphql.arg({ type: graphql.Int }) },
        orderBy: { arg: graphql.arg({ type: orderDirectionEnum }) },
        where: {
          arg: graphql.arg({ type: PairFilter }),

          resolve(value, context) {
            return value
          },
        },
      },
      // this
      output: graphql.field({
        type: graphql.Int,
        // like the input resolvers, providing the resolver is unnecessary if you're just returning the value
        // it is shown here to show what you could do
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        resolve({ value, item }, args, context, info) {
          return value
        },
      }),
      views: './src/custom-fields/persian-calander/views',
      getAdminMeta() {
        return { Jcalandar }
      },
    })
}
