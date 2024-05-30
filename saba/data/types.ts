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
    admin = 1,
    supervisor = 20,
    operator = 40,
    financial = 84,
    technical = 85,
    projectControl = 86,
    workshop = 87,
    guest = 100
}

export const alc = [
    {
        gqlkey: 'confirmedByTheUploader',
        for: Roles.workshop
    },
    {
        gqlkey: 'confirmedByProjectControlSupervisor',
        for: Roles.projectControl
    },
    {
        gqlkey: 'confirmedByTechnicalSupervisor',
        for: Roles.technical
    },
    {
        gqlkey: 'confirmedByFinancialSupervisor',
        for: Roles.financial
    },
    {
        gqlkey: 'confirmedBySupervisor',
        for: Roles.supervisor
    },
]


export namespace LogMessage {
    export type Statement = {
        id: string,
        confirmed: boolean,
        user: string
    }
}

export const getRoleFromArgs = (args: Record<string, any> & { session?: Session }, defaultValue = Roles.guest) => {
    if (!args.session) {
        return defaultValue
    }
    return args.session.data.role
}