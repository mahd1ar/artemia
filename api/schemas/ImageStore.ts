import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text, timestamp, image } from "@keystone-6/core/fields";

export const ImageStore = list({
    access: allowAll,
    ui: {
        listView: {
            initialSort: {
                field: 'createdAt',
                direction: 'DESC'
            }
        }
    },
    hooks: {
        resolveInput(args) {
            // TODO review this shit
            if (args.inputData.altText !== undefined || args?.item?.altText !== undefined)
                return args.resolvedData;

            if (!args.resolvedData.altText && args.resolvedData.image.filename)
                args.resolvedData.altText = args.resolvedData.image.filename;

            return args.resolvedData;
        },
    },
    fields: {
        image: image({
            storage: 'image',
        }),
        altText: text({
            label: 'name'
        }),
        createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    },
})