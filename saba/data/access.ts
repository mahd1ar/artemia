import { getRoleFromArgs, Roles, Session } from "./types";

export function isLoggedIn(args: { session?: Session } & Record<string, any>) {
  const { session }: Partial<{ session: Session }> = args;

  if (!!session === false) return false;

  return !!session;
}

export function isAdmin(args: { session?: Session } & Record<string, any>) {
  return isLoggedIn(args) && args.context.session!.data.role === Roles.admin;
}

export function isMobayen(args: { session?: Session } & Record<string, any>) {
  const role = (args.session as Session)!.data.role
  return role === Roles.workshop
}

export function isMemberOfAdminGroup(args: Record<string, any> & { session?: Session }) {

  return (getRoleFromArgs(args, Roles.guest) <= Roles.operator)
}