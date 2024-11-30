import type { Lists } from '.keystone/types'
import type { Session } from '../data/types'
import { list } from '@keystone-6/core'
import { allOperations } from '@keystone-6/core/access'
import { json, relationship, select, text, timestamp } from '@keystone-6/core/fields'
import axios from 'axios'
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
    async afterOperation(args) {
      const splitedUrl = (args.context.res?.req.headers.referer)?.split('/')

      if (!splitedUrl)
        return

      const resource = splitedUrl?.at(-2)
      const id = splitedUrl?.at(-1)

      if (args.operation === 'create') {
        const { mentions } = args.inputData

        if (!mentions)
          return

        if (typeof mentions !== 'string')
          return

        let mentionsArray: string[] = []

        try {
          mentionsArray = JSON.parse(mentions) as string[]

          if (!Array.isArray(mentionsArray))
            throw new Error('Mentions must be an array')

          if (mentionsArray.length && mentionsArray.length > 0) {
            if (typeof mentionsArray[0] !== 'string')
              throw new Error('Mentions must be an array of strings')
          }
        }
        catch (error) {
          console.error(error)
          return
        }

        if (mentionsArray && mentionsArray.length) {
          const prisma = args.context.prisma

          const users = await prisma.user.findMany({
            where: {
              id: {
                in: mentionsArray,
              },
            },
            select: {
              id: true,
              name: true,
              phone: true,
            },
          })

          users.forEach(async (user) => {
            if (user.phone) {
              try {
                const response = await axios.post('http://ippanel.com/api/select', {
                  op: 'pattern',
                  user: 'omid30',
                  pass: 'oh3383717',
                  fromNum: '3000505',
                  toNum: String(user.phone),
                  patternCode: 'disi35jl5jnf0d1',
                  inputData: [
                    { resource },
                    { name: user.name },
                    { id },
                  ],
                })
                console.log(response)
                if (Boolean(Number(response.data)) === false) {
                  // error
                  throw new Error(String(response.data))
                }
              }
              catch (error) {
                console.error('!! error sending sms')
                console.error(error)
              }
            }
          })
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
