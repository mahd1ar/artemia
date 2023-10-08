/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    query topMenu {\n      mainMenus {\n        id\n        link\n        priority\n        en {\n          title\n          content\n        }  \n        fa {\n          title\n          content\n        }\n      }\n      contactUs {\n        email\n        instagram\n        tel\n        telegram\n        whatsapp\n        bale\n        address\n        addressFa\n        shortDescription\n        shortDescriptionFa\n      }\n    }\n": types.TopMenuDocument,
    "\nquery Blogs($isEn: Boolean!) {\n  categories (where: {\n    slug: {equals: \"blog\"}\n  }) {\n    id\n    slug\n    en @include(if: $isEn){\n      content\n      title\n    }\n    fa @skip(if: $isEn) {\n      content\n      title\n    }\n    posts {\n      id\n      featuredImage {\n        image {\n          url\n        }\n      }\n      en @include(if: $isEn){\n        id\n        title\n        excerpt\n      }\n      fa @skip(if: $isEn) {\n        id\n        title\n        excerpt\n      }\n      createdAt\n    }\n  }\n}\n": types.BlogsDocument,
    "\nquery CategoryByID($id: ID!,$isEn: Boolean!) {\n  category(where: {\n    id: $id\n  }) {\n    id\n    slug\n    en @include(if: $isEn){\n      content\n      title\n    }\n    fa @skip(if: $isEn) {\n      content\n      title\n    }\n    posts {\n      id\n      featuredImage {\n        image {\n          url\n        }\n      }\n      en @include(if: $isEn){\n        title\n        excerpt\n      }\n      fa @skip(if: $isEn) {\n        title\n        excerpt\n      }\n    }\n  }\n}\n": types.CategoryByIdDocument,
    "\nquery contactUs($isEn: Boolean!) {\n  contactUs {\n    aboutFa @skip(if: $isEn) {\n      document\n    }\n    aboutUs @include(if: $isEn) {\n      document\n    }\n    address\n    addressFa\n    bale\n    email\n    instagram\n    lat\n    long\n    telegram\n    whatsapp\n  }\n}": types.ContactUsDocument,
    "\nquery HomePage( $isEn: Boolean!) {\n  frontPage {\n     meta_en @include(if: $isEn) {\n      title\n      content\n    }\n    meta_fa @skip(if: $isEn) {\n      title\n      content\n    }\n     hero_en @include(if: $isEn) {\n      title\n      content\n    }\n    hero_fa @skip(if: $isEn) {\n      title\n      content\n    }\n    heroImage {\n      altText\n      id\n      image {\n        id\n        url\n      }\n    }\n    consortiumImages {\n      id\n      image {\n        id\n        url\n      }\n    }\n    consortiumIntro_en @include(if: $isEn) {\n      title\n      content\n    }\n    consortiumIntro_fa @skip(if: $isEn) {\n      title\n      content\n    }\n    consortiumCEOSignatureImage {\n      id\n      image {\n        id\n        url\n      }\n    }\n    statusTitleAndDescription_fa @skip(if: $isEn) {\n      title\n      content\n    }\n    statusTitleAndDescription_en @include(if: $isEn) {\n      title\n      content\n    }\n    statistics {\n      id\n      title\n      en @include(if: $isEn) {\n        title\n        content {\n          document\n        }\n      }\n      fa @skip(if: $isEn) {\n        title\n        content {\n          document\n        }\n      }\n      misc {\n        id\n        key\n        value\n      }\n    }\n    introVideo {\n      file {\n        url\n      }\n    }\n    introVideoTitle_en @include(if: $isEn) {\n      title\n      content\n    }\n    introVideoTitle_fa @skip(if: $isEn) {\n      title\n      content\n    }\n    sites {\n      posts {\n        fa @skip(if: $isEn) {\n          id\n          title\n          excerpt\n        }\n        en @include(if: $isEn){\n          id\n          title\n          excerpt\n        }\n        featuredImage {\n          id\n          image {\n            id\n            url\n          }\n        }\n      }\n    }\n    features {\n      posts {\n        fa @skip(if: $isEn) {\n          id\n          title\n          excerpt\n        }\n        en @include(if: $isEn) {\n          id\n          title\n          excerpt\n        }\n        featuredImage {\n          id\n          image {\n            id\n            url\n          }\n        }\n      }\n    }\n    testimonial {\n      posts {\n        fa @skip(if: $isEn) {\n          id\n          title\n          excerpt\n        }\n        en @include(if: $isEn) {\n          id\n          title\n          excerpt\n        }\n        featuredImage {\n          id\n          image {\n            id\n            url\n          }\n        }\n        misc {\n          key\n          value\n        }\n      }\n    }\n    testimonial_bg_image {\n      id\n      altText\n      image {\n        url\n        id\n        url\n      }\n    }\n    logos {\n      id\n      altText\n      image {\n        url\n      }\n    }\n    blogTitleAndDescription_en @include(if: $isEn) {\n      title\n      content\n    }\n    blogTitleAndDescription_fa @skip(if: $isEn) {\n      title\n      content\n    }\n    blog {\n      posts {\n        id\n        featuredImage {\n          id\n          image {\n            id\n            url\n          }\n        }\n        fa @skip(if: $isEn) {\n          title\n          excerpt\n        }\n        en @include(if: $isEn) {\n          title\n          excerpt\n        }\n      }\n    }\n  }\n}\n": types.HomePageDocument,
    "\nquery PostFull($where: PostWhereUniqueInput!, $isEn: Boolean!) {\n  post(where: $where) {\n    id\n    createdAt\n    featuredImage {\n      altText\n      image {\n        url\n      }\n    }\n    en @include(if: $isEn) {\n      title\n      content {\n        document\n      }\n    }\n    fa @skip(if: $isEn) {\n      title\n      content {\n        document\n      }\n    }\n  }\n}\n": types.PostFullDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query topMenu {\n      mainMenus {\n        id\n        link\n        priority\n        en {\n          title\n          content\n        }  \n        fa {\n          title\n          content\n        }\n      }\n      contactUs {\n        email\n        instagram\n        tel\n        telegram\n        whatsapp\n        bale\n        address\n        addressFa\n        shortDescription\n        shortDescriptionFa\n      }\n    }\n"): (typeof documents)["\n    query topMenu {\n      mainMenus {\n        id\n        link\n        priority\n        en {\n          title\n          content\n        }  \n        fa {\n          title\n          content\n        }\n      }\n      contactUs {\n        email\n        instagram\n        tel\n        telegram\n        whatsapp\n        bale\n        address\n        addressFa\n        shortDescription\n        shortDescriptionFa\n      }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery Blogs($isEn: Boolean!) {\n  categories (where: {\n    slug: {equals: \"blog\"}\n  }) {\n    id\n    slug\n    en @include(if: $isEn){\n      content\n      title\n    }\n    fa @skip(if: $isEn) {\n      content\n      title\n    }\n    posts {\n      id\n      featuredImage {\n        image {\n          url\n        }\n      }\n      en @include(if: $isEn){\n        id\n        title\n        excerpt\n      }\n      fa @skip(if: $isEn) {\n        id\n        title\n        excerpt\n      }\n      createdAt\n    }\n  }\n}\n"): (typeof documents)["\nquery Blogs($isEn: Boolean!) {\n  categories (where: {\n    slug: {equals: \"blog\"}\n  }) {\n    id\n    slug\n    en @include(if: $isEn){\n      content\n      title\n    }\n    fa @skip(if: $isEn) {\n      content\n      title\n    }\n    posts {\n      id\n      featuredImage {\n        image {\n          url\n        }\n      }\n      en @include(if: $isEn){\n        id\n        title\n        excerpt\n      }\n      fa @skip(if: $isEn) {\n        id\n        title\n        excerpt\n      }\n      createdAt\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery CategoryByID($id: ID!,$isEn: Boolean!) {\n  category(where: {\n    id: $id\n  }) {\n    id\n    slug\n    en @include(if: $isEn){\n      content\n      title\n    }\n    fa @skip(if: $isEn) {\n      content\n      title\n    }\n    posts {\n      id\n      featuredImage {\n        image {\n          url\n        }\n      }\n      en @include(if: $isEn){\n        title\n        excerpt\n      }\n      fa @skip(if: $isEn) {\n        title\n        excerpt\n      }\n    }\n  }\n}\n"): (typeof documents)["\nquery CategoryByID($id: ID!,$isEn: Boolean!) {\n  category(where: {\n    id: $id\n  }) {\n    id\n    slug\n    en @include(if: $isEn){\n      content\n      title\n    }\n    fa @skip(if: $isEn) {\n      content\n      title\n    }\n    posts {\n      id\n      featuredImage {\n        image {\n          url\n        }\n      }\n      en @include(if: $isEn){\n        title\n        excerpt\n      }\n      fa @skip(if: $isEn) {\n        title\n        excerpt\n      }\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery contactUs($isEn: Boolean!) {\n  contactUs {\n    aboutFa @skip(if: $isEn) {\n      document\n    }\n    aboutUs @include(if: $isEn) {\n      document\n    }\n    address\n    addressFa\n    bale\n    email\n    instagram\n    lat\n    long\n    telegram\n    whatsapp\n  }\n}"): (typeof documents)["\nquery contactUs($isEn: Boolean!) {\n  contactUs {\n    aboutFa @skip(if: $isEn) {\n      document\n    }\n    aboutUs @include(if: $isEn) {\n      document\n    }\n    address\n    addressFa\n    bale\n    email\n    instagram\n    lat\n    long\n    telegram\n    whatsapp\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery HomePage( $isEn: Boolean!) {\n  frontPage {\n     meta_en @include(if: $isEn) {\n      title\n      content\n    }\n    meta_fa @skip(if: $isEn) {\n      title\n      content\n    }\n     hero_en @include(if: $isEn) {\n      title\n      content\n    }\n    hero_fa @skip(if: $isEn) {\n      title\n      content\n    }\n    heroImage {\n      altText\n      id\n      image {\n        id\n        url\n      }\n    }\n    consortiumImages {\n      id\n      image {\n        id\n        url\n      }\n    }\n    consortiumIntro_en @include(if: $isEn) {\n      title\n      content\n    }\n    consortiumIntro_fa @skip(if: $isEn) {\n      title\n      content\n    }\n    consortiumCEOSignatureImage {\n      id\n      image {\n        id\n        url\n      }\n    }\n    statusTitleAndDescription_fa @skip(if: $isEn) {\n      title\n      content\n    }\n    statusTitleAndDescription_en @include(if: $isEn) {\n      title\n      content\n    }\n    statistics {\n      id\n      title\n      en @include(if: $isEn) {\n        title\n        content {\n          document\n        }\n      }\n      fa @skip(if: $isEn) {\n        title\n        content {\n          document\n        }\n      }\n      misc {\n        id\n        key\n        value\n      }\n    }\n    introVideo {\n      file {\n        url\n      }\n    }\n    introVideoTitle_en @include(if: $isEn) {\n      title\n      content\n    }\n    introVideoTitle_fa @skip(if: $isEn) {\n      title\n      content\n    }\n    sites {\n      posts {\n        fa @skip(if: $isEn) {\n          id\n          title\n          excerpt\n        }\n        en @include(if: $isEn){\n          id\n          title\n          excerpt\n        }\n        featuredImage {\n          id\n          image {\n            id\n            url\n          }\n        }\n      }\n    }\n    features {\n      posts {\n        fa @skip(if: $isEn) {\n          id\n          title\n          excerpt\n        }\n        en @include(if: $isEn) {\n          id\n          title\n          excerpt\n        }\n        featuredImage {\n          id\n          image {\n            id\n            url\n          }\n        }\n      }\n    }\n    testimonial {\n      posts {\n        fa @skip(if: $isEn) {\n          id\n          title\n          excerpt\n        }\n        en @include(if: $isEn) {\n          id\n          title\n          excerpt\n        }\n        featuredImage {\n          id\n          image {\n            id\n            url\n          }\n        }\n        misc {\n          key\n          value\n        }\n      }\n    }\n    testimonial_bg_image {\n      id\n      altText\n      image {\n        url\n        id\n        url\n      }\n    }\n    logos {\n      id\n      altText\n      image {\n        url\n      }\n    }\n    blogTitleAndDescription_en @include(if: $isEn) {\n      title\n      content\n    }\n    blogTitleAndDescription_fa @skip(if: $isEn) {\n      title\n      content\n    }\n    blog {\n      posts {\n        id\n        featuredImage {\n          id\n          image {\n            id\n            url\n          }\n        }\n        fa @skip(if: $isEn) {\n          title\n          excerpt\n        }\n        en @include(if: $isEn) {\n          title\n          excerpt\n        }\n      }\n    }\n  }\n}\n"): (typeof documents)["\nquery HomePage( $isEn: Boolean!) {\n  frontPage {\n     meta_en @include(if: $isEn) {\n      title\n      content\n    }\n    meta_fa @skip(if: $isEn) {\n      title\n      content\n    }\n     hero_en @include(if: $isEn) {\n      title\n      content\n    }\n    hero_fa @skip(if: $isEn) {\n      title\n      content\n    }\n    heroImage {\n      altText\n      id\n      image {\n        id\n        url\n      }\n    }\n    consortiumImages {\n      id\n      image {\n        id\n        url\n      }\n    }\n    consortiumIntro_en @include(if: $isEn) {\n      title\n      content\n    }\n    consortiumIntro_fa @skip(if: $isEn) {\n      title\n      content\n    }\n    consortiumCEOSignatureImage {\n      id\n      image {\n        id\n        url\n      }\n    }\n    statusTitleAndDescription_fa @skip(if: $isEn) {\n      title\n      content\n    }\n    statusTitleAndDescription_en @include(if: $isEn) {\n      title\n      content\n    }\n    statistics {\n      id\n      title\n      en @include(if: $isEn) {\n        title\n        content {\n          document\n        }\n      }\n      fa @skip(if: $isEn) {\n        title\n        content {\n          document\n        }\n      }\n      misc {\n        id\n        key\n        value\n      }\n    }\n    introVideo {\n      file {\n        url\n      }\n    }\n    introVideoTitle_en @include(if: $isEn) {\n      title\n      content\n    }\n    introVideoTitle_fa @skip(if: $isEn) {\n      title\n      content\n    }\n    sites {\n      posts {\n        fa @skip(if: $isEn) {\n          id\n          title\n          excerpt\n        }\n        en @include(if: $isEn){\n          id\n          title\n          excerpt\n        }\n        featuredImage {\n          id\n          image {\n            id\n            url\n          }\n        }\n      }\n    }\n    features {\n      posts {\n        fa @skip(if: $isEn) {\n          id\n          title\n          excerpt\n        }\n        en @include(if: $isEn) {\n          id\n          title\n          excerpt\n        }\n        featuredImage {\n          id\n          image {\n            id\n            url\n          }\n        }\n      }\n    }\n    testimonial {\n      posts {\n        fa @skip(if: $isEn) {\n          id\n          title\n          excerpt\n        }\n        en @include(if: $isEn) {\n          id\n          title\n          excerpt\n        }\n        featuredImage {\n          id\n          image {\n            id\n            url\n          }\n        }\n        misc {\n          key\n          value\n        }\n      }\n    }\n    testimonial_bg_image {\n      id\n      altText\n      image {\n        url\n        id\n        url\n      }\n    }\n    logos {\n      id\n      altText\n      image {\n        url\n      }\n    }\n    blogTitleAndDescription_en @include(if: $isEn) {\n      title\n      content\n    }\n    blogTitleAndDescription_fa @skip(if: $isEn) {\n      title\n      content\n    }\n    blog {\n      posts {\n        id\n        featuredImage {\n          id\n          image {\n            id\n            url\n          }\n        }\n        fa @skip(if: $isEn) {\n          title\n          excerpt\n        }\n        en @include(if: $isEn) {\n          title\n          excerpt\n        }\n      }\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery PostFull($where: PostWhereUniqueInput!, $isEn: Boolean!) {\n  post(where: $where) {\n    id\n    createdAt\n    featuredImage {\n      altText\n      image {\n        url\n      }\n    }\n    en @include(if: $isEn) {\n      title\n      content {\n        document\n      }\n    }\n    fa @skip(if: $isEn) {\n      title\n      content {\n        document\n      }\n    }\n  }\n}\n"): (typeof documents)["\nquery PostFull($where: PostWhereUniqueInput!, $isEn: Boolean!) {\n  post(where: $where) {\n    id\n    createdAt\n    featuredImage {\n      altText\n      image {\n        url\n      }\n    }\n    en @include(if: $isEn) {\n      title\n      content {\n        document\n      }\n    }\n    fa @skip(if: $isEn) {\n      title\n      content {\n        document\n      }\n    }\n  }\n}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;