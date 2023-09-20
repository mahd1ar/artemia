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
    "\nquery topMenu {\n  mainMenus {\n  id\n  link\n  en {\n    title\n    content\n  }  \n  fa {\n    title\n    content\n  }\n  }\n}\n": types.TopMenuDocument,
    "\nquery BlogFull($where: PostWhereUniqueInput!, $isEn: Boolean!) {\n  post(where: $where) {\n    id\n    createdAt\n    featuredImage {\n      altText\n      image {\n        url\n      }\n    }\n    en @include(if: $isEn) {\n      title\n      content {\n        document\n      }\n    }\n    fa @skip(if: $isEn) {\n      title\n      content {\n        document\n      }\n    }\n  }\n}\n": types.BlogFullDocument,
    "\n  query Posts($where: PostWhereInput!, $isEnLang: Boolean!) {\n  posts(where: $where) {\n    id\n    featuredImage {\n      altText\n      id\n      image {\n        id\n        url\n      }\n    }\n    createdAt\n    en @include(if: $isEnLang) {\n      title\n      excerpt\n    }\n    fa @skip(if: $isEnLang) {\n      title\n      excerpt\n    }\n  }\n}\n": types.PostsDocument,
    "\n\nquery FrontPage($isEnLang: Boolean!) {\n  frontPage {\n    heroTitle\n    heroDescription\n    heroImage {\n      altText\n      id\n      image {\n        id\n        url\n      }\n    }\n\n    statusTitle\n    statusDescription\n    statistics {\n      id\n      title\n      content\n      misc\n    }\n\n    sites {\n      title\n      featuredImage {\n        id\n        altText\n        image {\n          url\n        }\n      }\n    }\n\n    featuresTitle\n    featuresDescription\n    features {\n      title\n      content\n      featuredImage {\n        altText\n        id\n        image {\n          url\n\n        }\n      }\n    }\n\n    testimonial {\n      title\n      featuredImage {\n        altText\n        id\n        image {\n          id\n          url\n        }\n      }\n    }\n    logos {\n      id\n      altText\n      image {\n        url\n      }\n    }\n    BlogTitle\n    BlogDescription\n\n  }\n\n  posts(where: { category: { equals: \"blog\" } }) {\n    id\n    title\n    type\n    featuredImage {\n      image {\n        url\n      }\n    }\n    en @include(if: $isEnLang) {\n      title\n      content {\n        document\n      }\n      tags {\n        id\n        name\n      }\n    }\n    fa @skip(if: $isEnLang) {\n      title\n      content {\n        document\n      }\n      tags {\n        id\n        name\n      }\n    }\n  }\n  contactUs {\n    email\n    address\n    addressFa\n    instagram\n    telegram\n    whatsapp\n    tel\n  }\n}\n": types.FrontPageDocument,
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
export function graphql(source: "\nquery topMenu {\n  mainMenus {\n  id\n  link\n  en {\n    title\n    content\n  }  \n  fa {\n    title\n    content\n  }\n  }\n}\n"): (typeof documents)["\nquery topMenu {\n  mainMenus {\n  id\n  link\n  en {\n    title\n    content\n  }  \n  fa {\n    title\n    content\n  }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery BlogFull($where: PostWhereUniqueInput!, $isEn: Boolean!) {\n  post(where: $where) {\n    id\n    createdAt\n    featuredImage {\n      altText\n      image {\n        url\n      }\n    }\n    en @include(if: $isEn) {\n      title\n      content {\n        document\n      }\n    }\n    fa @skip(if: $isEn) {\n      title\n      content {\n        document\n      }\n    }\n  }\n}\n"): (typeof documents)["\nquery BlogFull($where: PostWhereUniqueInput!, $isEn: Boolean!) {\n  post(where: $where) {\n    id\n    createdAt\n    featuredImage {\n      altText\n      image {\n        url\n      }\n    }\n    en @include(if: $isEn) {\n      title\n      content {\n        document\n      }\n    }\n    fa @skip(if: $isEn) {\n      title\n      content {\n        document\n      }\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Posts($where: PostWhereInput!, $isEnLang: Boolean!) {\n  posts(where: $where) {\n    id\n    featuredImage {\n      altText\n      id\n      image {\n        id\n        url\n      }\n    }\n    createdAt\n    en @include(if: $isEnLang) {\n      title\n      excerpt\n    }\n    fa @skip(if: $isEnLang) {\n      title\n      excerpt\n    }\n  }\n}\n"): (typeof documents)["\n  query Posts($where: PostWhereInput!, $isEnLang: Boolean!) {\n  posts(where: $where) {\n    id\n    featuredImage {\n      altText\n      id\n      image {\n        id\n        url\n      }\n    }\n    createdAt\n    en @include(if: $isEnLang) {\n      title\n      excerpt\n    }\n    fa @skip(if: $isEnLang) {\n      title\n      excerpt\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\nquery FrontPage($isEnLang: Boolean!) {\n  frontPage {\n    heroTitle\n    heroDescription\n    heroImage {\n      altText\n      id\n      image {\n        id\n        url\n      }\n    }\n\n    statusTitle\n    statusDescription\n    statistics {\n      id\n      title\n      content\n      misc\n    }\n\n    sites {\n      title\n      featuredImage {\n        id\n        altText\n        image {\n          url\n        }\n      }\n    }\n\n    featuresTitle\n    featuresDescription\n    features {\n      title\n      content\n      featuredImage {\n        altText\n        id\n        image {\n          url\n\n        }\n      }\n    }\n\n    testimonial {\n      title\n      featuredImage {\n        altText\n        id\n        image {\n          id\n          url\n        }\n      }\n    }\n    logos {\n      id\n      altText\n      image {\n        url\n      }\n    }\n    BlogTitle\n    BlogDescription\n\n  }\n\n  posts(where: { category: { equals: \"blog\" } }) {\n    id\n    title\n    type\n    featuredImage {\n      image {\n        url\n      }\n    }\n    en @include(if: $isEnLang) {\n      title\n      content {\n        document\n      }\n      tags {\n        id\n        name\n      }\n    }\n    fa @skip(if: $isEnLang) {\n      title\n      content {\n        document\n      }\n      tags {\n        id\n        name\n      }\n    }\n  }\n  contactUs {\n    email\n    address\n    addressFa\n    instagram\n    telegram\n    whatsapp\n    tel\n  }\n}\n"): (typeof documents)["\n\nquery FrontPage($isEnLang: Boolean!) {\n  frontPage {\n    heroTitle\n    heroDescription\n    heroImage {\n      altText\n      id\n      image {\n        id\n        url\n      }\n    }\n\n    statusTitle\n    statusDescription\n    statistics {\n      id\n      title\n      content\n      misc\n    }\n\n    sites {\n      title\n      featuredImage {\n        id\n        altText\n        image {\n          url\n        }\n      }\n    }\n\n    featuresTitle\n    featuresDescription\n    features {\n      title\n      content\n      featuredImage {\n        altText\n        id\n        image {\n          url\n\n        }\n      }\n    }\n\n    testimonial {\n      title\n      featuredImage {\n        altText\n        id\n        image {\n          id\n          url\n        }\n      }\n    }\n    logos {\n      id\n      altText\n      image {\n        url\n      }\n    }\n    BlogTitle\n    BlogDescription\n\n  }\n\n  posts(where: { category: { equals: \"blog\" } }) {\n    id\n    title\n    type\n    featuredImage {\n      image {\n        url\n      }\n    }\n    en @include(if: $isEnLang) {\n      title\n      content {\n        document\n      }\n      tags {\n        id\n        name\n      }\n    }\n    fa @skip(if: $isEnLang) {\n      title\n      content {\n        document\n      }\n      tags {\n        id\n        name\n      }\n    }\n  }\n  contactUs {\n    email\n    address\n    addressFa\n    instagram\n    telegram\n    whatsapp\n    tel\n  }\n}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;