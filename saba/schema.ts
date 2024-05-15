import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import {
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
  Statement, StatementItem, Contract, Design, DailyReport
} from "./schemas";

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
  Design, DailyReport,

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

};
