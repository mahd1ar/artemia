import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { image, relationship, text, timestamp } from "@keystone-6/core/fields";

export const Resource = list({
    access: allowAll,
    fields: {
        title: text(),
        content: text(),
        featuredImage: relationship({
            ref: 'ImageStore',
        }),
        bannerImage: relationship({
            ref: 'ImageStore',
        }),
        misc: text(),
        createdAt: timestamp({
            defaultValue: { kind: 'now' },
        })
    }
});