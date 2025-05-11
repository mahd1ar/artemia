import type { Lists } from '.keystone/types'
import { list } from '@keystone-6/core'
import { allOperations } from '@keystone-6/core/access'
import { relationship, text } from '@keystone-6/core/fields'
import { isLoggedIn } from '../data/access'
import { getRoleFromArgs, Roles, type Session } from '../data/types'
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
      ref: 'Description',
      label: 'خارج از مصوبات',
    }),
    onGoing: relationship({
      ref: 'Description',
      label: 'جاری',
    }),
  },
})
