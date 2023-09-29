import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text, timestamp, image } from "@keystone-6/core/fields";

export const ImageStore = list({
    access: allowAll,
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