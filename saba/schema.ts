import { group, list } from "@keystone-6/core";
import { allOperations, allowAll } from "@keystone-6/core/access";
import {
  checkbox,
  text,
} from "@keystone-6/core/fields";

import type { Lists } from ".keystone/types";
import {
  ImageStore, Description, Approval, Payment, Constractor,
  FileStore, User, Category, Log, Note,
  Statement, StatementItem, Contract, Design,
  DailyReport, SafetyReport, Invoice, Row, Setting
} from "./schemas";
import { Roles, getRoleFromArgs } from "./data/types";

export const lists: Lists = {
  Approval, Description, Invoice, Row,
  Contract,
  Statement,
  StatementItem,
  Payment,
  ImageStore,


  Constractor,

  FileStore,



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
  Setting,
  Note

};
