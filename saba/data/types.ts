export type Session = {
    listKey: string;
    itemId: string;
    data: {
        name: string;
        createdAt: string;
        role: Roles;
    };
}
    | undefined;


export enum Roles {
    admin = "admin",
    operator = "operator",
    custommer = "custommer",
    debugger = "debugger",
    sale = "sale",
}

export function enumToArrayOfKeyValue(enumObject: Record<string, string>) {
    return Object.entries(enumObject).map(([key, value]) => ({
        key,
        value,
    }));
}