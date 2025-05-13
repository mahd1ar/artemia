import type { BaseListTypeInfo, FieldTypeFunc } from '@keystone-6/core/types'
import { json } from '@keystone-6/core/fields'
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
