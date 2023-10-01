import { BaseAccessArgs } from "@keystone-6/core/dist/declarations/src/types/config/access-control";
import { Roles, Session } from "./types";
import { BaseListTypeInfo } from "@keystone-6/core/types";

export function isLoggedIn(args: BaseAccessArgs<BaseListTypeInfo>) {
    const { session }: Partial<{ session: Session }> = args;

    if (!!session === false)
        return false;


    return !!session;
}

export function isAdmin(args: BaseAccessArgs<BaseListTypeInfo>) {
    console.log(args.session)
    return isLoggedIn(args) && args.context.session!.data.role === Roles.admin;
}