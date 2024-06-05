import { graphql, list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import {
  bigInt,
  integer,
  relationship,
  select,
  text,
  timestamp,
  virtual,
} from "@keystone-6/core/fields";
import { Roles, Session, getRoleFromArgs } from "../data/types";
import { editIfAdmin, setPermitions } from "../data/utils";
import { persianCalendar } from "../src/custom-fields/persian-calander";

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
        const currentRole = getRoleFromArgs(args)
        return currentRole > Roles.operator ? 'read' : 'edit'
      },
    }
  },
  fields: {
    code: text(),
    title: text({
      label: 'عنوان',
    }),
    estimatedBudget: bigInt({
      label: 'برودجه تخمینی',
      ui: {
        views: './src/custome-fields-view/bigint-with-farsi-letters.tsx'
      }
    }),

    totalStatementsPayable: virtual({
      ui: {
        views: './src/custome-fields-view/bigint-viewer.tsx'
      },
      label: "مجموع قابل پرداخت",
      field: graphql.field({
        type: graphql.BigInt,
        async resolve(item, args, context) {

          if (!item.id)
            return 0n

          let cost = 0n
          const data = await context.query.Approval.findOne({
            where: { id: item.id.toString() },
            query: 'description { id totalStatementsPayable } '
          })
          data.description.forEach((i: any) => {
            cost = cost + BigInt(i.totalStatementsPayable)
          })
          console.log(cost)
          return cost
        }
      })
    }),

    startDate: persianCalendar({
      label: 'تاریخ شروع',
      ui: {

      }
    }),
    estimatedEndDate: persianCalendar({
      label: 'تاریخ تخمینی پایان پروژه'
    }),

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
