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
import { sendResetPasswordEmail } from "../src/custom-fields/link-viewer";

export const Design = list({
  access: allowAll,
  ui: {
    label: 'نقشه',
    listView: {
      initialColumns: ['title', 'extension'],
    },
    itemView: {
      defaultFieldMode(args) {
        return setPermitions(args, [
          { role: Roles.operator, fieldMode: 'edit' },
          { role: Roles.admin, fieldMode: 'edit' },
        ], 'read')
      },
    }
  },
  fields: {
    title: text(),
    design: relationship({
      ref: 'FileStore',
      many: true,
      ui: {
        itemView: {
          fieldMode(args) {
            const role = (args.context.session as Session)?.data.role
            console.log(role)
            if (role)
              return [Roles.admin, Roles.operator].includes(role) ? 'read' : 'hidden'
            else
              return 'hidden'
          },
        },
        displayMode: 'cards',
        inlineCreate: { fields: ['file'] },
        inlineEdit: { fields: ['file'] },
        cardFields: ['title'],
      }
    }),
    maps: sendResetPasswordEmail(),
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
