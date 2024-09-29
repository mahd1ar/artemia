import { list } from "@keystone-6/core";
import { allOperations, allowAll } from "@keystone-6/core/access";
import { checkbox, relationship, select, text, timestamp } from "@keystone-6/core/fields";
import { getRoleFromArgs, Roles, Session } from "../data/types";
import { setPermitions } from "../data/utils";
import type { Lists } from ".keystone/types";
import { isLoggedIn } from "../data/access";


function findMissingNumber(arr: number[]) {
    if (arr.length <= 1) {
        return false; // Not enough elements for a sequence
    }

    const min = Math.min(...arr)

    if (min !== 0 && min !== 1) {
        arr.unshift(0)
    }

    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i + 1] - arr[i] !== 1) {
            return arr[i] + 1; // Missing number
        }
    }

    return false; // Sequence is complete
}

async function generateCode(itemId: string | null, parentId: string | null, prisma: Lists.Category.TypeInfo<Session>['all']['prisma']) {



    let siblings = await prisma.category.findMany({
        where: {
            parent: parentId ? {
                id: {
                    equals: parentId
                }
            } : null,
        },
        select: {
            parent: {
                select: {
                    id: true,
                    code: true
                },
            },
            code: true,
            id: true
        }
    })

    if (itemId)
        siblings = siblings.filter(child => child.id !== itemId)


    let parentCode: string | null = null

    if (parentId) {

        const parentCategory = await prisma.category.findUnique({
            where: {
                id: parentId
            },
            select: {
                code: true
            }
        })

        parentCode = parentCategory?.code || null
    }


    let ss: string[]
    if (parentCode) {
        const regex = new RegExp(`^${parentCode}`);
        ss = siblings.map(child => child.code.replace(regex, ''))
    } else {
        ss = siblings.map(child => child.code)
    }

    const siblingsCode = ss.map(i => +i.replace(/\//s, '')).filter(Boolean)

    if (siblingsCode.length) {
        const missingNumber = findMissingNumber(siblingsCode.sort())
        if (missingNumber) return (parentCode || '') + '/' + (missingNumber > 9 ? missingNumber : `0${missingNumber}`)
        else {
            const code = Math.max(...siblingsCode) + 1

            return (parentCode || '') + '/' + (code > 9 ? code : `0${code}`)
        }
    } else return `${parentCode || ''}/01`
}

export const Category = list<Lists.Category.TypeInfo<Session>>({
    access: {
        operation: {
            ...allOperations(isLoggedIn)
        },
        item: {
            delete: args => {

                const role = getRoleFromArgs(args.context)

                return role <= Roles.operator || !args.item.isProtected
            }
        }
    },
    hooks: {

        beforeOperation: async (args) => {
            const originalItem = args.item?.id;


            if (args.operation === "delete" && originalItem) {

                const sudo = args.context.sudo()

                const children = await sudo.query.Category.findMany({
                    where: {
                        parent: {
                            id: {
                                equals: originalItem
                            }
                        }
                    },
                    query: "id"
                })

                await sudo.query.Category.deleteMany({
                    where: children
                })
            }
        },
        async afterOperation(args) {


            if (args.operation === 'update' && (args.inputData.parent?.connect?.id || args.inputData.parent?.disconnect)) {

                const oldCode = args.originalItem.code
                const newCode = args.item.code
                const itemId = args.item.id

                if (oldCode === newCode) return

                const allChildren = await args.context.prisma.category.findMany({
                    where: {
                        AND: [
                            {
                                code: {
                                    startsWith: oldCode
                                }
                            },
                            {
                                code: {
                                    not: {
                                        equals: oldCode
                                    }
                                }
                            }
                        ]
                    },
                    select: {
                        code: true,
                        id: true,
                        title: true,
                        parentId: true,
                    }
                })

                allChildren.sort((a, b) => +a.code - +b.code)

                if (allChildren.length === 0) return

                let range = {
                    from: 0,
                    to: allChildren.length,

                    [Symbol.asyncIterator]() { // (1)
                        return {
                            current: this.from,
                            last: this.to,

                            async next() { // (2)

                                if (this.current < this.last) {
                                    const ch = allChildren[this.current]
                                    const data = await args.context.query.Category.updateOne({
                                        where: {
                                            id: ch.id
                                        },
                                        data: {
                                            code: ''
                                        },
                                        query: 'code'
                                    })
                                    this.current++
                                    return { done: false, value: data.code };
                                } else {
                                    return { done: true };
                                }
                            }
                        };
                    }
                };

                for await (const _ of range) {
                }


            }
        },
    },
    ui: {
        itemView: {
            defaultFieldMode(args) {
                return setPermitions(
                    args,
                    [{ role: Roles.admin, fieldMode: "edit" }],
                    "hidden"
                );
            },
        },
    },

    fields: {
        code: text({
            hooks: {
                async resolveInput(args) {
                    // wether it is update or create
                    if (!args.inputData.code) {

                        const parentId = args.inputData.parent?.connect?.id ||
                            args.resolvedData.parent?.connect?.id ||
                            args.resolvedData.parent?.create?.id || args.item?.parentId || null


                        return await generateCode(args.item?.id || null, parentId, args.context.prisma)





                    }

                    if (args.operation === 'update' && (args.inputData.parent?.connect?.id || args.inputData.parent?.disconnect)) {

                        const parentId = args.inputData.parent?.connect?.id || null


                        return await generateCode(args.item.id, parentId, args.context.prisma)

                    }



                    return args.resolvedData.code
                },
            }
        }),
        title: text({
            validation: { isRequired: true },
            label: "عنوان",
        }),
        description: text({ ui: { displayMode: "textarea" } }),
        isProtected: checkbox(),
        children: relationship({
            // ui: {
            //     createView: {
            //         fieldMode: "hidden",
            //     },
            // },
            ref: "Category.parent",
            many: true,
        }),
        parent: relationship({
            ui: {
                itemView: {
                    fieldPosition: 'sidebar'
                }
            },
            ref: "Category.children",
        }),

        designs: relationship({
            ref: 'Design.category',
            many: true
        })
    },
});
