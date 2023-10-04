import { list } from '@keystone-6/core'
import { allowAll, allOperations } from '@keystone-6/core/access'
import { relationship, select, text, timestamp } from '@keystone-6/core/fields'
import { isAdmin } from '../data/access'

export const Post = list({
    access: {
        operation: {
            ...allOperations(isAdmin),
            query: () => true
        }
    },
    hooks: {

        async beforeOperation({ item, operation, context, resolvedData }) {

            if (operation !== 'delete')
                return
            // TODO

            const { faId, enId } = item as unknown as {
                faId: string
                enId: string
            }


            if (faId)
                if (resolvedData?.fa?.disconnect) {

                    const sudoContext = context.sudo()
                    await sudoContext.query.PostTranslation.deleteOne({
                        where: {
                            id: faId
                        }
                    })

                    sudoContext.exitSudo()
                }

            if (enId)
                if (resolvedData?.en?.disconnect) {
                    const sudoContext = context.sudo()
                    await sudoContext.query.PostTranslation.deleteOne({
                        where: {
                            id: enId
                        }
                    })

                    sudoContext.exitSudo()
                }



            // TODO after deleting post
        }
    },
    fields: {
        title: text({
            validation: { isRequired: true },
            label: "post slug"
        }),
        en: relationship({
            label: 'post in english',
            ref: 'PostTranslation',
            ui: {
                inlineCreate: {
                    fields: ['title', 'content']
                },
                inlineEdit: {
                    fields: ['title', 'content']
                },
                displayMode: 'cards',
                createView: {
                    fieldMode: 'edit'
                },
                cardFields: ['title', 'content'],
                inlineConnect: true
            }
        }),
        fa: relationship({
            label: ' مطلب به فارسی',
            ref: 'PostTranslation',
            ui: {
                inlineCreate: {
                    fields: ['title', 'content']
                },
                inlineEdit: {
                    fields: ['title', 'content']
                },
                displayMode: 'cards',
                createView: {
                    fieldMode: 'edit'
                },
                cardFields: ['title', 'content'],
                inlineConnect: true
            }
        }),
        featuredImage: relationship({
            ref: 'ImageStore',
            label: 'انتخاب عکس شاخص',
            many: false,
            ui: {
                displayMode: 'cards',
                cardFields: ['altText', 'image'],
                inlineCreate: { fields: ['altText', 'image'] },
                inlineEdit: { fields: ['altText', 'image'] },
                inlineConnect: true,
            }
        }),
        type: select({
            options: ['post', 'page'],
            defaultValue: 'post',
            ui: {
                displayMode: 'segmented-control',
                itemView: {
                    fieldPosition: 'sidebar'
                }
            },
            type: 'string',
            validation: { isRequired: true }
        }),
        category: relationship({
            ref: 'Category.posts',
            many: true,
            ui: {
                labelField: 'slug'
            }
        }),

        misc: relationship({
            ref: 'KeyValue',
            label: 'custom fields',
            many: true,
            ui: {
                displayMode: 'cards',
                cardFields: ['key', 'value'],
                inlineCreate: {
                    fields: ['key', 'value']
                },
                inlineEdit: {
                    fields: ['key', 'value']
                }
            }
        }),
        createdAt: timestamp({
            defaultValue: { kind: 'now' },
            ui: {
                itemView: {
                    fieldPosition: 'sidebar',
                }
            }
        })
    }
})
