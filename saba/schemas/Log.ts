import { list } from "@keystone-6/core";
import { allOperations } from "@keystone-6/core/access";
import { select, text, timestamp } from "@keystone-6/core/fields";
import { isAdmin } from "../data/access";
import { Session, Roles } from "../data/types"

export const Log = list({
    access: {
        operation: allOperations(isAdmin),
    },
    ui: {
        listView: {
            initialColumns: ['type', 'action', 'message', 'date'],
            initialSort: {
                direction: 'DESC',
                field: 'date'
            }
        },
        isHidden(args) {
            return (args.session as Session)?.data.role !== Roles.admin
        },
    },
    fields: {
        type: select({
            options: ['info', 'warning', 'error'],
            defaultValue: 'info',
            ui: {
                displayMode: 'segmented-control',
            },
            type: 'string',
        }),
        action: select({
            options: [
                {
                    label: 'ثبت صورت وضعیت',
                    value: 'STATEMENT_FINALIZED_REGISTRATION'
                },
                {
                    label: 'تایید صورت وضعیت',
                    value: 'STATEMENT_CONFIRMED'
                },
                {
                    label: 'تایید نهایی صورت وضعیت',
                    value: 'STATEMENT_FINALIZED'
                }
            ],
            type: 'enum'
        }),
        message: text({
            ui: {
                displayMode: 'textarea'
            }
        }),
        date: timestamp({ defaultValue: { kind: "now" } }),
    },
})