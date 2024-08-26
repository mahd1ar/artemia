import { group, list } from "@keystone-6/core"
import { allOperations, allowAll } from "@keystone-6/core/access"
import { getRoleFromArgs, Roles, Session } from "../data/types"
import { checkbox, text } from "@keystone-6/core/fields"
import { Lists } from ".keystone/types"
import { isAdmin } from "../data/access"

export const Setting = list<Lists.Setting.TypeInfo<Session>>({
    access: {
        operation: {
            ...allOperations(isAdmin),
        }
    },
    isSingleton: true,
    ui: {
        isHidden(args) {
            return getRoleFromArgs(args) > Roles.operator
        },
    },
    fields: {
        sendMessageToTelegram: checkbox(),
        ...group({
            label: 'Categories',
            fields: {
                parentCategoryOfDesign: text(),
                rootCategoryOfGoodsAndServices: text({
                    ui: {
                        description: '2 digit code from the category. eg. 42 '
                    }
                })
            },
        }),
    }
})