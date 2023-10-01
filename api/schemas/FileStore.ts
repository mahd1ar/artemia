import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text, timestamp, file } from "@keystone-6/core/fields";

export const FileStore = list({
    access: allowAll,
    hooks: {
        resolveInput(args) {
            console.log(args.resolvedData)
            if (!args.resolvedData.title && args.resolvedData.file.filename)
                args.resolvedData.title = args.resolvedData.file.filename

            return args.resolvedData
        },
    },
    fields: {
        title: text({
            label: 'name'
        }),
        file: file({
            storage: 'file',
        }),
        createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    },
})