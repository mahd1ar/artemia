import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { relationship, select, text, timestamp } from "@keystone-6/core/fields";
import { Roles, Session } from "../data/types";
import { setPermitions } from "../data/utils";
import type { Lists } from ".keystone/types";


function findMissingNumber(arr: number[]) {
    if (arr.length <= 1) {
        return false; // Not enough elements for a sequence
    }

    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i + 1] - arr[i] !== 1) {
            return arr[i] + 1; // Missing number
        }
    }

    return false; // Sequence is complete
}

export const Category = list<Lists.Category.TypeInfo<Session>>({
    access: {
        operation: allowAll,
        // filter: {
        //     query: async args => {
        //         const referer = new URL(args.context.req!.headers.referer || '')

        //         return referer.pathname === '/categories' && !referer.search ?
        //             {
        //                 parent: null
        //             }
        //             : true
        //     }
        // }
        // filter: {
        //     query: async (args) => {
        //         const referer = args.context.req?.headers.referer;
        //         if (!referer) return true;

        //         const from = new URL(referer).pathname.split("/").filter(Boolean).at(0);

        //         if (from === "categories") return true;

        //         if (from === "designs") {

        //             const prisma = args.context.prisma as PrismaClient;
        //             const setting = await prisma.setting.findFirst();
        //             const parrentCategory = setting?.parentCategoryOfDesignTag;

        //             if (!parrentCategory) return true;

        //             return {
        //                 parent: {
        //                     id: {
        //                         equals: parrentCategory,
        //                     },
        //                 },
        //             };
        //         }

        //         return true;
        //     },
        // },
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
        }
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

                    if (args.operation === 'create') {
                        if (!args.inputData.code) {
                            const parentId = args.inputData.parent?.connect?.id ||
                                args.resolvedData.parent?.connect?.id ||
                                args.resolvedData.parent?.create?.id

                            if (parentId) {
                                const parentCategory = await args.context.prisma.category.findUnique({
                                    where: {
                                        id: parentId
                                    },
                                    select: {
                                        code: true,
                                        children: {
                                            select: {
                                                id: true,
                                                code: true
                                            }
                                        }
                                    }
                                })

                                if (parentCategory) {
                                    const regex = new RegExp(`^${parentCategory.code}`);

                                    const numbers = parentCategory.children.map(child => +(child.code.replace(regex, ''))).filter(Boolean)
                                    if (numbers.length) {
                                        const missingNumber = findMissingNumber(numbers.sort())
                                        if (missingNumber) return `${parentCategory.code}${missingNumber > 9 ? missingNumber : `0${missingNumber}`}`
                                        else {
                                            const code = Math.max(...numbers) + 1

                                            return `${parentCategory.code}${code > 9 ? code : `0${code}`}`
                                        }
                                    } else return `${parentCategory.code}01`

                                }
                            }

                        }


                    }

                    if (args.operation === 'update') {
                        // FIXME update code on change parent

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
            hooks: {
                // async resolveInput(args) {
                //     console.log(args.resolvedData);
                //     if (args.operation === "create") {
                //         const referer = args.context.req?.headers.referer;
                //         if (referer) {
                //             const from = new URL(referer).pathname
                //                 .split("/")
                //                 .filter(Boolean)
                //                 .at(0);
                //             if (from === "categories") {
                //                 return args.resolvedData.parent;
                //             } else {
                //                 const prisma = args.context.prisma as PrismaClient;
                //                 const settings = await prisma.setting.findFirst();

                //                 if (from === "designs") {
                //                     if (settings?.parentCategoryOfDesignTag) {
                //                         console.log(99090);
                //                         console.log(settings?.parentCategoryOfDesignTag);
                //                         return {
                //                             connect: { id: settings.parentCategoryOfDesignTag },
                //                         };
                //                     }
                //                 }
                //             }
                //         }
                //     }

                //     return args.resolvedData.parent;
                // },
            },
        }),

        designs: relationship({
            ref: 'Design.category',
            many: true
        })
    },
});
