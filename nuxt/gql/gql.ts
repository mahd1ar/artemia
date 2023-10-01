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
    "\n    query topMenu {\n      mainMenus {\n        id\n        link\n        en {\n          title\n          content\n        }  \n        fa {\n          title\n          content\n        }\n      }\n      contactUs {\n        email\n        instagram\n        tel\n        telegram\n        whatsapp\n        bale\n        address\n        addressFa\n        shortDescription\n        shortDescriptionFa\n      }\n    }\n": types.TopMenuDocument,
    "\n  query Posts($where: PostWhereInput!, $isEnLang: Boolean!) {\n  posts(where: $where) {\n    id\n    featuredImage {\n      altText\n      id\n      image {\n        id\n        url\n      }\n    }\n    createdAt\n    en @include(if: $isEnLang) {\n      title\n      excerpt\n    }\n    fa @skip(if: $isEnLang) {\n      title\n      excerpt\n    }\n  }\n}\n": types.PostsDocument,
    "\nquery CategoryByID($id: ID!,$isEn: Boolean!) {\n  category(where: {\n    id: $id\n  }) {\n    id\n    slug\n    en @include(if: $isEn){\n      content\n      title\n    }\n    fa @skip(if: $isEn) {\n      content\n      title\n    }\n    posts {\n      id\n      featuredImage {\n        image {\n          url\n        }\n      }\n      en @include(if: $isEn){\n        title\n        excerpt\n      }\n      fa @skip(if: $isEn) {\n        title\n        excerpt\n      }\n    }\n  }\n}\n": types.CategoryByIdDocument,
    "\nquery FrontPage( $isEn: Boolean!) {\n  \n  frontPage {\n     hero_en @include(if: $isEn) {\n      title\n      content\n    }\n    hero_fa @skip(if: $isEn) {\n      title\n      content\n    }\n    heroImage {\n      altText\n      id\n      image {\n        id\n        url\n      }\n    }\n    statusTitleAndDescription_fa @skip(if: $isEn) {\n      title\n      content\n    }\n    statusTitleAndDescription_en @include(if: $isEn) {\n      title\n      content\n    }\n    statistics {\n      id\n      title\n      en @include(if: $isEn) {\n        title\n        content {\n          document\n        }\n      }\n      fa @skip(if: $isEn) {\n        title\n        content {\n          document\n        }\n      }\n      misc {\n        id\n        key\n        value\n      }\n      \n    }\n    introVideo {\n      file {\n        url\n      }\n    }\n    sites {\n      title\n      featuredImage {\n        id\n        altText\n        image {\n          url\n        }\n      }\n    }\n    features {\n      id\n      slug\n    }\n    testimonial {\n      id\n      slug\n    }\n    logos {\n      id\n      altText\n      image {\n        url\n      }\n    }\n  }\n}\n": types.FrontPageDocument,
    "\n  query PostsPrview($where: PostWhereInput!, $isEnLang: Boolean!) {\n  posts(where: $where) {\n    id\n    featuredImage {\n      altText\n      id\n      image {\n        id\n        url\n      }\n    }\n    category {\n      id\n      slug\n    }\n    createdAt\n    en @include(if: $isEnLang) {\n      title\n      excerpt\n    }\n    fa @skip(if: $isEnLang) {\n      title\n      excerpt\n    }\n  }\n}\n": types.PostsPrviewDocument,
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
export function graphql(source: "\n    query topMenu {\n      mainMenus {\n        id\n        link\n        en {\n          title\n          content\n        }  \n        fa {\n          title\n          content\n        }\n      }\n      contactUs {\n        email\n        instagram\n        tel\n        telegram\n        whatsapp\n        bale\n        address\n        addressFa\n        shortDescription\n        shortDescriptionFa\n      }\n    }\n"): (typeof documents)["\n    query topMenu {\n      mainMenus {\n        id\n        link\n        en {\n          title\n          content\n        }  \n        fa {\n          title\n          content\n        }\n      }\n      contactUs {\n        email\n        instagram\n        tel\n        telegram\n        whatsapp\n        bale\n        address\n        addressFa\n        shortDescription\n        shortDescriptionFa\n      }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Posts($where: PostWhereInput!, $isEnLang: Boolean!) {\n  posts(where: $where) {\n    id\n    featuredImage {\n      altText\n      id\n      image {\n        id\n        url\n      }\n    }\n    createdAt\n    en @include(if: $isEnLang) {\n      title\n      excerpt\n    }\n    fa @skip(if: $isEnLang) {\n      title\n      excerpt\n    }\n  }\n}\n"): (typeof documents)["\n  query Posts($where: PostWhereInput!, $isEnLang: Boolean!) {\n  posts(where: $where) {\n    id\n    featuredImage {\n      altText\n      id\n      image {\n        id\n        url\n      }\n    }\n    createdAt\n    en @include(if: $isEnLang) {\n      title\n      excerpt\n    }\n    fa @skip(if: $isEnLang) {\n      title\n      excerpt\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery CategoryByID($id: ID!,$isEn: Boolean!) {\n  category(where: {\n    id: $id\n  }) {\n    id\n    slug\n    en @include(if: $isEn){\n      content\n      title\n    }\n    fa @skip(if: $isEn) {\n      content\n      title\n    }\n    posts {\n      id\n      featuredImage {\n        image {\n          url\n        }\n      }\n      en @include(if: $isEn){\n        title\n        excerpt\n      }\n      fa @skip(if: $isEn) {\n        title\n        excerpt\n      }\n    }\n  }\n}\n"): (typeof documents)["\nquery CategoryByID($id: ID!,$isEn: Boolean!) {\n  category(where: {\n    id: $id\n  }) {\n    id\n    slug\n    en @include(if: $isEn){\n      content\n      title\n    }\n    fa @skip(if: $isEn) {\n      content\n      title\n    }\n    posts {\n      id\n      featuredImage {\n        image {\n          url\n        }\n      }\n      en @include(if: $isEn){\n        title\n        excerpt\n      }\n      fa @skip(if: $isEn) {\n        title\n        excerpt\n      }\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery FrontPage( $isEn: Boolean!) {\n  \n  frontPage {\n     hero_en @include(if: $isEn) {\n      title\n      content\n    }\n    hero_fa @skip(if: $isEn) {\n      title\n      content\n    }\n    heroImage {\n      altText\n      id\n      image {\n        id\n        url\n      }\n    }\n    statusTitleAndDescription_fa @skip(if: $isEn) {\n      title\n      content\n    }\n    statusTitleAndDescription_en @include(if: $isEn) {\n      title\n      content\n    }\n    statistics {\n      id\n      title\n      en @include(if: $isEn) {\n        title\n        content {\n          document\n        }\n      }\n      fa @skip(if: $isEn) {\n        title\n        content {\n          document\n        }\n      }\n      misc {\n        id\n        key\n        value\n      }\n      \n    }\n    introVideo {\n      file {\n        url\n      }\n    }\n    sites {\n      title\n      featuredImage {\n        id\n        altText\n        image {\n          url\n        }\n      }\n    }\n    features {\n      id\n      slug\n    }\n    testimonial {\n      id\n      slug\n    }\n    logos {\n      id\n      altText\n      image {\n        url\n      }\n    }\n  }\n}\n"): (typeof documents)["\nquery FrontPage( $isEn: Boolean!) {\n  \n  frontPage {\n     hero_en @include(if: $isEn) {\n      title\n      content\n    }\n    hero_fa @skip(if: $isEn) {\n      title\n      content\n    }\n    heroImage {\n      altText\n      id\n      image {\n        id\n        url\n      }\n    }\n    statusTitleAndDescription_fa @skip(if: $isEn) {\n      title\n      content\n    }\n    statusTitleAndDescription_en @include(if: $isEn) {\n      title\n      content\n    }\n    statistics {\n      id\n      title\n      en @include(if: $isEn) {\n        title\n        content {\n          document\n        }\n      }\n      fa @skip(if: $isEn) {\n        title\n        content {\n          document\n        }\n      }\n      misc {\n        id\n        key\n        value\n      }\n      \n    }\n    introVideo {\n      file {\n        url\n      }\n    }\n    sites {\n      title\n      featuredImage {\n        id\n        altText\n        image {\n          url\n        }\n      }\n    }\n    features {\n      id\n      slug\n    }\n    testimonial {\n      id\n      slug\n    }\n    logos {\n      id\n      altText\n      image {\n        url\n      }\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query PostsPrview($where: PostWhereInput!, $isEnLang: Boolean!) {\n  posts(where: $where) {\n    id\n    featuredImage {\n      altText\n      id\n      image {\n        id\n        url\n      }\n    }\n    category {\n      id\n      slug\n    }\n    createdAt\n    en @include(if: $isEnLang) {\n      title\n      excerpt\n    }\n    fa @skip(if: $isEnLang) {\n      title\n      excerpt\n    }\n  }\n}\n"): (typeof documents)["\n  query PostsPrview($where: PostWhereInput!, $isEnLang: Boolean!) {\n  posts(where: $where) {\n    id\n    featuredImage {\n      altText\n      id\n      image {\n        id\n        url\n      }\n    }\n    category {\n      id\n      slug\n    }\n    createdAt\n    en @include(if: $isEnLang) {\n      title\n      excerpt\n    }\n    fa @skip(if: $isEnLang) {\n      title\n      excerpt\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery PostFull($where: PostWhereUniqueInput!, $isEn: Boolean!) {\n  post(where: $where) {\n    id\n    createdAt\n    featuredImage {\n      altText\n      image {\n        url\n      }\n    }\n    en @include(if: $isEn) {\n      title\n      content {\n        document\n      }\n    }\n    fa @skip(if: $isEn) {\n      title\n      content {\n        document\n      }\n    }\n  }\n}\n"): (typeof documents)["\nquery PostFull($where: PostWhereUniqueInput!, $isEn: Boolean!) {\n  post(where: $where) {\n    id\n    createdAt\n    featuredImage {\n      altText\n      image {\n        url\n      }\n    }\n    en @include(if: $isEn) {\n      title\n      content {\n        document\n      }\n    }\n    fa @skip(if: $isEn) {\n      title\n      content {\n        document\n      }\n    }\n  }\n}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;