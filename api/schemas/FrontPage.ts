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
        heroTitle: text({
          label: "Title",
        }),
        heroDescription: text({
          label: "Description",
          ui: { displayMode: "textarea" },
        }),
        heroImage: relationship({
          ref: "Resource",
          ui: {
            displayMode: "cards",
            cardFields: ["title", "featuredImage"],
            inlineCreate: { fields: ["title", "featuredImage"] },
          },
        }),
      },
    }),
    ...group({
      label: "status section",
      fields: {
        statusTitle: text({
          label: "Title",
        }),
        statusDescription: text({
          label: "Description",
          ui: { displayMode: "textarea" },
        }),
        statistics: relationship({
          ref: "Resource",
          many: true,
          ui: {
            description: "max 4 items",
            displayMode: "cards",
            cardFields: ["title", "content", "misc"],
            inlineCreate: { fields: ["title", "content", "misc"] },
          },
        }),
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
    ...group({
      label: "features section",
      fields: {
        featuresTitle: text({
          label: "Title",
        }),
        featuresDescription: text({
          label: "Description",
        }),

        features: relationship({
          ref: "Resource",
          many: true,
          ui: {
            description: "exacltly 8 items",
            displayMode: "cards",
            cardFields: ["title", "content", "featuredImage"],
            inlineCreate: {
              fields: ["title", "content", "featuredImage"],
            },
          },
        }),
      },
    }),
    ...group({
      label: "testimonial section",
      fields: {
        testimonial: relationship({
          ref: "Resource",
          many: true,
          ui: {
            description: "exacltly 8 items",
            displayMode: "cards",
            cardFields: ["title", "featuredImage" ,"bannerImage"],
            inlineCreate: { fields: ["title", "featuredImage","bannerImage"] },
          },
        }),
      },
    }),
  },
});
