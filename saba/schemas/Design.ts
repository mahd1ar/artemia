import { graphql, list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
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
import { Roles, Session } from "../data/types";
import { editIfAdmin, setPermitions } from "../data/utils";

export const Design = list({
  access: allowAll,
  ui: {
    label: 'نقشه',
    listView: {
      initialColumns: ['title', 'extension'],
    }
  },
  hooks: {
    async resolveInput(args) {
      if (args.operation === 'create' && !args.inputData.title) {

        try {


          args.resolvedData.title = args.resolvedData.design.filename.split(".")[0]

        } catch (error) {

          console.error(error)
        }
      }
      return args.resolvedData
    },
  },
  fields: {
    title: text(),
    design: file({
      storage: "file",
    }),
    extension: virtual({
      ui: {
        itemView: {
          fieldPosition: 'sidebar'
        }
      },
      field: graphql.field({
        type: graphql.String,
        async resolve(item, args, context) {

          let ext = ''

          try {
            // @ts-ignore
            ext = item.design_filename.split(".").at(-1) || ''
          } catch (error) {
            console.error(error)
          }

          return ext
        }
      })
    }),
    category: relationship({
      label: 'tags',
      ref: 'Category',
      many: true
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
            const session = args.context.session as Session
            args.resolvedData.createdBy = { connect: { id: session?.itemId } }
          }
          return args.resolvedData.createdBy
        },
      }
    }),
  },
});
