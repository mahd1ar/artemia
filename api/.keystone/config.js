"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_path = require("path");
var import_core5 = require("@keystone-6/core");

// schema.ts
var import_core4 = require("@keystone-6/core");
var import_access4 = require("@keystone-6/core/access");
var import_fields4 = require("@keystone-6/core/fields");

// schemas/Post.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");
var Post = (0, import_core.list)({
  access: import_access.allowAll,
  fields: {
    title: (0, import_fields.text)({ validation: { isRequired: true } }),
    type: (0, import_fields.select)({
      options: ["post", "page"],
      defaultValue: "en",
      ui: { displayMode: "segmented-control" },
      type: "string",
      validation: { isRequired: true }
    }),
    en: (0, import_fields.relationship)({
      ref: "PostTranslation"
      // ui: {
      //     inlineCreate: {
      //         fields: ['title', 'language', 'content']
      //     },
      //     displayMode: 'cards',
      //     createView: {
      //         fieldMode: 'edit'
      //     },
      //     cardFields: ['title', 'language'],
      //     inlineConnect: true
      // }
    }),
    fa: (0, import_fields.relationship)({ ref: "PostTranslation" }),
    createdAt: (0, import_fields.timestamp)({
      defaultValue: { kind: "now" }
    })
  }
});

// schemas/PostTranslation.ts
var import_core2 = require("@keystone-6/core");
var import_access2 = require("@keystone-6/core/access");
var import_fields2 = require("@keystone-6/core/fields");
var import_fields_document = require("@keystone-6/fields-document");
var PostTranslation = (0, import_core2.list)({
  access: import_access2.allowAll,
  fields: {
    parent: (0, import_fields2.relationship)({
      ref: "Post",
      ui: {
        // hideCreate: true
      }
    }),
    language: (0, import_fields2.select)({
      options: ["en", "fa"],
      defaultValue: "en",
      ui: {
        displayMode: "segmented-control",
        itemView: {
          fieldPosition: "sidebar"
        }
      },
      type: "string"
    }),
    title: (0, import_fields2.text)({ validation: { isRequired: true } }),
    content: (0, import_fields_document.document)({
      formatting: true,
      layouts: [
        [1, 1],
        [1, 1, 1],
        [2, 1],
        [1, 2],
        [1, 2, 1]
      ],
      links: true,
      dividers: true
    }),
    // with this field, you can set a User as the author for a Post
    author: (0, import_fields2.relationship)({
      // we could have used 'User', but then the relationship would only be 1-way
      ref: "User.posts",
      // this is some customisations for changing how this will look in the AdminUI
      ui: {
        displayMode: "cards",
        cardFields: ["name", "email"],
        inlineEdit: { fields: ["name", "email"] },
        linkToItem: true,
        inlineConnect: true
      },
      many: false
    }),
    tags: (0, import_fields2.relationship)({
      ref: "Tag.posts",
      many: true,
      ui: {
        displayMode: "cards",
        cardFields: ["name"],
        inlineEdit: { fields: ["name"] },
        linkToItem: true,
        inlineConnect: true,
        inlineCreate: { fields: ["name"] }
      }
    }),
    createdAt: (0, import_fields2.timestamp)({
      defaultValue: { kind: "now" },
      ui: {
        itemView: {
          fieldMode: "hidden"
        }
      }
    })
  }
});

// schemas/FrontPage.ts
var import_core3 = require("@keystone-6/core");
var import_access3 = require("@keystone-6/core/access");
var import_fields3 = require("@keystone-6/core/fields");
var FrontPage = (0, import_core3.list)({
  access: import_access3.allowAll,
  isSingleton: true,
  fields: {
    headline: (0, import_fields3.text)({ validation: { isRequired: true } })
  }
});

// schema.ts
var lists = {
  User: (0, import_core4.list)({
    access: import_access4.allowAll,
    fields: {
      name: (0, import_fields4.text)({ validation: { isRequired: true } }),
      email: (0, import_fields4.text)({
        validation: { isRequired: true },
        isIndexed: "unique"
      }),
      password: (0, import_fields4.password)({ validation: { isRequired: true } }),
      posts: (0, import_fields4.relationship)({ ref: "PostTranslation.author", many: true }),
      createdAt: (0, import_fields4.timestamp)({
        defaultValue: { kind: "now" }
      })
    }
  }),
  Post,
  PostTranslation,
  FrontPage,
  Tag: (0, import_core4.list)({
    access: import_access4.allowAll,
    ui: {
      isHidden: true
    },
    fields: {
      name: (0, import_fields4.text)(),
      posts: (0, import_fields4.relationship)({ ref: "PostTranslation.tags", many: true })
    }
  })
};

// auth.ts
var import_crypto = require("crypto");
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && process.env.NODE_ENV !== "production") {
  sessionSecret = (0, import_crypto.randomBytes)(32).toString("hex");
}
console.log(sessionSecret);
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  sessionData: "name createdAt",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"]
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// keystone.ts
require("dotenv").config({
  override: true,
  path: (0, import_path.resolve)(
    process.cwd(),
    process.env.NODE_ENV === "production" ? ".env" : `.env.dev`
  )
});
var keystone_default = withAuth(
  (0, import_core5.config)({
    db: {
      // we're using sqlite for the fastest startup experience
      //   for more information on what database might be appropriate for you
      //   see https://keystonejs.com/docs/guides/choosing-a-database#title
      provider: "sqlite",
      url: "file:./keystone.db"
    },
    server: {
      port: 3032
    },
    lists,
    session
  })
);
//# sourceMappingURL=config.js.map
