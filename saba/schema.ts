// Welcome to your schema
//   Schema driven development is Keystone's modus operandi
//
// This file is where we define the lists, fields and hooks for our data.
// If you want to learn more about how lists are configured, please read
// - https://keystonejs.com/docs/config/lists

import { list } from "@keystone-6/core";
import { allowAll, allOperations } from "@keystone-6/core/access";

// see https://keystonejs.com/docs/fields/overview for the full list of fields
//   this is a few common fields for an example
import {
  text,
  relationship,
  password,
  timestamp,
  select,
} from "@keystone-6/core/fields";

import type { Lists } from ".keystone/types";
import {
  ImageStore,
  Description,
  Approval,
  Payment,
  DescriptionOfApproval,
  Constractor,
  FileStore, User, Category,
  Statement, StatementItem, Contract, Design
} from "./schemas";
import { Roles, Session, enumToArrayOfKeyValue } from "./data/types";
import { isAdmin } from "./data/access";
import axios from 'axios'
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
  DescriptionOfApproval,
  // @ts-ignore
  Constractor,
  // @ts-ignore
  FileStore,
  // @ts-ignore
  Contract,

  // @ts-ignore
  Design,

  // @ts-ignore
  User, Category,
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
