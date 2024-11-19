import type { Lists } from '.keystone/types'
import type { Session } from '../data/types'
import { list } from '@keystone-6/core'
import { allOperations } from '@keystone-6/core/access'
import { json, relationship, select, text, timestamp } from '@keystone-6/core/fields'
import { isAdmin, isLoggedIn } from '../data/access'

export const Note = list<Lists.Note.TypeInfo<Session>>({
  access: {
    operation: allOperations(isLoggedIn),
    item: {
      update: (args) => {
        if (isAdmin(args))
          return true
        return args.item.createdById === args.context.session?.itemId
      },
      delete: (args) => {
        if (isAdmin(args))
          return true

        return args.item.createdById === args.context.session?.itemId
      },
    },
  },
  hooks: {
    afterOperation(args) {
      if (args.operation === 'create') {
        console.log('sendData')
        if (args.inputData.mentions && args.inputData.mentions.length) {
          console.log('sending to...', JSON.parse(args.inputData.mentions))
        }
      }
    },
  },
  fields: {

    message: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    mentions: json({

    }),
    invoice: relationship({
      ref: 'Invoice.notes',
    }),
    statement: relationship({
      ref: 'Statement.notes',
    }),
    createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    updatedAt: timestamp({
      hooks: {
        resolveInput(args) {
          if (args.operation === 'update') {
            return new Date()
          }

          return args.resolvedData.updatedAt
        },
      },
    }),
    createdBy: relationship({
      ref: 'User',
      hooks: {
        resolveInput(args) {
          if (args.operation === 'create')
            return { connect: { id: args.context.session?.itemId } }

          return args.resolvedData.createdBy
        },
      },
    }),
  },
})
