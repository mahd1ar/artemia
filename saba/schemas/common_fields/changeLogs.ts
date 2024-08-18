import { json } from "@keystone-6/core/fields"
import { Roles, Session } from "../../data/types"

export const changeLog = json({
    ui: {
        createView: { fieldMode: "hidden" },
        itemView: {
            fieldPosition: "sidebar",
            fieldMode(args) {
                if ((args.session as Session)?.data.role === Roles.admin)
                    return "read";
                else
                    return 'hidden'
            },
        },
    },
    hooks: {
        resolveInput(args) {
            // @ts-ignore
            const state = (args.item?.changeLog) ? JSON.parse(args.item.changeLog) : [];
            const info = {
                ops: args.operation,
                items: Object.keys(args.inputData),
                by: (args.context.session as Session)?.itemId,
                at: new Date()
            }

            state.push(info)

            return JSON.stringify(state)

        },
    }
})