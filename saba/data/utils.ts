import { BaseItem, BaseKeystoneTypeInfo, BaseListTypeInfo, KeystoneContext, MaybeItemFunction, MaybeSessionFunction } from "@keystone-6/core/types";
import axios from "axios";
import { Roles, Session } from "./types";


export namespace NumUtils {
  export function format(number: number | BigInt) {
    if (typeof number === 'number') {
      return Intl.NumberFormat('en-US').format(number);
    } else
      if (typeof number === 'bigint') {
        return Intl.NumberFormat('en-US').format(number);
      }
  }

  export function deformat(number: string) {
    return BigInt(number.replace(/,/g, ''));
  }
}


export function setPermitions(
  args: object & {
    session?: Session;
  },

  permittions: {
    role: Roles,
    fieldMode: "read" | "edit" | "hidden"
  }[],
  defaultValue: "read" | "edit" | "hidden"

): "read" | "edit" | "hidden" {

  for (const per of permittions) {
    if (per.role === args.session?.data.role) {
      return per.fieldMode
    }
  }

  return defaultValue

}

export function editIfAdmin(args: {
  context: KeystoneContext<BaseKeystoneTypeInfo<any>>;
  session?: Session;
  item: BaseItem;
},
  defaultValue?: "read" | "edit" | "hidden"
) {
  return setPermitions(args, [{ role: Roles.admin, fieldMode: 'edit' }], defaultValue || 'read')
}


export type ExcludesFalse = <T>(x: T | false | undefined | null) => x is T;