import { list } from '@keystone-6/core'
import { allowAll } from '@keystone-6/core/access'
import { relationship, select, text, timestamp } from '@keystone-6/core/fields'

export const Post = list({
    access: allowAll,
    hooks: {
        
        async beforeOperation({item, operation,context,resolvedData}) {
            
            if(operation !== 'delete')
            return
            
            

        
        const { faId, enId } = item as unknown as {
            faId: string
            enId: string
        }
        
        console.log(resolvedData?.fa)
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
        title: text({ validation: { isRequired: true } }),
        featuredImage: relationship({
            ref: 'ImageStore',
            label: 'انتخاب عکس شاخص',
            ui: {
                displayMode: 'cards',
                cardFields: ['altText', 'image'],
                inlineCreate: { fields: ['altText', 'image'] },
                inlineConnect: true,
            }
        }),
        type: select({
            options: ['post', 'page'],
            defaultValue: 'en',
            ui: {
                displayMode: 'segmented-control',
                itemView: {
                    fieldPosition: 'sidebar'
                }
            },
            type: 'string',
            validation: { isRequired: true }
        }),
        category: select({
            options: ['blog'],
            defaultValue: 'blog',
            type: 'string',
            ui: {
                itemView: {
                    fieldPosition : 'sidebar'
                },
               
            }
        }),
        en: relationship({
            label: 'post in english',
            ref: 'PostTranslation',
            ui: {
                inlineCreate: {
                    fields: ['title', 'language', 'content']
                },
                displayMode: 'cards',
                createView: {
                    fieldMode: 'edit'
                },
                cardFields: ['title', 'language'],
                inlineConnect: true
            }
        }),
        fa: relationship({
            label: ' مطلب به فارسی',
            ref: 'PostTranslation',
            ui: {
                inlineCreate: {
                    fields: ['title', 'language', 'content']
                },
                displayMode: 'cards',
                createView: {
                    fieldMode: 'edit'
                },
                cardFields: ['title', 'language'],
                inlineConnect: true
            }
        }),
        createdAt: timestamp({
            defaultValue: { kind: 'now' },
            ui: {
                itemView: {
                    fieldPosition : 'sidebar'
                }
            }
        })
    }
})
