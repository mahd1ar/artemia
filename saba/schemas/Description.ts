import { graphql, list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { bigInt, image, relationship, text, timestamp, virtual } from "@keystone-6/core/fields";
import { Session } from "../data/types";
import { NumUtils } from "../data/utils";
import { PrismaClient } from '@prisma/client'

export const Description = list({
    access: allowAll,

    ui: {
        label: 'شرح مصوبه',
        plural: 'شرح مصوبات',
        listView: {
            initialColumns: ['title', 'totalStatementsPayed', 'totalStatementsPayable'],
            initialSort: {
                field: 'title',
                direction: 'ASC',
            },
        }
    },
    fields: {
        title: text(),
        statements: relationship({
            ref: 'Statement.description',
            many: true,
            label: 'صورت وضعیت',
        }),
        approvals: relationship({
            ref: 'Approval.description',
            many: false,
            ui: {
                itemView: {
                    fieldMode: 'hidden'
                }
            }
        }),
        totalStatementsPayable: virtual({
            label: "مجموع قابل پرداخت",
            field: graphql.field({
                type: graphql.String,
                async resolve(item, args, context) {
                    const { id } = item as unknown as { id: string }
                    const { statements } = await context.query.Description.findOne({
                        where: {
                            id
                        },
                        query: ' statements { totalPayable }'
                    })

                    let total = BigInt(0)
                    statements.forEach((i: any) => {

                        total += NumUtils.deformat(i.totalPayable)
                    }
                    )

                    return NumUtils.format(total)
                }
            })
        }),
        totalStatementsPayed: virtual({
            label: "مجموع پرداختی ها",


            field: graphql.field({
                type: graphql.String,
                async resolve(item, args, context) {
                    const { id } = item as unknown as { id: string }
                    const prisma = context.prisma as PrismaClient
                    const currentDescription = await prisma.description.findUnique({
                        where: {
                            id
                        },
                        select: {
                            statements: {
                                select: {
                                    peyments: {
                                        select: {
                                            price: true
                                        }
                                    }
                                }
                            }
                        }
                    })

                    let total = BigInt(0)

                    currentDescription?.statements.forEach(i => {
                        i.peyments.forEach(j => {
                            if (j.price) {
                                total += j.price + total
                            }
                        })
                    })

                    return NumUtils.format(total)
                }
            })
        }),
        createdAt: timestamp({
            defaultValue: { kind: "now" },
            ui: {
                createView: { fieldMode: 'hidden' },
                itemView: {
                    fieldMode: 'read',
                    fieldPosition: 'sidebar'
                }
            }
        }),
        createdBy: relationship({
            ref: "User.descriptions",
            many: false,
            ui: {
                createView: { fieldMode: 'hidden' },
                itemView: {
                    fieldMode: 'read',
                    fieldPosition: 'sidebar'
                }
            },
            hooks: {
                resolveInput(args) {
                    if (args.operation === 'create') {
                        const session = args.context.session as Session
                        args.resolvedData.createdBy = { connect: { id: session?.itemId } }
                    }
                    return args.resolvedData.createdBy
                },
            }
        }),
    }
});