import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { select, text, relationship, timestamp } from "@keystone-6/core/fields";
import { document } from '@keystone-6/fields-document';

export const PostTranslation = list({
    access: allowAll,

    fields: {
        parent: relationship({
            ref: 'Post',
            ui: {
                // hideCreate: true
            }
        }),
        language: select({
            options: ['en', 'fa'],
            defaultValue: 'en',
            ui: {
                displayMode: 'segmented-control',
                itemView: {
                    fieldPosition: 'sidebar'
                }
            },
            type: 'string',

        }),
        title: text({ validation: { isRequired: true } }),

        content: document({
            formatting: true,
            layouts: [
                [1, 1],
                [1, 1, 1],
                [2, 1],
                [1, 2],
                [1, 2, 1],
            ],
            links: true,
            dividers: true,
        }),

        // with this field, you can set a User as the author for a Post
        author: relationship({
            // we could have used 'User', but then the relationship would only be 1-way
            ref: 'User.posts',

            // this is some customisations for changing how this will look in the AdminUI
            ui: {
                displayMode: 'cards',
                cardFields: ['name', 'email'],
                inlineEdit: { fields: ['name', 'email'] },
                linkToItem: true,
                inlineConnect: true,
            },

            many: false,
        }),

        tags: relationship({
            ref: 'Tag.posts',
            many: true,
            ui: {
                displayMode: 'cards',
                cardFields: ['name'],
                inlineEdit: { fields: ['name'] },
                linkToItem: true,
                inlineConnect: true,
                inlineCreate: { fields: ['name'] },
            },
        }),
        createdAt: timestamp({
            defaultValue: { kind: 'now' },
            ui: {
                itemView: {
                    fieldMode: 'hidden'
                }
            }
        }),
    }
})