import type { Lists } from '.keystone/types'
import { list } from '@keystone-6/core'
import { allOperations } from '@keystone-6/core/access'
import { relationship, text } from '@keystone-6/core/fields'
import { isLoggedIn } from '../data/access'
import { Roles, type Session } from '../data/types'
import { setPermitions } from '../data/utils'

export const Project = list<Lists.Project.TypeInfo<Session>>({
  access: {
    operation: {
      ...allOperations(isLoggedIn),
    },
  },

  hooks: {

    beforeOperation: async (args) => {
      const originalItem = args.item?.id

      if (args.operation === 'delete' && originalItem) {
        const sudo = args.context.sudo()

        const children = await sudo.query.Category.findMany({
          where: {
            parent: {
              id: {
                equals: originalItem,
              },
            },
          },
          query: 'id',
        })

        await sudo.query.Category.deleteMany({
          where: children,
        })
      }
    },

    afterOperation: async (args) => {
      if (args.operation === 'create') {
        const prisma = args.context.prisma
        const itemid = args.item.id
        const itemTitle = args.item.title

        await prisma.project.update({
          where: { id: itemid },
          data: {
            onGoing: {
              create: {
                title: `جاری ${itemTitle}`,
              },
            },
            outside: {
              create: {
                title: `خارج از مصوبات ${itemTitle}`,
              },
            },
          },
        })
      }
    },

    validate(args) {
      if (args.operation === 'create') {
        const { title } = args.inputData

        if (!title) {
          args.addValidationError('عنوان پروژه را وارد کنید')
        }
      }
    },

  },
  ui: {
    label: 'پروژه‌ها',
    itemView: {
      defaultFieldMode(args) {
        return setPermitions(
          args,
          [
            { role: Roles.admin, fieldMode: 'edit' },
            { role: Roles.operator, fieldMode: 'edit' },
            { role: Roles.supervisor, fieldMode: 'edit' },
          ],
          'read',
        )
      },
    },
  },

  fields: {

    title: text({
      validation: { isRequired: true },
      label: 'عنوان',
    }),
    description: text({ ui: { displayMode: 'textarea' } }),

    approvals: relationship({
      ref: 'Approval.project',
      many: true,
      label: '  مصوبات',
    }),
    outside: relationship({
      ui: {
        itemView: {
          fieldMode: 'edit',
        },
        createView: {
          fieldMode: 'hidden',
        },
        views: './src/custome-fields-view/list-relationship.tsx',
      },
      ref: 'Description.fromOutsideProject',
      label: 'خارج از مصوبات',
    }),
    onGoing: relationship({
      ui: {
        itemView: {
          fieldMode: 'edit',
        },
        createView: {
          fieldMode: 'hidden',
        },

        views: './src/custome-fields-view/list-relationship.tsx',
      },
      ref: 'Description.fromOnGoingProject',
      label: 'جاری',
    }),
  },

})
