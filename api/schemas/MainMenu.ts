import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { relationship, select, text, timestamp } from "@keystone-6/core/fields";

export const MainMenu = list({
    access: allowAll,

    fields: {
        en:  relationship({
            ref: "Resource",
            ui: {
              description: "english",
              displayMode: "cards",
              cardFields: ["title", "content", ],
              inlineCreate: { fields: ["title", "content"] },
            },
          }),
        fa:  relationship({
            ref: "Resource",
            ui: {
              description: "english",
              displayMode: "cards",
              cardFields: ["title", "content", ],
              inlineCreate: { fields: ["title", "content"] },
            },
          }),
        link: text({validation: { isRequired: true }})
        
    },
})