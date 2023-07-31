import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { relationship, select, text, timestamp } from "@keystone-6/core/fields";

export const FrontPage = list({
    access: allowAll,
    isSingleton: true,
    fields: {
        headline: text({ validation: { isRequired: true } }),

    },
})