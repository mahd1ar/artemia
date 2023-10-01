import { group, list } from "@keystone-6/core";
import { allowAll, allOperations } from "@keystone-6/core/access";
import { relationship, select, text, timestamp } from "@keystone-6/core/fields";
import { isAdmin } from "../data/access";

export const FrontPage = list({
  access: {
    operation: {
      ...allOperations(isAdmin),
      query: () => true
    }
  },
  isSingleton: true,
  fields: {

    headline: text({ validation: { isRequired: true } }),


    ...group({
      label: "hero section",
      fields: {
        hero_fa: relationship({
          ref: 'Resource',
          label: 'به فارسی',
          ui: {
            displayMode: "cards",
            cardFields: ["title", "content",],
            inlineCreate: { fields: ["title", "content",] },
            inlineEdit: { fields: ["title", "content",] },
            removeMode: 'none',
          }
        }),

        hero_en: relationship({
          ref: 'Resource',
          label: 'in english',
          ui: {
            displayMode: "cards",
            cardFields: ["title", "content",],
            inlineCreate: { fields: ["title", "content",] },
            inlineEdit: { fields: ["title", "content",] },
            removeMode: 'none',
          }
        }),
      }
    }),
    heroImage: relationship({
      ref: "ImageStore",
      ui: {
        displayMode: "cards",
        cardFields: ["image"],
        inlineCreate: { fields: ["image", 'altText'] },
        inlineEdit: { fields: ["image", 'altText'] },
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
            cardFields: ["title", "content",],
            inlineCreate: { fields: ["title", "content",] },
            inlineEdit: { fields: ["title", "content",] },
            removeMode: 'none',
          }
        })
        ,
        statusTitleAndDescription_en: relationship({
          ref: "Resource",
          label: "title and description in english",
          ui: {
            displayMode: "cards",
            cardFields: ["title", "content",],
            inlineCreate: { fields: ["title", "content",] },
            inlineEdit: { fields: ["title", "content",] },
            removeMode: 'none',
          }
        }),
        statistics: relationship({
          ref: "Post",
          many: true,
          label: "statistics section relative category",
          ui: {
            description: "max 4 items: select relative posts with custom custom field name \"PERCENTAGE\"",
            labelField: 'title',
          }
        }),

        introVideo: relationship({
          ref: "FileStore"
        })
      },
    }),


    sites: relationship({
      ref: "Category",
      label: "features section relative category",
      ui: {
        description: "exacltly 8 items",
        labelField: 'slug',
      },
    }),

    features: relationship({
      ref: "Category",
      label: "features section relative category",
      ui: {
        description: "exacltly 8 items",
        labelField: 'slug',
      },
    }),

    testimonial: relationship({
      ref: "Category",
      label: 'testimonial section relative category',
      ui: {
        labelField: 'slug',
      }
    }),

    logos: relationship({
      ref: 'ImageStore', many: true, ui: {
        description: 'max 6 items',
        labelField: 'altText'
      }
    }),
    ...group({
      label: 'blog section',
      fields: {
        blogTitleAndDescription_fa: relationship({
          ref: 'Resource',
          ui: {
            displayMode: 'cards',
            inlineCreate: {
              fields: ['title', 'content']
            },
            cardFields: ['title', 'content'],
            inlineEdit: {
              fields: ['title', 'content']
            },
            removeMode: 'none'
          }
        }),
        blogTitleAndDescription_en: relationship({
          ref: 'Resource',
          ui: {
            displayMode: 'cards',
            inlineCreate: {
              fields: ['title', 'content']
            },
            cardFields: ['title', 'content'],
            inlineEdit: {
              fields: ['title', 'content']
            },
            removeMode: 'none'
          }
        }),

        blog: relationship({
          ref: "Category",
          label: 'testimonial section relative category',
          ui: {
            labelField: 'slug',
          }
        }),
      }
    })

  },
});
