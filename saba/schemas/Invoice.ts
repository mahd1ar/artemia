import { graphql, list } from "@keystone-6/core";
import { allOperations, allowAll } from "@keystone-6/core/access";
import {
  bigInt,
  checkbox,
  file,
  image,
  integer,
  json,
  relationship,
  select,
  text,
  timestamp,
  virtual,
} from "@keystone-6/core/fields";
import { persianCalendar } from "../src/custom-fields/persian-calander";
import { ExcludesFalse, NumUtils, setPermitions } from "../data/utils";
import { LogMessage, Roles, Session, alc, getRoleFromArgs } from "../data/types";
import type { Lists } from ".keystone/types";
import { Notif } from '../data/message'
import DeviceDetector from "node-device-detector";
import { isLoggedIn } from "../data/access";

const detector = new DeviceDetector({
  clientIndexes: false,
  deviceIndexes: true,
  deviceAliasCode: false,
  deviceTrusted: false,
  deviceInfo: false,
  maxUserAgentSize: 500,
});


export const Invoice = list<Lists.Invoice.TypeInfo<Session>>({
  access: {
    operation: {
      ...allOperations(isLoggedIn),
    },
    item: {
      update: (args) => getRoleFromArgs(args) <= Roles.operator || args.item.createdById === args.context.session?.itemId,
      delete: (args) => getRoleFromArgs(args) <= Roles.operator || args.item.createdById === args.context.session?.itemId
    }

  },
  hooks: {


  },
  ui: {
    label: "فاکتور ها",
    listView: {
      initialColumns: ["title", "status", 'statementConfirmationStatus'],
      initialSort: {
        field: "sateOfStatement",
        direction: "DESC",
      },
    },

  },
  fields: {

    title: text({
      label: 'عنوان',
      validation: { isRequired: true }
    }),
    contract: relationship({
      label: 'قرارداد',
      ref: "Contract.invoices",
      ui: {
        displayMode: 'select',
        searchFields: ['title'],
        labelField: 'summery',
        hideCreate: true
      }
    }),
    description: relationship({
      label: " شرح مصوبه متناظر",
      ref: "Description.invoices",
      many: false,
      ui: {
        views: "./src/custome-fields-view/statement-description-realtion.tsx",
        itemView: {
          fieldPosition(args) {
            const userAgent = (args.context.req?.headers["user-agent"])

            if (userAgent)
              return detector.detect(userAgent).device.type === 'desktop' ? 'sidebar' : 'form'

            return "sidebar";
          },
        },
        // createView: {
        //   fieldMode(args) {
        //     // TODO abstract this to function
        //     const reff = new URL((args.context.res?.req.headers.referer as string))
        //     const referer = (reff.pathname.split('/').filter(Boolean).at(0))
        //     return referer === 'descriptions' ? 'hidden' : 'edit'
        //   },
        // },
        // displayMode: 'select'
      },
    }),
    sateOfStatement: persianCalendar({
      label: "تاریخ فاکتور",
    }),

    attachments: relationship({
      label: 'فایل های ضمیمه شده',
      ref: 'FileStore.invoice',
      many: true,
      ui: {
        itemView: {
          fieldPosition(args) {
            const userAgent = (args.context.req?.headers["user-agent"])

            if (userAgent)
              return detector.detect(userAgent).device.type === 'desktop' ? 'sidebar' : 'form'

            return 'sidebar'
          }
        },
        displayMode: 'cards',
        cardFields: ['title', 'file'],
        inlineCreate: { fields: ['title', 'file'] },
        inlineConnect: false,
        inlineEdit: { fields: ['title', 'file'] },
        linkToItem: false
      }
    }),
    // visualItems: virtual({
    //   label: "آیتم ها",
    //   ui: {
    //     itemView: {
    //       fieldMode: args => getRoleFromArgs(args) !== Roles.workshop ? 'edit' : 'hidden',
    //     },
    //     views: './src/custome-fields-view/statement-items-table'
    //   },
    //   field: graphql.field({
    //     type: graphql.JSON,
    //     async resolve(item, args, context) {

    //       if (item.id) {
    //         const x = await context.query.StatementItem.findMany({
    //           where: {
    //             statement: {
    //               id: {
    //                 equals: item.id,
    //               },
    //             },
    //           },
    //           query: "description unit  unitPrice quantity percentageOfWorkDone total",
    //         })

    //         return x

    //       } else return [];
    //     },
    //   }),
    // }),
    // items: relationship({
    //   label: "آیتم ها",
    //   ref: "StatementItem.statement",
    //   many: true,
    //   ui: {
    //     itemView: {
    //       fieldMode: args => getRoleFromArgs(args) === Roles.workshop ? 'edit' : 'hidden',
    //     },
    //     displayMode: "cards",
    //     cardFields: [
    //       "description",
    //       "unit",
    //       "unitPrice",
    //       "quantity",
    //       "percentageOfWorkDone",
    //       "total",
    //     ],
    //     inlineCreate: {
    //       fields: [
    //         "description",
    //         "unit",
    //         "unitPrice",
    //         "quantity",
    //         "percentageOfWorkDone",
    //       ],
    //     },
    //     inlineEdit: {
    //       fields: [
    //         "description",
    //         "unit",
    //         "unitPrice",
    //         "quantity",
    //         "percentageOfWorkDone",
    //       ],
    //     },
    //   },
    // }),

    price: bigInt({
      label: 'مبلغ',
      validation: {
        min: BigInt(0)
      }
    }),



    createdAt: timestamp({
      defaultValue: { kind: "now" },
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: {
          fieldPosition: "sidebar",
          fieldMode(args) {
            return "read";
          },
        },
      },
    }),
    createdBy: relationship({
      ref: "User",
      many: false,
      hooks: {
        resolveInput(args) {

          if (args.operation === 'create')
            return { connect: { id: args.context.session?.itemId } }

          return args.resolvedData.createdBy
        },
      },
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: {
          fieldPosition: "sidebar",
          fieldMode(args) {
            return "read";
          },
        },
      },
    }),
    changeLog: json({
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: {
          fieldPosition: "sidebar",
          fieldMode(args) {
            if (args.session?.data.role === Roles.admin)
              return "read";
            else
              return 'hidden'
          },
        },
      },
      hooks: {
        resolveInput(args) {

          const state = (args.item?.changeLog) ? JSON.parse(args.item.changeLog || "[]") : [];
          const info = {
            ops: args.operation,
            items: Object.keys(args.inputData),
            by: args.context.session?.itemId,
            at: new Date()
          }

          state.push(info)

          return JSON.stringify(state)

        },
      }
    })

  },
});

//
//   field: graphql.field({
//     type: graphql.Float,
//     resolve(item) {
//       const { unitPrice = 0, quantity = 0 } = item as unknown as {
//         unitPrice: number
//         quantity: number
//       }

//       return 2
//     },
//   }),
// },
