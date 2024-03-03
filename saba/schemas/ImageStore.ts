import { graphql, list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text, timestamp, image, virtual } from "@keystone-6/core/fields";

export const ImageStore = list({
  access: allowAll,
  ui: {
    listView: {
      initialSort: {
        field: "createdAt",
        direction: "DESC",
      },
      initialColumns: ["image", "altText", "createdAt", "id"],
    },
  },
  hooks: {
    resolveInput(args) {
      // TODO review this shit
      if (
        args.inputData.altText !== undefined ||
        args?.item?.altText !== undefined
      )
        return args.resolvedData;

      if (!args.resolvedData.altText && args.resolvedData.image.filename)
        args.resolvedData.altText = args.resolvedData.image.filename;

      return args.resolvedData;
    },
  },
  fields: {
    url: virtual({
      field: graphql.field({
        type: graphql.String,
        async resolve(item, args, context) {
          const { image_extension, image_id } = item as unknown as { image_extension: string; image_id: string };

          return `${process.env.PUBLICURL}/image/${image_id}.${image_extension}`
        },
      }),
    }),
    image: image({
      storage: "image",
    }),
    altText: text({
      label: "name",
    }),
    createdAt: timestamp({ defaultValue: { kind: "now" } }),
  },
});
