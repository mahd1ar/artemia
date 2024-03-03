import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { select, text, relationship, timestamp, virtual } from "@keystone-6/core/fields";
import { document } from '@keystone-6/fields-document';
import { graphql } from '@graphql-ts/schema';
import {componentBlocks } from '../document-field-customisation'

export const PostTranslation = list({
    access: allowAll,
    ui: {isHidden: process.env.NODE_ENV === 'production'} ,
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
            ui: {
                views: './document-field-customisation',
              },
              componentBlocks ,
        }),
        excerpt: virtual({
            field: graphql.field({
                type: graphql.String,
                async resolve(item, args, context) {
                    
                    const { content } = item as unknown as { content: string }

                    let excerpt = '';

                    function loop(data: any) {
                 
                        if(data)
                        Object.keys(data).forEach((i) => {
                            if (i === 'text') excerpt += ' ' + data[i];

                            if (typeof data[i] === 'object') loop(data[i]);
                        });
                    }



                    if (content) {

                        loop(
                            typeof content === 'string'
                                ? JSON.parse(content)
                                : content
                        );

                        excerpt = excerpt
                            .split(/\s+/g)
                            .filter(Boolean)
                            .splice(0, 45)
                            .join(' ');
                    }



                    return excerpt
                },
            }),
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