import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { relationship, select, text, timestamp } from "@keystone-6/core/fields";
import { Roles } from "../data/types";
import { setPermitions } from "../data/utils";

export const Category = list({
    ui: {
        itemView: {
            defaultFieldMode(args) {
                return setPermitions(args, [{ role: Roles.admin, fieldMode: 'edit' }], 'hidden')
            },
        }
    },
    access: {
        operation: allowAll
    },
    fields: {
        title: text({
            validation: { isRequired: true },
            label: 'عنوان'
        }),
        description: text({ ui: { displayMode: 'textarea' } }),
        children: relationship({
            ui: {
                createView: {
                    fieldMode: 'hidden'
                }
            },
            ref: 'Category.parent',
            many: true
        }),
        parent: relationship({
            ui: {
                createView: {
                    fieldMode: 'hidden'
                }
            },
            ref: 'Category.children'
        })
    },
})