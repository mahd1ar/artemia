// import { graphql } from "@graphql-ts/schema";
import { list, graphql } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { bigInt, image, relationship, text, timestamp, virtual } from "@keystone-6/core/fields";
import { Session } from "../data/types";
import { NumUtils } from "../data/utils";
import { PrismaClient } from '@prisma/client'

export const Description = list({
    access: allowAll, // FIXME

    ui: {
        label: 'شرح مصوبه',
        plural: 'شرح مصوبات',
        listView: {
            initialColumns: ['subject', 'totalStatementsPayed', 'totalStatementsPayable'],
            initialSort: {
                field: 'title',
                direction: 'ASC',
            },
        }
    },
    fields: {
        subject: virtual({
            ui: {
                createView: {
                    fieldMode: "hidden",
                },
            },
            field: graphql.field({
                type: graphql.String,
                async resolve(item, _, context) {
                    const { approvalsId, title } = item as unknown as {
                        approvalsId: string;
                        title: string
                    };
                    const prisma = context.prisma as PrismaClient
                    const approval = await prisma.approval.findUnique({
                        where: {
                            id: approvalsId
                        },
                        select: {
                            code: true
                        }
                    })

                    return `${title} (${approval!.code})`;
                },
            }),
            // graphQLReturnType: "String",
        }),
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
            ui: {
                views: './src/custome-fields-view/bigint-viewer.tsx'
            },
            field: graphql.field({
                type: graphql.BigInt,
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
                        console.log(i.totalPayable)
                        total += BigInt(i.totalPayable)
                    })


                    return total
                }
            })
        }),
        totalStatementsPayed: virtual({
            label: "مجموع پرداختی ها",
            ui: {
                views: './src/custome-fields-view/bigint-viewer.tsx'
            },
            field: graphql.field({
                type: graphql.BigInt,
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

                    return total
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