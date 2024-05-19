import { graphql, list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import {
  bigInt,
  checkbox,
  file,
  image,
  integer,
  relationship,
  select,
  text,
  timestamp,
  virtual,
} from "@keystone-6/core/fields";
import { persianCalendar } from "../src/custom-fields/persian-calander";
import { NumUtils, setPermitions } from "../data/utils";
import { Roles, Session, getRoleFromArgs } from "../data/types";
import { isMobayen } from "../data/access";
import { PrismaClient } from "@prisma/client";


const alc = [{
  key: 'confirmedByFinancialSupervisor',
  for: Roles.financial
},
{
  key: 'confirmedByTheUploader',
  for: Roles.workshop
},
{
  key: 'confirmedByProjectControlSupervisor',
  for: Roles.projectControl
}]


export const Statement = list({
  access: {
    operation: allowAll,
    item: {
      // update: (args) => !isMobayen(args),
      delete: (args) => !isMobayen(args),
    },
    filter: {
      query: args => {
        const role = getRoleFromArgs(args, Roles.guest)

        if (role === Roles.admin || role === Roles.workshop)
          return true

        return {
          confirmedByTheUploader: {
            equals: true
          }
        }
      }
    }
  },
  hooks: {
    async validate(args) {
      const session = args.context.session as Session;

      // if (args.operation !== "create") {
      //   if ((args.item as any).confirmedByTheUploader) {
      //     if (session?.data.role === Roles.workshop) {
      //       args.addValidationError("این پیشنهاد قبلا تایید شده است");
      //     }
      //   }
      // }


      if (args.operation === 'update') {

        alc.forEach(({ key, for: forr }) => {


          if (typeof args.inputData![key] === "boolean") {
            const confirmed = !!args.inputData![key];

            if (confirmed === false && session?.data.role === forr) {
              args.addValidationError("این پیشنهاد قبلا تایید شده است");
            }

          }

        })

      }


    },

    async afterOperation(args) {
      const session = args.context.session as Session;

      const prisma = args.context.prisma as PrismaClient;
      if (args.operation === "delete") {
        const itemId = args.originalItem.id;

        const x = await prisma.statementItem.deleteMany({
          where: {
            statement: {
              id: {
                equals: String(itemId),
              },
            },
          },
        });

        // TODO DELETE PAYMENT
      } else {
        // console.log(args.inputData)
        // console.log(args.originalItem)
        // console.log(args.item)
        // console.log(args.resolvedData)
        if (args.inputData.peyments) {
          if (args.item!.id) {
            await prisma.payment.updateMany({
              where: {
                statement: {
                  id: {
                    equals: String(args.item!.id),
                  },
                },
              },
              data: {
                // TODO check this on create item (operation===create)
                title:
                  (args.inputData.title ||
                    args.originalItem!.title ||
                    args.resolvedData.title) + " رسید ",
              },
            });
          }
        }
      }

      if (args.operation === "update") {

        alc.forEach(async ({ key, for: forr }) => {

          if (typeof args.inputData![key] === "boolean") {
            const confirmed = !!args.inputData![key];

            await prisma.log.create({
              data: {
                action: key === 'confirmedByTheUploader' ? 'STATEMENT_FINALIZED_REGISTRATION' : "STATEMENT_CONFIRMED",
                type: "info",
                message: `statement with id ${args.item?.id} is ${confirmed ? "confirmed ✔️" : "UNconfirmed ❌"
                  } by "${session?.data.name}(${session?.itemId})"`,
              },
              select: { id: true },
            });



          }



        })



      }
    },
  },
  ui: {
    label: "صورت وضعیت",
    listView: {
      initialColumns: ["title", "status"],
      initialSort: {
        field: "sateOfStatement",
        direction: "DESC",
      },
    },
    itemView: {
      defaultFieldMode: args =>
        [Roles.admin, Roles.workshop, Roles.operator].includes(getRoleFromArgs(args)) ? 'edit' : 'read'
    },
    hideDelete(args) {
      return isMobayen(args);
    },
  },
  fields: {
    statementConfirmationStatus: virtual({
      ui: {
        itemView: { fieldMode: 'hidden' },
        views: './src/custome-fields-view/statement-confirmation-status.tsx'
      },
      field: graphql.field({
        type: graphql.JSON,
        async resolve(item, args, context) {



          if (!item.id)
            return {
              ok: true,
              uploader: null,
              financialSupervisor: null,
              projectControlSupervisor: null,
              Supervisor: null,
            }


          return {
            ok: true,
            uploader: item.confirmedByTheUploader as boolean,
            financialSupervisor: item.confirmedByFinancialSupervisor as boolean,
            projectControlSupervisor: item.confirmedByProjectControlSupervisor as boolean,
            Supervisor: item.confirmedBySupervisor as boolean
          }
        },
      }),
    }),


    confirmedByTheUploader: checkbox({
      label: "تایید توسط ناظر کارگاه",
      ui: {
        itemView: {
          fieldMode(args) {
            return setPermitions(args, [
              { role: Roles.workshop, fieldMode: 'edit' },
              { role: Roles.admin, fieldMode: 'edit' },
              { role: Roles.operator, fieldMode: 'edit' },
              // { role: Roles.supervisor, fieldMode: 'edit' },
            ], 'hidden')
          },
        },
        createView: { fieldMode: "hidden" },
        views: "./src/custome-fields-view/confirm-statement-by.tsx",
      },
    }),
    confirmedByFinancialSupervisor: checkbox({
      label: "تایید توسط ناظر مالی",

      ui: {
        itemView: {
          fieldMode(args) {
            return setPermitions(args, [
              { role: Roles.financial, fieldMode: 'edit' },
              { role: Roles.admin, fieldMode: 'edit' },
              { role: Roles.operator, fieldMode: 'edit' },
              // { role: Roles.supervisor, fieldMode: 'edit' },
            ], 'hidden')
          },
        },
        createView: { fieldMode: "hidden" },
        views: "./src/custome-fields-view/confirm-statement-by.tsx",
      },
    }),
    confirmedByProjectControlSupervisor: checkbox({
      label: "تایید توسط ناظر کنترل پروژه",

      ui: {
        itemView: {
          fieldMode(args) {
            return setPermitions(args, [
              { role: Roles.projectControl, fieldMode: 'edit' },
              { role: Roles.admin, fieldMode: 'edit' },
              { role: Roles.operator, fieldMode: 'edit' },
              // { role: Roles.supervisor, fieldMode: 'edit' },
            ], 'hidden')
          },
        },
        createView: { fieldMode: "hidden" },
        views: "./src/custome-fields-view/confirm-statement-by.tsx",
      },
    }),
    confirmedBySupervisor: checkbox({
      label: "تایید توسط سرپرست کل ",

      ui: {
        itemView: {
          fieldMode(args) {
            return setPermitions(args, [
              { role: Roles.supervisor, fieldMode: 'edit' },
              { role: Roles.admin, fieldMode: 'edit' },
              { role: Roles.operator, fieldMode: 'edit' },
            ], 'hidden')
          },
        },
        createView: { fieldMode: "hidden" },
        views: "./src/custome-fields-view/confirm-statement-by.tsx",
      },
    }),

    title: text({ validation: { isRequired: true } }),
    description: relationship({
      label: " شرح مصوبه متناظر",
      ref: "Description.statements",
      many: false,
      ui: {
        views: "./src/custome-fields-view/statement-description-realtion.tsx",
        itemView: {
          fieldPosition(args) {
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
      label: "تاریخ صورت وضعیت",
    }),
    image: image({
      storage: "image",
      ui: {
        itemView: {
          fieldPosition: "sidebar",
        },
      },
    }),
    items: relationship({
      label: "آیتم ها",
      ref: "StatementItem.statement",
      many: true,
      ui: {
        displayMode: "cards",
        cardFields: [
          "description",
          "unit",
          "unitPrice",
          "quantity",
          "percentageOfWorkDone",
          "total",
        ],
        inlineCreate: {
          fields: [
            "description",
            "unit",
            "unitPrice",
            "quantity",
            "percentageOfWorkDone",
          ],
        },
        inlineEdit: {
          fields: [
            "description",
            "unit",
            "unitPrice",
            "quantity",
            "percentageOfWorkDone",
          ],
        },
      },
    }),
    peyments: relationship({
      label: "رسید پرداختی",
      ref: "Payment.statement",
      many: true,
      ui: {

        cardFields: ["attachment", "price", "dateOfPayment", "description"],
        displayMode: "cards",
        inlineConnect: false,
        inlineCreate: {
          fields: ["attachment", "price", "dateOfPayment", "description"],
        },
        inlineEdit: {
          fields: ["attachment", "price", "dateOfPayment", "description"],
        },
      },
    }),

    deductionOnAccountOfAdvancePayment: bigInt({
      label: "کسر علی الحساب",
      ui: {
        // itemView: { fieldMode: 'edit' },
        views: "./src/custome-fields-view/bigint-with-farsi-letters",
      },
      defaultValue: 0n,
    }),

    tax: bigInt({
      label: "مالیات",
      validation: { isRequired: true },
      defaultValue: 0n,
    }),

    totalPayable: virtual({
      label: "جمع  کل قابل پرداخت ",
      field: graphql.field({
        type: graphql.String,
        async resolve(item, args, context) {
          const {
            id: itemid,
            deductionOnAccountOfAdvancePayment: deduction,
            tax,
          } = item as unknown as {
            id: string;
            deductionOnAccountOfAdvancePayment: bigint;
            tax: bigint;
          };

          if (itemid) {
            const x = await context.query.StatementItem.findMany({
              where: {
                statement: {
                  id: {
                    equals: itemid,
                  },
                },
              },
              query: "total",
            });

            let total = 0n;

            for (const i of x) {
              total += BigInt(i.total.replace(/,/g, ""));
            }
            return NumUtils.format(total - (deduction || 0n) + (tax || 0n));
          } else return "0";
        },
      }),
    }),

    status: select({
      options: [
        { label: "در انتظار پرداخت", value: "pending" },
        { label: "پرداخت شد", value: "paid" },
      ],
      defaultValue: "pending",
      ui: {
        displayMode: "segmented-control",
        createView: { fieldMode: "hidden" },
      },
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
      ref: "User.statements",
      many: false,
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: {
          fieldPosition: "sidebar",
          fieldMode(args) {
            return "read";
          },
        },
      },
      hooks: {
        resolveInput(args) {
          if (args.operation === "create") {
            const session = args.context.session as Session;
            args.resolvedData.createdBy = { connect: { id: session?.itemId } };
          }

          return args.resolvedData.createdBy;
        },
      },
    }),
    updatedBy: relationship({
      ref: "User",
      many: false,
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: {
          fieldPosition: "sidebar",
          fieldMode(args) {
            return "read";
          },
        },
      },
      hooks: {
        resolveInput(args) {
          const session = args.context.session as Session;
          args.resolvedData.createdBy = { connect: { id: session?.itemId } };

          return args.resolvedData.createdBy;
        },
      },
    }),
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
