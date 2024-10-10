import { graphql, list } from "@keystone-6/core";
import { allOperations, allowAll } from "@keystone-6/core/access";
import {
  bigInt,
  file,
  integer,
  relationship,
  select,
  text,
  timestamp,
  virtual,
} from "@keystone-6/core/fields";
import { getRoleFromArgs, Roles, Session } from "../data/types";
import { editIfAdmin, setPermitions } from "../data/utils";
import { isAdmin, isLoggedIn, isMobayen } from "../data/access";
import { gql } from "@ts-gql/tag/no-transform";
import { Lists } from ".keystone/types";

export const Design = list<Lists.Design.TypeInfo<Session>>({
  access: {
    operation: {
      ...allOperations(isLoggedIn),
      query: () => true,
    },
    item: {
      update: args => {
        return getRoleFromArgs(args) <= Roles.operator || args.item.createdById === args.context.session?.itemId
      },
      delete: args => {
        return getRoleFromArgs(args) <= Roles.operator || args.item.createdById === args.context.session?.itemId
      }
    }
  },
  ui: {
    label: 'نقشه',
    hideCreate: true,
    isHidden: true,
    listView: {
      initialColumns: ['title', 'category'],

    },

  },
  fields: {
    title: text({
      label: 'عنوان',
    }),
    design: relationship({
      ref: 'FileStore',
      ui: {
        itemView: {
          fieldMode(args) {
            const role = getRoleFromArgs(args)
            if (role)
              return [Roles.admin, Roles.operator].includes(role) ? 'edit' : 'hidden'
            else
              return 'hidden'
          },
        },
        displayMode: 'cards',
        inlineCreate: { fields: ['file'] },
        inlineEdit: { fields: ['file'] },
        cardFields: ['title', 'file'],
      }
    }),

    // download: virtual({
    //   ui: {
    //     views: './src/custome-fields-view/link-viewer.tsx'
    //   },
    //   field: graphql.field({
    //     type: graphql.JSON,
    //     async resolve(item, args, context) {

    //       const { id } = item as unknown as { id?: string };

    //       if (!id)
    //         return []

    //       const DESIGN_FILES = gql`
    //         query DesignFiles($where: DesignWhereUniqueInput!) {
    //             design(where: $where) {
    //               id
    //               design {
    //                 file { filename url }
    //               }
    //             }
    //         }
    //       ` as import('../__generated__/ts-gql/DesignFiles').type

    //       const data = await context.graphql.run({
    //         query: DESIGN_FILES,
    //         variables: { where: { id } }
    //       })

    //       return data.design?.design?.map(i => ({ url: i.file?.url, name: i.file?.filename })).filter(i => i.url) || []
    //     },
    //   }),
    // }),
    category: relationship({
      label: ' ها دسته بندی',
      ref: 'Category.designs',
      ui: {
        views: "./src/custome-fields-view/folder-struct-relation.tsx",
      }
    }),
    tags: relationship({
      ref: 'Tag',
      label: 'برچسب ها',
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
      defaultValue: { kind: "now" },
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: {
          fieldMode(args) { return editIfAdmin(args) },
          fieldPosition: 'sidebar'
        }
      }
    }),
    createdBy: relationship({
      ref: "User.Designs",
      many: false,
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: {
          fieldMode(args) { return editIfAdmin(args) },
          fieldPosition: 'sidebar'
        }
      },
      hooks: {
        resolveInput(args) {

          if (args.operation === 'create') {
            return { connect: { id: args.context.session?.itemId } }
          }

          return args.resolvedData.createdBy
        },
      }
    }),
  },
});
