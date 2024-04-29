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
                    label: 'تایید صورت وضعیت',
                    value: 'STATEMENT_CONFIRMED'
                }
            ],
        }),
        message: text({
            ui: {
                displayMode: 'textarea'
            }
        }),
        date: timestamp({ defaultValue: { kind: "now" } }),
    },
})