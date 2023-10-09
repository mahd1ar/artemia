import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import {
  integer,
  relationship,
  select,
  text,
  timestamp,
} from "@keystone-6/core/fields";

export const MainMenu = list({
  access: allowAll,
  ui: {
    listView: {
      initialColumns: ["link", "en", "fa", "priority"],
    },
  },
  fields: {
    en: relationship({
      ref: "Resource",
      ui: {
        description: "english",
        displayMode: "cards",
        cardFields: ["title"],
        inlineCreate: { fields: ["title"] },
        inlineEdit: { fields: ["title"] },
        removeMode: "none",
      },
    }),
    fa: relationship({
      ref: "Resource",
      ui: {
        description: "english",
        displayMode: "cards",
        cardFields: ["title"],
        inlineCreate: { fields: ["title"] },
        inlineEdit: { fields: ["title"] },
        removeMode: "none",
      },
    }),
    link: text({ validation: { isRequired: true } }),
    priority: integer(),
  },
});
