import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import {
  checkbox,
  image,
  relationship,
  text,
  timestamp,
  virtual,
} from "@keystone-6/core/fields";
import { graphql } from "@graphql-ts/schema";

export const Category = list({
  access: allowAll,
  ui: {
    listView: {
      initialColumns: ["slug", "url"],
    },
  },
  fields: {
    slug: text({
      validation: {
        isRequired: true,
      },
    }),
    url: virtual({
      field: graphql.field({
        type: graphql.String,
        async resolve(item, args, context) {
          const { id, noUI } = item as unknown as { id: string; noUI: boolean };
          return noUI
            ? "cannot show into UI"
            : `${process.env.FRONTENDURL}/category/${id}`;
        },
      }),
    }),
    image: relationship({
      ref: "ImageStore",
      ui: {
        itemView: {
          fieldMode: "hidden",
        },
        labelField: "altText",
      },
    }),
    en: relationship({
      label: "title in english",
      ref: "Resource",
      ui: {
        description: "title in english",
        displayMode: "cards",
        cardFields: ["title", "content"],
        inlineCreate: { fields: ["title", "content"] },
        inlineConnect: {
          labelField: "title",
          searchFields: ["title", "content"],
        },
      },
    }),
    fa: relationship({
      label: "تیتر فارسی",
      ref: "Resource",
      ui: {
        description: "تیتر فارسی",
        displayMode: "cards",
        cardFields: ["title", "content"],
        inlineCreate: { fields: ["title", "content"] },
        inlineEdit: { fields: ["title", "content"] },
        inlineConnect: {
          labelField: "title",
          searchFields: ["title", "content"],
        },
      },
    }),

    noUI: checkbox({ defaultValue: false }),

    posts: relationship({
      ref: "Post.category",
      many: true,
    }),

    createdAt: timestamp({
      defaultValue: { kind: "now" },
      ui: {
        itemView: {
          fieldMode: "hidden",
        },
      },
    }),
  },
});
