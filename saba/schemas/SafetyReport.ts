import { list } from "@keystone-6/core";
import { allOperations } from "@keystone-6/core/access";
import {
    file,
    relationship,
    select,
    text,
    timestamp,
} from "@keystone-6/core/fields";
import { Session, Roles, getRoleFromArgs } from "../data/types";
import type { Lists } from ".keystone/types";

export const SafetyReport = list<Lists.SafetyReport.TypeInfo<any>>({
    access: {
        operation: {
            create: (args) =>
                [Roles.admin, Roles.operator].includes(getRoleFromArgs(args)),
            delete: (args) =>
                [Roles.admin, Roles.operator].includes(getRoleFromArgs(args)),
            update: (args) =>
                [Roles.admin, Roles.operator, Roles.projectControl].includes(getRoleFromArgs(args)),
            query: () => true,
        },
    },
    ui: {
        searchFields: [],
        listView: {
            initialColumns: ["date"],
            initialSort: {
                field: "date",
                direction: "DESC",
            },
        },
        itemView: {
            defaultFieldMode(args) {

                return [Roles.admin, Roles.operator, Roles.projectControl].includes(getRoleFromArgs(args)) ? 'edit' : 'read';
            },

        },
        label: "گزارش ایمنی",
        hideCreate(args) {
            return ![Roles.admin, Roles.operator].includes(getRoleFromArgs(args));
        },
    },
    hooks: {

    },
    fields: {
        date: timestamp({
            label: 'تاریخ',
            defaultValue: { kind: "now" },
            ui: {
                views: "./src/custome-fields-view/persian-calander.tsx",
                // createView: { fieldMode: "hidden" },
                itemView: {
                    fieldMode(args) {
                        return [Roles.admin, Roles.operator].includes(getRoleFromArgs(args)) ? 'edit' : "read";
                    },
                },
            },
        }),
        document: file({
            label: 'فایل گزارش ایمنی',
            storage: "file",

        }),

        updatedBy: relationship({
            ref: "User",
            label: 'بارگذاری / آدپدیت شده توسط',
            ui: {
                itemView: {
                    fieldPosition: "sidebar",
                    fieldMode(args) {
                        return [Roles.admin, Roles.operator].includes(getRoleFromArgs(args)) ? 'edit' : args.item.updatedById ? "read" : "hidden";
                    },
                },
                createView: { fieldMode: "hidden" },
            },
            hooks: {
                resolveInput(args) {
                    const session = args.context.session as Session;

                    if (args.operation === "update" && session) {
                        args.resolvedData.updatedBy = { connect: { id: session?.itemId } };
                    }

                    return args.resolvedData.updatedBy;
                },
            },
        }),
    },
});
