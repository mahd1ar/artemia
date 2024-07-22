import { list } from "@keystone-6/core";
import { allOperations, allowAll } from "@keystone-6/core/access";
import {
  checkbox,
  text,
} from "@keystone-6/core/fields";

import type { Lists } from ".keystone/types";
import {
  ImageStore,
  Description,
  Approval,
  Payment,
  Constractor,
  FileStore, User, Category, Log,
  Statement, StatementItem, Contract, Design, DailyReport, SafetyReport
} from "./schemas";
import { Roles, getRoleFromArgs } from "./data/types";

export const lists: Lists = {

  // @ts-ignore
  Approval,
  // @ts-ignore
  Description,
  // @ts-ignore
  Statement, StatementItem, Payment,
  // @ts-ignore
  ImageStore,

  // @ts-ignore
  Constractor,
  // @ts-ignore
  FileStore,
  // @ts-ignore
  Contract,

  // @ts-ignore
  Design, 
  DailyReport,
  SafetyReport,

  // @ts-ignore
  User, Category, Log,
  Tag: list({
    access: allowAll,
    ui: {
      isHidden: true,
    },
    fields: {
      name: text(),
    },
  }),
  Setting: list({
    access: allowAll,
    isSingleton: true,
    ui: {
      isHidden(args) {
        return getRoleFromArgs(args) > Roles.operator
      },
    },
    fields: {
      sendMessageToTelegram: checkbox()
    }
  })

};
