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
    supervisor = "supervisor",
}

export function enumToArrayOfKeyValue(enumObject: Record<string, string>) {
    return Object.entries(enumObject).map(([key, value]) => ({
        key,
        value,
    }));
}