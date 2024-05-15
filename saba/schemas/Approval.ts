import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import {
  bigInt,
  integer,
  relationship,
  select,
  text,
  timestamp,
} from "@keystone-6/core/fields";
import { Roles, Session } from "../data/types";
import { editIfAdmin, setPermitions } from "../data/utils";

export const Approval = list({
  access: allowAll,
  ui: {
    label: 'مصوبات',
    listView: {
      initialColumns: ["code", 'title', 'estimatedBudget'],
    },
    isHidden(args) {
      return (args.session as Session)?.data.role === Roles.workshop
    },
    itemView: {
      defaultFieldMode(args) {
        return setPermitions(args, [
          { role: Roles.operator, fieldMode: 'edit' },
        ], 'read')
      },
    }
  },
  fields: {
    code: text(),
    title: text({
      label: 'عنوان',
    }),
    estimatedBudget: bigInt({ label: 'برودجه تخمینی' }),
    description: relationship({
      ref: 'Description.approvals',
      many: true,
      label: 'شرح مصوبات',
      ui: {
        createView: {
          fieldMode: 'hidden',
        },
      }
    }),
    createdAt: timestamp({
      defaultValue: { kind: "now" },
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: {
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
