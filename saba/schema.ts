import type { Lists } from '.keystone/types'
import { group, list } from '@keystone-6/core'
import { allOperations, allowAll } from '@keystone-6/core/access'

import {
  checkbox,
  text,
} from '@keystone-6/core/fields'
import { getRoleFromArgs, Roles } from './data/types'
import {
  Approval,
  Category,
  Constractor,
  Contract,
  DailyReport,
  Description,
  Design,
  FileStore,
  ImageStore,
  Invoice,
  Log,
  Note,
  Payment,
  PaymentItem,
  Project,
  Row,
  SafetyReport,
  Setting,
  Statement,
  User,
} from './schemas'

export const lists: Lists = {
  Project,
  Approval,
  Description,
  Invoice,
  Row,
  Contract,
  Statement,
  Payment,
  PaymentItem,
  ImageStore,

  Constractor,

  FileStore,

  Design,
  DailyReport,
  SafetyReport,

  // @ts-ignore
  User,
  Category,
  Log,
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
  Note,

}
