import { list } from "@keystone-6/core";
import { allOperations } from "@keystone-6/core/access";
import { relationship, select, text, timestamp } from "@keystone-6/core/fields";
import { isAdmin, isLoggedIn } from "../data/access";
import { Session, Roles } from "../data/types"
import type { Lists } from ".keystone/types";

export const Note = list<Lists.Note.TypeInfo<Session>>({
    access: {
        operation: allOperations(isLoggedIn),
        item: {
            update: (args) => {
                if (isAdmin(args))
                    return true
                return args.item.createdById === args.context.session?.itemId
            },
            delete: (args) => {
                if (isAdmin(args))
                    return true

                return args.item.createdById === args.context.session?.itemId
            }
        }
    },

    fields: {

        message: text({
            ui: {
                displayMode: 'textarea'
            }
        }),
        invoice: relationship({
            ref: 'Invoice.notes',
            ui: {
                createView: { fieldMode: 'hidden' },
                itemView: {
                    fieldMode(args) {
                        return !!args.item.invoiceId ? 'read' : 'hidden'
                    },
                }
            }
        }),
        createdAt: timestamp({ defaultValue: { kind: "now" } }),
        updatedAt: timestamp({
            hooks: {
                resolveInput(args) {
                    if (args.operation === 'update') {
                        return new Date()
                    }

                    return args.resolvedData.updatedAt
                },
            }
        }),
        createdBy: relationship({
            ref: "User",
            hooks: {
                resolveInput(args) {
                    if (args.operation === 'create')
                        return { connect: { id: args.context.session?.itemId } }

                    return args.resolvedData.createdBy
                }
            }
        })
    },
})