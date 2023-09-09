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

// storage.ts
var storage = {
  file: {
    // Images that use this store will be stored on the local machine
    kind: "local",
    // This store is used for the image field type
    type: "file",
    // The URL that is returned in the Keystone GraphQL API
    generateUrl: (path) => `${process.env.PUBLICURL}/files${path}`,
    // The route that will be created in Keystone's backend to serve the images
    serverRoute: {
      path: "/files"
    },
    storagePath: "public/files"
  },
  image: {
    kind: "local",
    type: "image",
    generateUrl: (path) => `${process.env.PUBLICURL}/image${path}`,
    serverRoute: {
      path: "/image"
    },
    storagePath: "public/images"
  }
};

// keystone.ts
var import_core7 = require("@keystone-6/core");

// schema.ts
var import_core6 = require("@keystone-6/core");
var import_access6 = require("@keystone-6/core/access");
var import_fields6 = require("@keystone-6/core/fields");

// schemas/Post.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");
var Post = (0, import_core.list)({
  access: import_access.allowAll,
  hooks: {
    async beforeOperation(args) {
      const { faId, enId } = args.item;
      console.log(args.resolvedData?.fa);
      if (faId) {
        if (args.resolvedData?.fa?.disconnect) {
          const sudoContext = args.context.sudo();
          await sudoContext.query.PostTranslation.deleteOne({
            where: {
              id: faId
            }
          });
          sudoContext.exitSudo();
        }
      }
      if (enId) {
        if (args.resolvedData?.en?.disconnect) {
          const sudoContext = args.context.sudo();
          await sudoContext.query.PostTranslation.deleteOne({
            where: {
              id: enId
            }
          });
          sudoContext.exitSudo();
        }
      }
    }
  },
  fields: {
    title: (0, import_fields.text)({ validation: { isRequired: true } }),
    featuredImage: (0, import_fields.relationship)({
      ref: "ImageStore",
      label: "\u0627\u0646\u062A\u062E\u0627\u0628 \u0639\u06A9\u0633 \u0634\u0627\u062E\u0635",
      ui: {
        displayMode: "cards",
        cardFields: ["altText", "image"],
        inlineCreate: { fields: ["altText", "image"] },
        inlineConnect: true
      }
    }),
    type: (0, import_fields.select)({
      options: ["post", "page"],
      defaultValue: "en",
      ui: {
        displayMode: "segmented-control",
        itemView: {
          fieldPosition: "sidebar"
        }
      },
      type: "string",
      validation: { isRequired: true }
    }),
    category: (0, import_fields.select)({
      options: ["blog"],
      defaultValue: "blog",
      type: "string",
      ui: {
        itemView: {
          fieldPosition: "sidebar"
        },
        createView: {
          fieldMode: "hidden"
        }
      }
    }),
    en: (0, import_fields.relationship)({
      label: "post in english",
      ref: "PostTranslation",
      ui: {
        inlineCreate: {
          fields: ["title", "language", "content"]
        },
        displayMode: "cards",
        createView: {
          fieldMode: "edit"
        },
        cardFields: ["title", "language"],
        inlineConnect: true
      }
    }),
    fa: (0, import_fields.relationship)({
      label: " \u0645\u0637\u0644\u0628 \u0628\u0647 \u0641\u0627\u0631\u0633\u06CC",
      ref: "PostTranslation",
      ui: {
        inlineCreate: {
          fields: ["title", "language", "content"]
        },
        displayMode: "cards",
        createView: {
          fieldMode: "edit"
        },
        cardFields: ["title", "language"],
        inlineConnect: true
      }
    }),
    createdAt: (0, import_fields.timestamp)({
      defaultValue: { kind: "now" },
      ui: {
        itemView: {
          fieldPosition: "sidebar"
        }
      }
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
    headline: (0, import_fields3.text)({ validation: { isRequired: true } }),
    ...(0, import_core3.group)({
      label: "hero section",
      fields: {
        heroTitle: (0, import_fields3.text)({
          label: "Title"
        }),
        heroDescription: (0, import_fields3.text)({
          label: "Description",
          ui: { displayMode: "textarea" }
        }),
        heroImage: (0, import_fields3.relationship)({
          ref: "ImageStore",
          ui: {
            displayMode: "cards",
            cardFields: ["image"],
            inlineCreate: { fields: ["image"] }
          }
        })
      }
    }),
    ...(0, import_core3.group)({
      label: "status section",
      fields: {
        statusTitle: (0, import_fields3.text)({
          label: "Title"
        }),
        statusDescription: (0, import_fields3.text)({
          label: "Description",
          ui: { displayMode: "textarea" }
        }),
        statistics: (0, import_fields3.relationship)({
          ref: "Resource",
          many: true,
          ui: {
            description: "max 4 items",
            displayMode: "cards",
            cardFields: ["title", "content", "misc"],
            inlineCreate: { fields: ["title", "content", "misc"] }
          }
        })
      }
    }),
    ...(0, import_core3.group)({
      label: "sites section",
      fields: {
        sites: (0, import_fields3.relationship)({
          ref: "Resource",
          many: true,
          ui: {
            description: "exacltly 4 items",
            displayMode: "cards",
            cardFields: ["title", "featuredImage"],
            inlineCreate: { fields: ["title", "featuredImage"] }
          }
        })
      }
    }),
    ...(0, import_core3.group)({
      label: "features section",
      fields: {
        featuresTitle: (0, import_fields3.text)({
          label: "Title"
        }),
        featuresDescription: (0, import_fields3.text)({
          label: "Description"
        }),
        features: (0, import_fields3.relationship)({
          ref: "Resource",
          many: true,
          ui: {
            description: "exacltly 8 items",
            displayMode: "cards",
            cardFields: ["title", "content", "featuredImage"],
            inlineCreate: {
              fields: ["title", "content", "featuredImage"]
            }
          }
        })
      }
    }),
    ...(0, import_core3.group)({
      label: "testimonial section",
      fields: {
        testimonial: (0, import_fields3.relationship)({
          ref: "Resource",
          many: true,
          ui: {
            description: "exacltly 8 items",
            displayMode: "cards",
            cardFields: ["title", "featuredImage", "bannerImage"],
            inlineCreate: { fields: ["title", "featuredImage", "bannerImage"] }
          }
        })
      }
    }),
    ...(0, import_core3.group)({
      label: "Blog",
      fields: {
        BlogTitle: (0, import_fields3.text)({
          label: "title"
        }),
        BlogDescription: (0, import_fields3.text)({
          label: "description"
        })
      }
    })
  }
});

// schemas/ImageStore.ts
var import_core4 = require("@keystone-6/core");
var import_access4 = require("@keystone-6/core/access");
var import_fields4 = require("@keystone-6/core/fields");
var ImageStore = (0, import_core4.list)({
  access: import_access4.allowAll,
  fields: {
    image: (0, import_fields4.image)({
      storage: "image"
    }),
    altText: (0, import_fields4.text)({ label: "name" }),
    createdAt: (0, import_fields4.timestamp)({ defaultValue: { kind: "now" } })
  }
});

// schemas/Resource.ts
var import_core5 = require("@keystone-6/core");
var import_access5 = require("@keystone-6/core/access");
var import_fields5 = require("@keystone-6/core/fields");
var Resource = (0, import_core5.list)({
  access: import_access5.allowAll,
  fields: {
    title: (0, import_fields5.text)(),
    content: (0, import_fields5.text)(),
    featuredImage: (0, import_fields5.relationship)({
      ref: "ImageStore"
    }),
    bannerImage: (0, import_fields5.relationship)({
      ref: "ImageStore"
    }),
    misc: (0, import_fields5.text)(),
    createdAt: (0, import_fields5.timestamp)({
      defaultValue: { kind: "now" }
    })
  }
});

// schema.ts
var lists = {
  User: (0, import_core6.list)({
    access: import_access6.allowAll,
    ui: {
      isHidden() {
        return process.env.NODE_ENV === "production";
      }
    },
    fields: {
      name: (0, import_fields6.text)({ validation: { isRequired: true } }),
      email: (0, import_fields6.text)({
        validation: { isRequired: true },
        isIndexed: "unique"
      }),
      password: (0, import_fields6.password)({ validation: { isRequired: true } }),
      posts: (0, import_fields6.relationship)({ ref: "PostTranslation.author", many: true }),
      createdAt: (0, import_fields6.timestamp)({
        defaultValue: { kind: "now" }
      })
    }
  }),
  // @ts-ignore
  Post,
  // @ts-ignore
  PostTranslation,
  // @ts-ignore
  FrontPage,
  // @ts-ignore
  ImageStore,
  // @ts-ignore
  Resource,
  Tag: (0, import_core6.list)({
    access: import_access6.allowAll,
    ui: {
      isHidden: true
    },
    fields: {
      name: (0, import_fields6.text)(),
      posts: (0, import_fields6.relationship)({ ref: "PostTranslation.tags", many: true })
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
    process.env.NODE_ENV === "production" ? ".env" : `.dev.env`
  )
});
var keystone_default = withAuth(
  (0, import_core7.config)({
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
    session,
    storage
  })
);
//# sourceMappingURL=config.js.map
