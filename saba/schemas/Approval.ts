import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import {
  integer,
  relationship,
  select,
  text,
  timestamp,
} from "@keystone-6/core/fields";
import { Roles, Session } from "../data/types";

export const Approval = list({
  access: allowAll,
  ui: {
    label: 'مصوبات',
    listView: {
      initialColumns: ['title'],
    }
  },
  fields: {
    title: text({
      label: 'عنوان',
    }),
    description: relationship({
      ref: 'Description.approvals',
      many: true,
      label: 'شرح مصوبات',
      ui: {
        createView: {
          fieldMode: 'hidden',
        },
        itemView: {
          fieldMode(args) {

            return (args.session as Session)?.data.role === Roles.supervisor ? 'read' : 'edit'
          },

        }

      }
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
      ref: "User.approvals",
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
  },
});
