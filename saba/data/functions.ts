import type { BaseListTypeInfo, FieldTypeFunc } from '@keystone-6/core/types'
import { json, relationship } from '@keystone-6/core/fields'
import { Roles, type tableRelationConfig } from './types'

export function parseTableRelationConfig(
  config: string,
): tableRelationConfig {
  const defaultConfig: tableRelationConfig = {
    type: 'Implemented',
  }

  try {
    const parsedConfig = JSON.parse(config) as tableRelationConfig
    return Object.assign({}, defaultConfig, parsedConfig)
  }
  catch {
    return defaultConfig
  }
}

export function changeLog<T extends BaseListTypeInfo>(itemTitle: keyof T['item']): FieldTypeFunc<T> {
  return json({
    ui: {
      createView: { fieldMode: 'hidden' },
      itemView: {
        fieldPosition: 'sidebar',
        fieldMode(args) {
          if (args.session?.data.role === Roles.admin)
            return 'read'
          else
            return 'hidden'
        },
      },
      views: './src/custome-fields-view/changelog-view.tsx',
    },
    hooks: {
      async afterOperation(args) {
        if (args.operation === 'delete') {
          const title = args.originalItem[itemTitle] as string
          const resource = args.listKey
          await args.context.prisma.log.create({
            data: {
              type: 'info',
              action: 'DELETE_RESOURCE',
              message: `${resource} "${title}" deleted`,
              date: new Date(),
              user: {
                connect: {
                  id: args.context.session?.itemId,
                },
              },
            },
          })
        }
      },
      resolveInput(args) {
        const changeLog = args.item?.changeLog as string | null | undefined

        const state = (changeLog) ? JSON.parse(changeLog || '[]') : []

        const info = {
          ops: args.operation,
          items: Object.keys(args.inputData),
          by: args.context.session?.itemId,
          at: new Date(),
        }

        state.push(info)

        return JSON.stringify(state)
      },
    },
  })
}

export function createdBy<T extends BaseListTypeInfo>(): FieldTypeFunc<T> {
  return relationship({
    ref: 'User',
    many: false,
    ui: {
      createView: { fieldMode: 'hidden' },
      itemView: {
        fieldMode(args) {
          const referer = args.context.req?.headers.referer
          if (referer) {
            const reff = new URL(referer)
            const dbg = reff.searchParams.get('dbg')

            if (dbg !== null && args.session?.data.role === Roles.admin) {
              return 'edit'
            }
          }

          return 'read'
        },
        fieldPosition: 'sidebar',
      },
    },
    hooks: {
      resolveInput(args) {
        if (args.operation === 'create') {
          const session = args.context.session
          args.resolvedData = {
            ...args.resolvedData,
            createdBy: { connect: { id: session?.itemId } },
          }
        }
        return args.resolvedData.createdBy
      },
    },
  })
}
