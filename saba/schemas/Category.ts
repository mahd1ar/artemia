import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { relationship, select, text, timestamp } from "@keystone-6/core/fields";
import { Roles } from "../data/types";
import { setPermitions } from "../data/utils";
import type { Lists } from ".keystone/types";

export const Category = list<Lists.Category.TypeInfo<any>>({
    access: {
        operation: allowAll,
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
            // ui: {
            //     createView: {
            //         fieldMode: "hidden",
            //     },
            // },
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
