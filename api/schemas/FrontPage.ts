import { group, list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { relationship, select, text, timestamp } from "@keystone-6/core/fields";

export const FrontPage = list({
  access: allowAll,
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
    ...group({
      label: "sites section",
      fields: {
        sites: relationship({
          ref: "Resource",
          many: true,
          ui: {
            description: "exacltly 4 items",
            displayMode: "cards",
            cardFields: ["title", "featuredImage"],
            inlineCreate: { fields: ["title", "featuredImage"] },
          },
        }),
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
      // many: true,
      // ui: {
      //   description: "exacltly 8 items",
      //   displayMode: "cards",
      //   cardFields: ["title", "featuredImage", "bannerImage"],
      //   inlineCreate: { fields: ["title", "featuredImage", "bannerImage"] },
      // },
    }),


    logos: relationship({
      ref: 'ImageStore', many: true, ui: {
        description: 'max 6 items',
        labelField: 'altText'
      }
    }),

  },
});
