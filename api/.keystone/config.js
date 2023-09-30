"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
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
var import_core12 = require("@keystone-6/core");

// schema.ts
var import_core11 = require("@keystone-6/core");
var import_access11 = require("@keystone-6/core/access");
var import_fields11 = require("@keystone-6/core/fields");

// schemas/Post.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");
var Post = (0, import_core.list)({
  access: import_access.allowAll,
  hooks: {
    async beforeOperation({ item, operation, context, resolvedData }) {
      if (operation !== "delete")
        return;
      const { faId, enId } = item;
      if (faId) {
        if (resolvedData?.fa?.disconnect) {
          const sudoContext = context.sudo();
          await sudoContext.query.PostTranslation.deleteOne({
            where: {
              id: faId
            }
          });
          sudoContext.exitSudo();
        }
      }
      if (enId) {
        if (resolvedData?.en?.disconnect) {
          const sudoContext = context.sudo();
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
    title: (0, import_fields.text)({
      validation: { isRequired: true },
      label: "post title for operator"
    }),
    featuredImage: (0, import_fields.relationship)({
      ref: "ImageStore",
      label: "\u0627\u0646\u062A\u062E\u0627\u0628 \u0639\u06A9\u0633 \u0634\u0627\u062E\u0635",
      many: false,
      ui: {
        displayMode: "cards",
        cardFields: ["altText", "image"],
        inlineCreate: { fields: ["altText", "image"] },
        inlineConnect: true
      }
    }),
    type: (0, import_fields.select)({
      options: ["post", "page"],
      defaultValue: "post",
      ui: {
        displayMode: "segmented-control",
        itemView: {
          fieldPosition: "sidebar"
        }
      },
      type: "string",
      validation: { isRequired: true }
    }),
    category: (0, import_fields.relationship)({
      ref: "Category.posts",
      many: true,
      ui: {
        labelField: "slug"
      }
    }),
    en: (0, import_fields.relationship)({
      label: "post in english",
      ref: "PostTranslation",
      ui: {
        inlineCreate: {
          fields: ["title", "content"]
        },
        inlineEdit: {
          fields: ["title", "content"]
        },
        displayMode: "cards",
        createView: {
          fieldMode: "edit"
        },
        cardFields: ["title", "content"],
        inlineConnect: true
      }
    }),
    fa: (0, import_fields.relationship)({
      label: " \u0645\u0637\u0644\u0628 \u0628\u0647 \u0641\u0627\u0631\u0633\u06CC",
      ref: "PostTranslation",
      ui: {
        inlineCreate: {
          fields: ["title", "content"]
        },
        inlineEdit: {
          fields: ["title", "content"]
        },
        displayMode: "cards",
        createView: {
          fieldMode: "edit"
        },
        cardFields: ["title", "content"],
        inlineConnect: true
      }
    }),
    misc: (0, import_fields.relationship)({
      ref: "KeyValue",
      label: "custom fields",
      many: true,
      ui: {
        displayMode: "cards",
        cardFields: ["key", "value"],
        inlineCreate: {
          fields: ["key", "value"]
        },
        inlineEdit: {
          fields: ["key", "value"]
        }
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
var import_schema = require("@graphql-ts/schema");
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
    excerpt: (0, import_fields2.virtual)({
      field: import_schema.graphql.field({
        type: import_schema.graphql.String,
        async resolve(item, args, context) {
          const { content } = item;
          let excerpt = "";
          function loop(data) {
            Object.keys(data).forEach((i) => {
              if (i === "text")
                excerpt += " " + data[i];
              if (typeof data[i] === "object")
                loop(data[i]);
            });
          }
          if (content) {
            loop(
              typeof content === "string" ? JSON.parse(content) : content
            );
            excerpt = excerpt.split(/\s+/g).filter(Boolean).splice(0, 45).join(" ");
          }
          return excerpt;
        }
      })
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
        hero_fa: (0, import_fields3.relationship)({
          ref: "Resource",
          label: "\u0628\u0647 \u0641\u0627\u0631\u0633\u06CC",
          ui: {
            displayMode: "cards",
            cardFields: ["title", "content"],
            inlineCreate: { fields: ["title", "content"] },
            inlineEdit: { fields: ["title", "content"] },
            removeMode: "none"
          }
        }),
        hero_en: (0, import_fields3.relationship)({
          ref: "Resource",
          label: "in english",
          ui: {
            displayMode: "cards",
            cardFields: ["title", "content"],
            inlineCreate: { fields: ["title", "content"] },
            inlineEdit: { fields: ["title", "content"] },
            removeMode: "none"
          }
        })
      }
    }),
    heroImage: (0, import_fields3.relationship)({
      ref: "ImageStore",
      ui: {
        displayMode: "cards",
        cardFields: ["image"],
        inlineCreate: { fields: ["image", "altText"] },
        inlineEdit: { fields: ["image", "altText"] }
      }
    }),
    ...(0, import_core3.group)({
      label: "status section",
      fields: {
        statusTitleAndDescription_fa: (0, import_fields3.relationship)({
          ref: "Resource",
          label: "\u0639\u0646\u0648\u0627\u0646 \u0648 \u062A\u0648\u0636\u06CC\u062D\u0627\u062A \u0628\u062E\u0634 \u0622\u0645\u0627\u0631 \u0628\u0647 \u0632\u0628\u0627\u0646 \u0641\u0627\u0631\u0633\u06CC",
          ui: {
            displayMode: "cards",
            cardFields: ["title", "content"],
            inlineCreate: { fields: ["title", "content"] },
            inlineEdit: { fields: ["title", "content"] },
            removeMode: "none"
          }
        }),
        statusTitleAndDescription_en: (0, import_fields3.relationship)({
          ref: "Resource",
          label: "title and description in english",
          ui: {
            displayMode: "cards",
            cardFields: ["title", "content"],
            inlineCreate: { fields: ["title", "content"] },
            inlineEdit: { fields: ["title", "content"] },
            removeMode: "none"
          }
        }),
        statistics: (0, import_fields3.relationship)({
          ref: "Post",
          many: true,
          label: "statistics section relative category",
          ui: {
            description: 'max 4 items: select relative posts with custom custom field name "PERCENTAGE"',
            labelField: "title"
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
    features: (0, import_fields3.relationship)({
      ref: "Category",
      label: "features section relative category",
      ui: {
        description: "exacltly 8 items",
        labelField: "slug"
      }
    }),
    testimonial: (0, import_fields3.relationship)({
      ref: "Category",
      label: "testimonial section relative category",
      ui: {
        labelField: "slug"
      }
      // many: true,
      // ui: {
      //   description: "exacltly 8 items",
      //   displayMode: "cards",
      //   cardFields: ["title", "featuredImage", "bannerImage"],
      //   inlineCreate: { fields: ["title", "featuredImage", "bannerImage"] },
      // },
    }),
    logos: (0, import_fields3.relationship)({
      ref: "ImageStore",
      many: true,
      ui: {
        description: "max 6 items",
        labelField: "altText"
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
    altText: (0, import_fields4.text)({
      label: "name"
    }),
    createdAt: (0, import_fields4.timestamp)({ defaultValue: { kind: "now" } })
  }
});

// schemas/Resource.ts
var import_core5 = require("@keystone-6/core");
var import_access5 = require("@keystone-6/core/access");
var import_fields5 = require("@keystone-6/core/fields");
var Resource = (0, import_core5.list)({
  access: import_access5.allowAll,
  ui: {
    isHidden: process.env.NODE_ENV === "production"
  },
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

// schemas/MainMenu.ts
var import_core6 = require("@keystone-6/core");
var import_access6 = require("@keystone-6/core/access");
var import_fields6 = require("@keystone-6/core/fields");
var MainMenu = (0, import_core6.list)({
  access: import_access6.allowAll,
  fields: {
    en: (0, import_fields6.relationship)({
      ref: "Resource",
      ui: {
        description: "english",
        displayMode: "cards",
        cardFields: ["title"],
        inlineCreate: { fields: ["title"] },
        inlineEdit: { fields: ["title"] },
        removeMode: "none"
      }
    }),
    fa: (0, import_fields6.relationship)({
      ref: "Resource",
      ui: {
        description: "english",
        displayMode: "cards",
        cardFields: ["title"],
        inlineCreate: { fields: ["title"] },
        inlineEdit: { fields: ["title"] },
        removeMode: "none"
      }
    }),
    link: (0, import_fields6.text)({ validation: { isRequired: true } })
  }
});

// schemas/ContactUs.ts
var import_core7 = require("@keystone-6/core");
var import_access7 = require("@keystone-6/core/access");
var import_fields7 = require("@keystone-6/core/fields");
var import_fields_document2 = require("@keystone-6/fields-document");
var ContactUs = (0, import_core7.list)({
  access: import_access7.allowAll,
  isSingleton: true,
  fields: {
    aboutUs: (0, import_fields_document2.document)({
      label: "about us (english)",
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
    aboutFa: (0, import_fields_document2.document)({
      label: "\u062F\u0631\u0628\u0627\u0631\u0647 \u06CC \u0645\u0627 (\u0641\u0627\u0631\u0633\u06CC)",
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
    shortDescription: (0, import_fields7.text)({
      label: "short description (english)",
      ui: {
        displayMode: "textarea"
      }
    }),
    shortDescriptionFa: (0, import_fields7.text)({
      label: "\u062A\u0648\u0636\u06CC\u062D \u06A9\u0648\u062A\u0627\u0647 (\u0641\u0627\u0631\u0633\u06CC)",
      ui: {
        displayMode: "textarea"
      }
    }),
    tel: (0, import_fields7.text)(),
    telegram: (0, import_fields7.text)(),
    whatsapp: (0, import_fields7.text)(),
    instagram: (0, import_fields7.text)(),
    email: (0, import_fields7.text)(),
    address: (0, import_fields7.text)({
      label: "address (english)",
      ui: {
        displayMode: "textarea"
      }
    }),
    addressFa: (0, import_fields7.text)({
      label: "\u0627\u0653\u062F\u0631\u0633 (\u0641\u0627\u0631\u0633\u06CC)",
      ui: {
        displayMode: "textarea"
      }
    }),
    bale: (0, import_fields7.text)(),
    ...(0, import_core7.group)({
      label: "lat&long",
      fields: {
        lat: (0, import_fields7.text)(),
        long: (0, import_fields7.text)()
      }
    })
  }
});

// schemas/Category.ts
var import_core8 = require("@keystone-6/core");
var import_access8 = require("@keystone-6/core/access");
var import_fields8 = require("@keystone-6/core/fields");
var import_schema2 = require("@graphql-ts/schema");
var Category = (0, import_core8.list)({
  access: import_access8.allowAll,
  ui: {
    isHidden: process.env.NODE_ENV === "production"
  },
  fields: {
    slug: (0, import_fields8.text)({
      validation: {
        isRequired: true
      }
    }),
    url: (0, import_fields8.virtual)({
      field: import_schema2.graphql.field({
        type: import_schema2.graphql.String,
        async resolve(item, args, context) {
          const { id } = item;
          return `${process.env.FRONTENDURL}/category/${id}`;
        }
      })
    }),
    image: (0, import_fields8.relationship)({
      ref: "ImageStore",
      ui: {
        itemView: {
          fieldMode: "hidden"
        },
        labelField: "altText"
      }
    }),
    en: (0, import_fields8.relationship)({
      label: "title in english",
      ref: "Resource",
      ui: {
        description: "title in english",
        displayMode: "cards",
        cardFields: ["title", "content"],
        inlineCreate: { fields: ["title", "content"] },
        inlineConnect: {
          labelField: "title",
          searchFields: ["title", "content"]
        }
      }
    }),
    fa: (0, import_fields8.relationship)({
      label: "\u062A\u06CC\u062A\u0631 \u0641\u0627\u0631\u0633\u06CC",
      ref: "Resource",
      ui: {
        description: "\u062A\u06CC\u062A\u0631 \u0641\u0627\u0631\u0633\u06CC",
        displayMode: "cards",
        cardFields: ["title", "content"],
        inlineCreate: { fields: ["title", "content"] },
        inlineEdit: { fields: ["title", "content"] },
        inlineConnect: {
          labelField: "title",
          searchFields: ["title", "content"]
        }
      }
    }),
    posts: (0, import_fields8.relationship)({
      ref: "Post.category",
      many: true
    }),
    createdAt: (0, import_fields8.timestamp)({
      defaultValue: { kind: "now" },
      ui: {
        itemView: {
          fieldMode: "hidden"
        }
      }
    })
  }
});

// schemas/Order.ts
var import_core9 = require("@keystone-6/core");
var import_access9 = require("@keystone-6/core/access");
var import_fields9 = require("@keystone-6/core/fields");
var Order = (0, import_core9.list)({
  access: import_access9.allowAll,
  fields: {
    orderType: (0, import_fields9.json)(),
    orderContent: (0, import_fields9.text)({
      ui: {
        displayMode: "textarea"
      }
    }),
    customerName: (0, import_fields9.text)(),
    customer: (0, import_fields9.relationship)({
      ref: "Customer.orders"
    }),
    createdAt: (0, import_fields9.timestamp)({
      defaultValue: { kind: "now" }
    })
  }
});

// schemas/Customer.ts
var import_core10 = require("@keystone-6/core");
var import_access10 = require("@keystone-6/core/access");
var import_fields10 = require("@keystone-6/core/fields");
var Customer = (0, import_core10.list)({
  access: import_access10.allowAll,
  fields: {
    name: (0, import_fields10.text)({
      ui: {
        itemView: {
          fieldMode: "read"
        }
      }
    }),
    tel: (0, import_fields10.text)({
      ui: {
        itemView: {
          fieldMode: "read"
        }
      }
    }),
    postalCode: (0, import_fields10.text)({
      ui: {
        itemView: {
          fieldMode: "read"
        }
      }
    }),
    address: (0, import_fields10.text)({
      ui: {
        itemView: {
          fieldMode: "read"
        }
      }
    }),
    city: (0, import_fields10.text)({
      ui: {
        itemView: {
          fieldMode: "read"
        }
      }
    }),
    code: (0, import_fields10.text)({
      ui: {
        itemView: {
          fieldMode: "read"
        }
      }
    }),
    orders: (0, import_fields10.relationship)({
      ref: "Order.customer",
      many: true
      // ui: {
      //   displayMode: "cards",
      //   cardFields: ["orderContent", "orderType"],
      // itemView: {
      //   fieldMode: "read",
      // },
      // },
    }),
    createdAt: (0, import_fields10.timestamp)({
      defaultValue: { kind: "now" }
    })
  }
});

// schema.ts
var lists = {
  User: (0, import_core11.list)({
    access: import_access11.allowAll,
    ui: {
      isHidden() {
        return process.env.NODE_ENV === "production";
      }
    },
    fields: {
      name: (0, import_fields11.text)({ validation: { isRequired: true } }),
      email: (0, import_fields11.text)({
        validation: { isRequired: true },
        isIndexed: "unique"
      }),
      password: (0, import_fields11.password)({ validation: { isRequired: true } }),
      posts: (0, import_fields11.relationship)({ ref: "PostTranslation.author", many: true }),
      createdAt: (0, import_fields11.timestamp)({
        defaultValue: { kind: "now" }
      })
    }
  }),
  KeyValue: (0, import_core11.list)({
    access: import_access11.allowAll,
    ui: {
      isHidden: process.env.NODE_ENV === "production"
    },
    fields: {
      key: (0, import_fields11.text)({ label: "custom field name", validation: { isRequired: true } }),
      value: (0, import_fields11.text)({ validation: { isRequired: true } }),
      createdAt: (0, import_fields11.timestamp)({
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
  // @ts-ignore
  MainMenu,
  // @ts-ignore
  ContactUs,
  // @ts-ignore
  Category,
  // @ts-ignore
  Customer,
  // @ts-ignore
  Order,
  Tag: (0, import_core11.list)({
    access: import_access11.allowAll,
    ui: {
      isHidden: true
    },
    fields: {
      name: (0, import_fields11.text)(),
      posts: (0, import_fields11.relationship)({ ref: "PostTranslation.tags", many: true })
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
var import_client = require("@prisma/client");
var import_body_parser = __toESM(require("body-parser"));
require("dotenv").config({
  override: true,
  path: (0, import_path.resolve)(
    process.cwd(),
    process.env.NODE_ENV === "production" ? ".env" : `.dev.env`
  )
});
var keystone_default = withAuth(
  (0, import_core12.config)({
    db: {
      // we're using sqlite for the fastest startup experience
      //   for more information on what database might be appropriate for you
      //   see https://keystonejs.com/docs/guides/choosing-a-database#title
      provider: "sqlite",
      url: "file:./keystone.db"
    },
    server: {
      cors: {
        origin: [process.env.FRONTENDURL],
        credentials: true
      },
      extendExpressApp(app, context) {
        app.get("/test", async (req, res) => {
          res.json({
            message: "hello world",
            ok: false
          });
        });
        app.use(import_body_parser.default.json());
        app.post("/placeorder", async (req, res) => {
          const {
            address,
            code,
            tel,
            city,
            postalCode,
            orderContent,
            orderType,
            id,
            fullname
          } = req.body;
          const prisma = new import_client.PrismaClient();
          try {
            if (!id) {
              const customer = await prisma.customer.create({
                data: {
                  name: fullname,
                  address,
                  city,
                  code,
                  tel,
                  postalCode,
                  orders: {
                    create: {
                      orderContent,
                      orderType: orderType ? JSON.stringify(orderType) : ""
                    }
                  }
                },
                include: {
                  orders: true
                }
              });
              console.log(customer);
              res.json({
                message: "successuly placed order",
                payload: {
                  customerid: customer.id,
                  orderid: customer.orders[0].id
                }
              });
            } else {
              const order = await prisma.order.create({
                data: {
                  orderContent,
                  customer: {
                    connect: {
                      id
                    }
                  }
                }
              });
              res.json({
                message: "successuly placed order",
                payload: {
                  orderid: order.id
                }
              });
            }
          } catch (error) {
            console.error(error);
            res.status(500).json({
              message: "error",
              payload: error
            });
          } finally {
            await prisma.$disconnect();
          }
        });
      },
      maxFileSize: 1024e6,
      port: 3032
    },
    lists,
    session,
    storage
  })
);
//# sourceMappingURL=config.js.map
