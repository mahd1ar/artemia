import { list } from "@keystone-6/core";
import { allOperations } from "@keystone-6/core/access";
import { file, relationship, select, text, timestamp } from "@keystone-6/core/fields";
import { isAdmin, isLoggedIn } from "../data/access";
import { Session, Roles } from "../data/types"
import { setPermitions } from "../data/utils";

export const DailyReport = list({
    access: {
        operation: allOperations(isLoggedIn)
    },
    ui: {
        listView: {
            initialColumns: ['date'],
            initialSort: {
                field: 'date',
                direction: 'DESC',
            },
        },
        label: 'گزارش روزانه',
        hideCreate(args) {
            const session = args.context.session as Session
            return !(session?.data.role === Roles.admin)
        },
    },
    hooks: {
        validate(args) {
            const session = args.context.session as Session
            if (args.operation === 'update') {
                if (session?.data.role === Roles.workshop) {
                    const createdAt = args.item.date as Date
                    // check if user is not exceeded 48 hours
                    const diff = (Date.now() - createdAt.getTime()) / (1000 * 60 * 60)

                    if (diff > 48) {
                        args.addValidationError('48 ساعت از مهلت بارگذاری این گزارش گذشته است')
                    }
                }
            }

            if (args.operation === 'delete') {

                const session = args.context.session as Session
                if (session?.data.role !== Roles.admin) {
                    args.addValidationError('شما دسترسی لازم برای حذف این گزارش را ندارید')
                }

            }
        },
    },
    fields: {
        document: file({
            storage: 'file'
        }),
        createdBy: relationship({
            ref: 'User.dailyReports',
            many: false,
            ui: {
                createView: { fieldMode: "hidden" },
                itemView: {
                    fieldPosition: 'sidebar',
                    fieldMode(args) {

                        return setPermitions(args, [{ role: Roles.admin, fieldMode: 'edit' }], 'read')
                    },
                }
            },
            hooks: {
                resolveInput(args) {
                    const session = args.context.session as Session

                    if (args.inputData.createdBy && session?.data.role !== Roles.workshop) {
                        return args.resolvedData.createdBy
                    }

                    if (args.operation === 'update' && !args.item.createdBy) {

                        args.resolvedData.createdBy = { connect: { id: session?.itemId } }
                    }

                    return args.resolvedData.createdBy
                }
            }
        }),
        date: timestamp(
            {
                defaultValue: { kind: "now" },
                ui: {
                    views: './src/custome-fields-view/date-persian-cell.tsx',
                    createView: { fieldMode: "hidden" },
                    itemView: {
                        fieldPosition: 'sidebar',
                        fieldMode(args) {
                            return 'read'
                        },
                    }
                }
            }),
    },
})