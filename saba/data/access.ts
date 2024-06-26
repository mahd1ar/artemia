import { BaseAccessArgs } from "@keystone-6/core/dist/declarations/src/types/config/access-control";
import { Roles, Session } from "./types";
import { BaseListTypeInfo } from "@keystone-6/core/types";

export function isLoggedIn(args: BaseAccessArgs<BaseListTypeInfo>) {
  const { session }: Partial<{ session: Session }> = args;

  if (!!session === false) return false;

  return !!session;
}

export function isAdmin(args: BaseAccessArgs<BaseListTypeInfo>) {
  return isLoggedIn(args) && args.context.session!.data.role === Roles.admin;
}

export function isMobayen(args: { session?: Session } & Record<string, any>) {
  const role = (args.session as Session)!.data.role
  return role === Roles.workshop
}