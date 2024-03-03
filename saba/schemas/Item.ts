import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { relationship, select, text, timestamp } from "@keystone-6/core/fields";

export const Post = list({
    access: allowAll,
    fields: {
        title: text({ validation: { isRequired: true } }),
        description: text({ validation: { isRequired: true } }),
        
    },
})