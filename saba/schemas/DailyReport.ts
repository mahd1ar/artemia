import { list } from "@keystone-6/core";
import { allOperations } from "@keystone-6/core/access";
import {
    file,
    relationship,
    select,
    text,
    timestamp,
} from "@keystone-6/core/fields";
import { isAdmin, isLoggedIn } from "../data/access";
import { Session, Roles, getRoleFromArgs } from "../data/types";
import { setPermitions } from "../data/utils";
import type { Lists } from ".keystone/types";

export const DailyReport = list<Lists.DailyReport.TypeInfo<any>>({
    access: {
        operation: {
            create: (args) =>
                [Roles.admin, Roles.operator].includes(getRoleFromArgs(args)),
            delete: (args) =>
                [Roles.admin, Roles.operator].includes(getRoleFromArgs(args)),
            update: (args) =>
                [Roles.admin, Roles.operator, Roles.workshop].includes(
                    getRoleFromArgs(args)
                ),
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
        label: "گزارش روزانه",
        hideCreate(args) {
            return ![Roles.admin, Roles.operator].includes(getRoleFromArgs(args));
        },
    },
    hooks: {
        validate(args) {
            const session = args.context.session as Session;
            if (args.operation === "update") {
                if (session?.data.role === Roles.workshop) {
                    const createdAt = args.item.date as Date;
                    // check if user is not exceeded 48 hours
                    const diff = (Date.now() - createdAt.getTime()) / (1000 * 60 * 60);

                    if (diff > 48) {
                        args.addValidationError(
                            "48 ساعت از مهلت بارگذاری این گزارش گذشته است"
                        );
                    }
                }
            }
        },
    },
    fields: {
        date: timestamp({
            label: 'تاریخ',
            defaultValue: { kind: "now" },
            ui: {
                views: "./src/custome-fields-view/date-persian-cell.tsx",
                createView: { fieldMode: "hidden" },
                itemView: {
                    fieldMode(args) {
                        return "read";
                    },
                },
            },
        }),
        document: file({
            label: 'فایل گزارش روز',
            storage: "file",
        }),
        // TODO delete this
        createdBy: relationship({
            ref: "User.dailyReports",
            many: false,
            ui: {
                createView: { fieldMode: "hidden" },
                itemView: {
                    fieldPosition: "sidebar",
                    fieldMode(args) {
                        return setPermitions(
                            args,
                            [{ role: Roles.admin, fieldMode: "edit" }],
                            "read"
                        );
                    },
                },
            },
            hooks: {
                resolveInput(args) {
                    const session = args.context.session as Session;

                    if (
                        args.inputData.createdBy &&
                        session?.data.role !== Roles.workshop
                    ) {
                        return args.resolvedData.createdBy;
                    }

                    if (args.operation === "update" && !args.item.createdById) {
                        args.resolvedData.createdBy = { connect: { id: session?.itemId } };
                    }

                    return args.resolvedData.createdBy;
                },
            },
        }),
    },
});
