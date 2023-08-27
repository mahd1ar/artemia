// Welcome to your schema
//   Schema driven development is Keystone's modus operandi
//
// This file is where we define the lists, fields and hooks for our data.
// If you want to learn more about how lists are configured, please read
// - https://keystonejs.com/docs/config/lists

import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';

// see https://keystonejs.com/docs/fields/overview for the full list of fields
//   this is a few common fields for an example
import {
  text,
  relationship,
  password,
  timestamp,
  select,
  image,
} from '@keystone-6/core/fields';


import type { Lists } from '.keystone/types';
import { PostTranslation, Post, FrontPage } from './schemas'
// ListConfig<Lists.User.TypeInfo<any>, any>
// ListConfig<BaseListTypeInfo, BaseFields<BaseListTypeInfo>>
export const lists: Lists = {
  User: list({
    access: allowAll,

    fields: {
      name: text({ validation: { isRequired: true } }),

      email: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
      }),
      password: password({ validation: { isRequired: true } }),
      posts: relationship({ ref: 'PostTranslation.author', many: true }),
      createdAt: timestamp({
        defaultValue: { kind: 'now' },
      }),
    },
  }),

  Post,
  PostTranslation,
  FrontPage,
  Resource: list({
    access: allowAll,
    fields: {
      title: text(),
      content: text(),
      featuredImage: image({
        storage: 'image'
      }),
      bannerImage: image({
        storage: 'image'
      }),
      misc: text(),
      createdAt: timestamp({
        defaultValue: { kind: 'now' },
      })
    }
  }) ,

  Tag: list({

    access: allowAll,
    ui: {
      isHidden: true,
    },
    fields: {
      name: text(),
      posts: relationship({ ref: 'PostTranslation.tags', many: true }),
    },
  }),
};
