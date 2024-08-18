import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { relationship, select, text, timestamp } from "@keystone-6/core/fields";

export const Item = list({
    access: allowAll,
    fields: {
        code: text(),

    },
})