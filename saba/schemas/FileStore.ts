import type { Lists } from '.keystone/types'
import type { Session } from '../data/types'
import { list } from '@keystone-6/core'
import { allOperations, allowAll } from '@keystone-6/core/access'
import { file, relationship, select, text, timestamp } from '@keystone-6/core/fields'
import { getRoleFromArgs, Roles } from '../data/types'
import { editIfAdmin } from '../data/utils'

export const FileStore = list<Lists.FileStore.TypeInfo<Session>>({
  access: allowAll,
  ui: {
    label: 'فایل ها',
    // isHidden: args =>  getRoleFromArgs(args) > Roles.operator,
  },
  hooks: {
    resolveInput(args) {
      if (args.operation === 'create' && !args.inputData.title) {
        args.resolvedData.title = args.resolvedData.file.filename || ''
      }

      return args.resolvedData
    },
  },
  fields: {
    title: text({
      label: 'عنوان',
      ui: {
        views: './src/custome-fields-view/relationship-file-title-viewer.tsx',
      },
    }),
    file: file({
      storage: 'file',
      ui: {
        views: './src/custome-fields-view/relationship-file-viewer.tsx',
      },
    }),
    type: select({
      options: [
        { value: 'image', label: 'تصویر' },
        { value: 'pdf', label: 'pdf' },
        { label: 'نقشه اتوکد', value: 'dwg' },
        { value: 'video', label: 'ویدیو' },
        { value: 'doc', label: 'doc' },
        { value: 'docx', label: 'docx' },
        { value: 'other', label: 'سایر' },
      ],
      type: 'string',
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: {
          fieldMode: (args) => {
            if (!args.item.type)
              return 'edit'
            return 'read'
          },
        },
      },
      hooks: {
        resolveInput(args) {
          try {
            const ext = args.resolvedData.file.filename?.toString().split('.').pop()
            if (ext) {
              const extType = ['png', 'jpg', 'jpeg', 'webp', 'gif'].includes(ext)
                ? 'image'
                : ['mp4', 'mov', 'avi', 'mkv'].includes(ext)
                    ? 'video'
                    : ['pdf', 'doc', 'docx', 'dwg'].includes(ext) ? ext : 'other'
              args.resolvedData.type = extType
            }
          }
          catch (error) {
            console.error(error)
          }
          return args.resolvedData.type
        },
      },
    }),
    statement: relationship({
      ui: {
        createView: {
          fieldMode: 'hidden',
        },
        itemView: {
          fieldMode(args) {
            return args.item.statementId ? 'read' : 'hidden'
          },
        },
      },
      ref: 'Statement.attachments',
    }),
    invoice: relationship({
      ui: {
        createView: {
          fieldMode: 'hidden',
        },
        itemView: {
          fieldMode(args) {
            return args.item.invoiceId ? 'read' : 'hidden'
          },
        },
      },
      ref: 'Invoice.attachments',
    }),
    contract: relationship({
      ref: 'Contract.attachments',
      ui: {
        itemView: {
          fieldMode(args) {
            return args.item.contractId ? 'read' : 'hidden'
          },
        },
      },
    }),
    createdAt: timestamp({
      label: 'تاریخ بارگذاری',
      defaultValue: { kind: 'now' },
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: {
          fieldPosition: 'sidebar',
          fieldMode: 'read',
        },
      },
    }),
    createdBy: relationship({
      ref: 'User',
      many: false,
      label: 'بارگذاری شده توسط',
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: {
          fieldMode(args) { return getRoleFromArgs(args) <= Roles.operator ? 'edit' : 'read' },
          fieldPosition: 'sidebar',
        },
      },
      hooks: {
        resolveInput(args) {
          if (args.operation === 'create') {
            const session = args.context.session
            args.resolvedData.createdBy = { connect: { id: session?.itemId } }
          }
          return args.resolvedData.createdBy
        },
      },
    }),
  },
})
