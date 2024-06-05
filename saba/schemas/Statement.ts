import { graphql, list } from "@keystone-6/core";
import { allOperations, allowAll } from "@keystone-6/core/access";
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
import { LogMessage, Roles, Session, alc, getRoleFromArgs } from "../data/types";
import { isMobayen } from "../data/access";
import { PrismaClient } from "@prisma/client";
import type { Lists } from ".keystone/types";
import { Notif } from '../data/message'


export const Statement = list<Lists.Statement.TypeInfo<any>>({
  access: {
    operation: {
      create: args => !!args.session,
      delete: args => !!args.session,
      query: args => !!args.session,
      update: args => !!args.session,
    },
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

        alc.forEach(({ gqlkey: key, for: forr }) => {

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

        let conformationHappend = false

        alc.forEach(async ({ gqlkey: key, for: forr }) => {

          if (typeof args.inputData![key] === "boolean") {

            conformationHappend = true
            const confirmed = !!args.inputData![key];

            const logMessage: LogMessage.Statement = {
              confirmed,
              id: args.item.id,
              user: session!.itemId
            }

            await prisma.log.create({
              data: {
                action: key === 'confirmedByTheUploader' ? 'STATEMENT_FINALIZED_REGISTRATION' : "STATEMENT_CONFIRMED",
                type: "info",
                message: JSON.stringify(logMessage),
              },
              select: { id: true },
            });



          }



        })

        if (conformationHappend) { // confirmation or un confirmation has happend

          const settings = await prisma.setting.findFirst()

          if (settings?.sendMessageToTelegram) {

            const notif_statementTile = `${args.inputData?.title || args.resolvedData?.title || args.item?.title || args.originalItem?.title || '#'}`
            const notif_url = `saba.netdom.ir/statements/${args.item?.id}`

            if (session && session.data.role > Roles.operator) {

              const notif_username = session.data.name

              if (args.inputData.confirmedByTheUploader) {

                await Notif.workShopIsDoneUploadingStatement(notif_statementTile, notif_username, notif_url)

              }

              else if (args.inputData.confirmedByProjectControlSupervisor) {

                await Notif.statementIsConfirmedByProjectManager(notif_statementTile, notif_username, notif_url)

              }

              else if (args.inputData.confirmedByFinancialSupervisor) {

                await Notif.statementIsConfirmedByFinancialSupervisor(notif_statementTile, notif_username, notif_url)

              }

              else if (args.inputData.confirmedByTechnicalSupervisor) {

                await Notif.statementIsConfirmedByTechnicalGroup(notif_statementTile, notif_username, notif_url)

              }

            }
          }

        }



      }
    },
  },
  ui: {
    label: "صورت وضعیت",
    listView: {
      initialColumns: ["title", "status", 'statementConfirmationStatus'],
      initialSort: {
        field: "sateOfStatement",
        direction: "DESC",
      },
    },
    hideCreate(args) {

      const role = getRoleFromArgs(args)

      return Roles.workshop !== role && role > Roles.operator

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
      label: ' تایید صورت وضعیت',
      ui: {
        // itemView: { fieldMode: 'hidden' },
        createView: { fieldMode: 'hidden' },
        views: './src/custome-fields-view/statement-confirmation-status.tsx'
      },
      field: graphql.field({
        type: graphql.JSON,
        async resolve(item, args, context) {

          return {
            ok: !!item.id,
            userRole: (context.session as Session)?.data.role,
            data: alc.map(i => ({
              key: i.gqlkey,
              value: !!item.id ? item[i.gqlkey] as boolean : null,
              isCurrent: (context.session as Session)?.data.role === i.for
            }))
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
    confirmedByTechnicalSupervisor: checkbox({
      label: "تایید توسط ناظر فنی پروژه",

      ui: {
        itemView: {
          fieldMode(args) {
            return setPermitions(args, [
              { role: Roles.technical, fieldMode: 'edit' },
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

    title: text({
      label: 'عنوان',
      validation: { isRequired: true }
    }),
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

    attachments: relationship({
      label: 'فایل های ضمیمه شده',
      ref: 'FileStore.statement',
      many: true,
      ui: {
        itemView: {
          fieldPosition: 'sidebar'
        },
        displayMode: 'cards',
        cardFields: ['title', 'file'],
        inlineCreate: { fields: ['title', 'file'] },
        inlineConnect: false,
        inlineEdit: { fields: ['title', 'file'] },
        linkToItem: false
      }
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
      ui: {
        views: './src/custome-fields-view/bigint-viewer.tsx'
      },
      label: "جمع  کل قابل پرداخت ",
      field: graphql.field({
        type: graphql.BigInt,
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

              total += BigInt(i.total) /*.replace(/,/g, "") */;
            }

            return BigInt(total - (deduction || 0n) + (tax || 0n));
          } else return 0n;
        },
      }),
    }),

    status: select({
      label: 'وضعیت پرداخت',
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
