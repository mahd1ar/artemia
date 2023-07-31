import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { relationship, select, text, timestamp } from "@keystone-6/core/fields";

export const Post = list({
    access: allowAll,
    fields: {
        title: text({ validation: { isRequired: true } }),
        type: select({
            options: ['post', 'page'],
            defaultValue: 'en',
            ui: { displayMode: 'segmented-control' },
            type: 'string',
            validation: { isRequired: true }
        }),
        en: relationship({
            ref: 'PostTranslation',
            // ui: {
            //     inlineCreate: {
            //         fields: ['title', 'language', 'content']
            //     },
            //     displayMode: 'cards',
            //     createView: {
            //         fieldMode: 'edit'
            //     },
            //     cardFields: ['title', 'language'],
            //     inlineConnect: true

            // }

        }),
        fa: relationship({ ref: 'PostTranslation' }),
        createdAt: timestamp({
            defaultValue: { kind: 'now' },
        }),
    },
})