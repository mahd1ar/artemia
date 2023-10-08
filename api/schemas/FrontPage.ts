import { group, list } from "@keystone-6/core";
import { allowAll, allOperations } from "@keystone-6/core/access";
import { relationship, select, text, timestamp } from "@keystone-6/core/fields";
import { isAdmin } from "../data/access";

export const FrontPage = list({
  access: {
    operation: {
      ...allOperations(isAdmin),
      query: () => true,
    },
  },
  isSingleton: true,
  fields: {
    ...group({
      label: "hero section",
      fields: {
        hero_fa: relationship({
          ref: "Resource",
          label: "به فارسی",
          ui: {
            displayMode: "cards",
            cardFields: ["title", "content"],
            inlineCreate: { fields: ["title", "content"] },
            inlineEdit: { fields: ["title", "content"] },
            removeMode: "none",
          },
        }),

        hero_en: relationship({
          ref: "Resource",
          label: "in english",
          ui: {
            displayMode: "cards",
            cardFields: ["title", "content"],
            inlineCreate: { fields: ["title", "content"] },
            inlineEdit: { fields: ["title", "content"] },
            removeMode: "none",
          },
        }),
      },
    }),
    heroImage: relationship({
      ref: "ImageStore",
      ui: {
        displayMode: "cards",
        cardFields: ["image"],
        inlineCreate: { fields: ["image", "altText"] },
        inlineEdit: { fields: ["image", "altText"] },
      },
    }),

    ...group({
      label: "iranartemia Consortium",
      fields: {
        consortiumImages: relationship({
          ref: "ImageStore",
          many: true,
          ui: {
            labelField: "altText",
          },
        }),
        consortiumIntro_fa: relationship({
          ref: "Resource",
          label: "توضیحات کنسرسیوم به فارسی",
          ui: {
            displayMode: "cards",
            cardFields: ["title", "content"],
            inlineCreate: { fields: ["title", "content"] },
            inlineEdit: { fields: ["title", "content"] },
            removeMode: "none",
          },
        }),
        consortiumIntro_en: relationship({
          ref: "Resource",
          label: "introduction in english",
          ui: {
            displayMode: "cards",
            cardFields: ["title", "content"],
            inlineCreate: { fields: ["title", "content"] },
            inlineEdit: { fields: ["title", "content"] },
            removeMode: "none",
          },
        }),
        consortiumCEOSignatureImage: relationship({
          ref: "ImageStore",
          label: "امضای اقای هاشمی😎",
          ui: {
            labelField: "altText",
          },
        }),
      },
    }),

    ...group({
      label: "status section",
      fields: {
        statusTitleAndDescription_fa: relationship({
          ref: "Resource",
          label: "عنوان و توضیحات بخش آمار به زبان فارسی",
          ui: {
            displayMode: "cards",
            cardFields: ["title", "content"],
            inlineCreate: { fields: ["title", "content"] },
            inlineEdit: { fields: ["title", "content"] },
            removeMode: "none",
          },
        }),
        statusTitleAndDescription_en: relationship({
          ref: "Resource",
          label: "title and description in english",
          ui: {
            displayMode: "cards",
            cardFields: ["title", "content"],
            inlineCreate: { fields: ["title", "content"] },
            inlineEdit: { fields: ["title", "content"] },
            removeMode: "none",
          },
        }),
        statistics: relationship({
          ref: "Post",
          many: true,
          label: "statistics section relative category",
          ui: {
            description:
              'max 4 items: select relative posts with custom custom field name "PERCENTAGE"',
            labelField: "title",
          },
        }),

        introVideo: relationship({
          ref: "FileStore",
        }),
        introVideoTitle_en: relationship({
          ref: "Resource",
          label: "video title in english",
          ui: {
            displayMode: "cards",
            cardFields: ["title", "content"],
            inlineCreate: { fields: ["title", "content"] },
            inlineEdit: { fields: ["title", "content"] },
            removeMode: "none",
          },
        }),
        introVideoTitle_fa: relationship({
          ref: "Resource",
          label: "تیتر ویدو به زبان فارسی",
          ui: {
            displayMode: "cards",
            cardFields: ["title", "content"],
            inlineCreate: { fields: ["title", "content"] },
            inlineEdit: { fields: ["title", "content"] },
            removeMode: "none",
          },
        }),
      },
    }),

    sites: relationship({
      ref: "Category",
      label: "sites section relative category",
      ui: {
        description: "a category with 4 items",
        labelField: "slug",
      },
    }),

    features: relationship({
      ref: "Category",
      label: "features section relative category",
      ui: {
        description: "exacltly 8 items",
        labelField: "slug",
      },
    }),

    ...group({
      label: "testimonial section",
      fields: {
        testimonial_bg_image: relationship({
          ref: "ImageStore",
          ui: {
            labelField: "altText",
          },
        }),
        testimonial: relationship({
          ref: "Category",
          label: "testimonial section relative category",
          ui: {
            description:
              "a category with 4 posts containing a custom field named 'rank_en' and 'rank_fa' ",
            labelField: "slug",
          },
        }),
      },
    }),

    logos: relationship({
      ref: "ImageStore",
      many: true,
      ui: {
        description: "max 6 items",
        labelField: "altText",
      },
    }),
    ...group({
      label: "Blog section",
      fields: {
        blogTitleAndDescription_fa: relationship({
          ref: "Resource",
          ui: {
            displayMode: "cards",
            inlineCreate: {
              fields: ["title", "content"],
            },
            cardFields: ["title", "content"],
            inlineEdit: {
              fields: ["title", "content"],
            },
            removeMode: "none",
          },
        }),
        blogTitleAndDescription_en: relationship({
          ref: "Resource",
          ui: {
            displayMode: "cards",
            inlineCreate: {
              fields: ["title", "content"],
            },
            cardFields: ["title", "content"],
            inlineEdit: {
              fields: ["title", "content"],
            },
            removeMode: "none",
          },
        }),

        blog: relationship({
          ref: "Category",
          label: "testimonial section relative category",
          ui: {
            labelField: "slug",
          },
        }),
      },
    }),
  },
});
