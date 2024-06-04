import { list } from "@keystone-6/core";
import { allOperations, allowAll } from "@keystone-6/core/access";
import { text, timestamp, file, relationship } from "@keystone-6/core/fields";
import { editIfAdmin } from "../data/utils";
import { Session } from "../data/types";

export const FileStore = list({
  access: allowAll,
  ui: {
    label: 'file',
    isHidden: true,
  },
  hooks: {
    resolveInput(args) {

      if (args.operation === 'create' && !args.inputData.title) {

        args.resolvedData.title = args.resolvedData.file.filename;
      }

      return args.resolvedData;
    },
  },
  fields: {
    title: text({
      label: "name",
    }),
    file: file({
      storage: "file",
      ui: {
        views: './src/custome-fields-view/relationship-file-viewer.tsx'
      }
    }),
    statement: relationship({
      ref: 'Statement.attachments'
    }),
    createdAt: timestamp({
      defaultValue: { kind: "now" },
      ui: {
        createView: { fieldMode: "hidden" },

      }
    }),
    createdBy: relationship({
      ref: "User",
      many: false,
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: {
          fieldMode(args) { return editIfAdmin(args) },
          fieldPosition: 'sidebar'
        }
      },
      hooks: {
        resolveInput(args) {
          if (args.operation === 'create') {
            const session = args.context.session as Session
            args.resolvedData.createdBy = { connect: { id: session?.itemId } }
          }
          return args.resolvedData.createdBy
        },
      }
    }),
  },
});
