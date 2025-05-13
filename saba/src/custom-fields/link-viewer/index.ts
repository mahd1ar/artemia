import type {
  BaseListTypeInfo,
  CommonFieldConfig,
  FieldTypeFunc,
} from '@keystone-6/core/types'
import { graphql } from '@keystone-6/core'
import {
  fieldType,
} from '@keystone-6/core/types'

export interface UtilsBarListTypeInfo {
  email?: string | null
  phone?: string | null
  full_name?: string | null
}

export type SendResetPasswordEmailConfig<ListTypeInfo extends BaseListTypeInfo> =
    CommonFieldConfig<ListTypeInfo> & UtilsBarListTypeInfo

export function sendResetPasswordEmail<ListTypeInfo extends BaseListTypeInfo>({

  email = null,
  phone = null,
  ...config
}: SendResetPasswordEmailConfig<ListTypeInfo> = {}): FieldTypeFunc<ListTypeInfo> {
  return (_meta) => {
    return fieldType({
      kind: 'none',
    })({
      // this passes through all of the common configuration like access control and etc.
      ...config,
      // hooks: {
      //     ...config.hooks,
      //     // We use the `validateInput` hook to ensure that the user doesn't set an out of range value.
      //     // This hook is the key difference on the backend between the stars field type and the integer field type.
      //     async validateInput(args) {
      //         const val = args.resolvedData[meta.fieldKey] as
      //             | string
      //             | undefined;
      //         if (args.operation === 'create')
      //             if (val === '' || val === undefined) {
      //                 args.addValidationError(
      //                     `The value must be within the range of 0-${utils}`
      //                 );
      //             }

      //         await config.hooks?.validateInput?.(args);
      //     },
      // },

      output: graphql.field({
        type: graphql.Boolean, // returns an object
        resolve(_args) {
          return true
        },

      }),
      views: './src/custom-fields/link-viewer/views',
      getAdminMeta() {
        return {
          email,
          phone,
        }
      },
    })
  }
}
