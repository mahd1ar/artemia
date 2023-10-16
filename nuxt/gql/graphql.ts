/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any; }
};

export type AuthenticatedItem = User;

export type BooleanFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<BooleanFilter>;
};

export type Category = {
  __typename?: 'Category';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  en?: Maybe<Resource>;
  fa?: Maybe<Resource>;
  id: Scalars['ID']['output'];
  image?: Maybe<ImageStore>;
  noUI?: Maybe<Scalars['Boolean']['output']>;
  posts?: Maybe<Array<Post>>;
  postsCount?: Maybe<Scalars['Int']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};


export type CategoryPostsArgs = {
  cursor?: InputMaybe<PostWhereUniqueInput>;
  orderBy?: Array<PostOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: PostWhereInput;
};


export type CategoryPostsCountArgs = {
  where?: PostWhereInput;
};

export type CategoryCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  en?: InputMaybe<ResourceRelateToOneForCreateInput>;
  fa?: InputMaybe<ResourceRelateToOneForCreateInput>;
  image?: InputMaybe<ImageStoreRelateToOneForCreateInput>;
  noUI?: InputMaybe<Scalars['Boolean']['input']>;
  posts?: InputMaybe<PostRelateToManyForCreateInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type CategoryManyRelationFilter = {
  every?: InputMaybe<CategoryWhereInput>;
  none?: InputMaybe<CategoryWhereInput>;
  some?: InputMaybe<CategoryWhereInput>;
};

export type CategoryOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  noUI?: InputMaybe<OrderDirection>;
  slug?: InputMaybe<OrderDirection>;
};

export type CategoryRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<CategoryWhereUniqueInput>>;
  create?: InputMaybe<Array<CategoryCreateInput>>;
};

export type CategoryRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<CategoryWhereUniqueInput>>;
  create?: InputMaybe<Array<CategoryCreateInput>>;
  disconnect?: InputMaybe<Array<CategoryWhereUniqueInput>>;
  set?: InputMaybe<Array<CategoryWhereUniqueInput>>;
};

export type CategoryRelateToOneForCreateInput = {
  connect?: InputMaybe<CategoryWhereUniqueInput>;
  create?: InputMaybe<CategoryCreateInput>;
};

export type CategoryRelateToOneForUpdateInput = {
  connect?: InputMaybe<CategoryWhereUniqueInput>;
  create?: InputMaybe<CategoryCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CategoryUpdateArgs = {
  data: CategoryUpdateInput;
  where: CategoryWhereUniqueInput;
};

export type CategoryUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  en?: InputMaybe<ResourceRelateToOneForUpdateInput>;
  fa?: InputMaybe<ResourceRelateToOneForUpdateInput>;
  image?: InputMaybe<ImageStoreRelateToOneForUpdateInput>;
  noUI?: InputMaybe<Scalars['Boolean']['input']>;
  posts?: InputMaybe<PostRelateToManyForUpdateInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type CategoryWhereInput = {
  AND?: InputMaybe<Array<CategoryWhereInput>>;
  NOT?: InputMaybe<Array<CategoryWhereInput>>;
  OR?: InputMaybe<Array<CategoryWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  en?: InputMaybe<ResourceWhereInput>;
  fa?: InputMaybe<ResourceWhereInput>;
  id?: InputMaybe<IdFilter>;
  image?: InputMaybe<ImageStoreWhereInput>;
  noUI?: InputMaybe<BooleanFilter>;
  posts?: InputMaybe<PostManyRelationFilter>;
  slug?: InputMaybe<StringFilter>;
};

export type CategoryWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ContactUs = {
  __typename?: 'ContactUs';
  aboutFa?: Maybe<ContactUs_AboutFa_Document>;
  aboutUs?: Maybe<ContactUs_AboutUs_Document>;
  address?: Maybe<Scalars['String']['output']>;
  addressFa?: Maybe<Scalars['String']['output']>;
  bale?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  instagram?: Maybe<Scalars['String']['output']>;
  lat?: Maybe<Scalars['String']['output']>;
  long?: Maybe<Scalars['String']['output']>;
  shortDescription?: Maybe<Scalars['String']['output']>;
  shortDescriptionFa?: Maybe<Scalars['String']['output']>;
  tel?: Maybe<Scalars['String']['output']>;
  telegram?: Maybe<Scalars['String']['output']>;
  whatsapp?: Maybe<Scalars['String']['output']>;
};

export type ContactUsCreateInput = {
  aboutFa?: InputMaybe<Scalars['JSON']['input']>;
  aboutUs?: InputMaybe<Scalars['JSON']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  addressFa?: InputMaybe<Scalars['String']['input']>;
  bale?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  instagram?: InputMaybe<Scalars['String']['input']>;
  lat?: InputMaybe<Scalars['String']['input']>;
  long?: InputMaybe<Scalars['String']['input']>;
  shortDescription?: InputMaybe<Scalars['String']['input']>;
  shortDescriptionFa?: InputMaybe<Scalars['String']['input']>;
  tel?: InputMaybe<Scalars['String']['input']>;
  telegram?: InputMaybe<Scalars['String']['input']>;
  whatsapp?: InputMaybe<Scalars['String']['input']>;
};

export type ContactUsOrderByInput = {
  address?: InputMaybe<OrderDirection>;
  addressFa?: InputMaybe<OrderDirection>;
  bale?: InputMaybe<OrderDirection>;
  email?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  instagram?: InputMaybe<OrderDirection>;
  lat?: InputMaybe<OrderDirection>;
  long?: InputMaybe<OrderDirection>;
  shortDescription?: InputMaybe<OrderDirection>;
  shortDescriptionFa?: InputMaybe<OrderDirection>;
  tel?: InputMaybe<OrderDirection>;
  telegram?: InputMaybe<OrderDirection>;
  whatsapp?: InputMaybe<OrderDirection>;
};

export type ContactUsUpdateArgs = {
  data: ContactUsUpdateInput;
  where?: ContactUsWhereUniqueInput;
};

export type ContactUsUpdateInput = {
  aboutFa?: InputMaybe<Scalars['JSON']['input']>;
  aboutUs?: InputMaybe<Scalars['JSON']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  addressFa?: InputMaybe<Scalars['String']['input']>;
  bale?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  instagram?: InputMaybe<Scalars['String']['input']>;
  lat?: InputMaybe<Scalars['String']['input']>;
  long?: InputMaybe<Scalars['String']['input']>;
  shortDescription?: InputMaybe<Scalars['String']['input']>;
  shortDescriptionFa?: InputMaybe<Scalars['String']['input']>;
  tel?: InputMaybe<Scalars['String']['input']>;
  telegram?: InputMaybe<Scalars['String']['input']>;
  whatsapp?: InputMaybe<Scalars['String']['input']>;
};

export type ContactUsWhereInput = {
  AND?: InputMaybe<Array<ContactUsWhereInput>>;
  NOT?: InputMaybe<Array<ContactUsWhereInput>>;
  OR?: InputMaybe<Array<ContactUsWhereInput>>;
  address?: InputMaybe<StringFilter>;
  addressFa?: InputMaybe<StringFilter>;
  bale?: InputMaybe<StringFilter>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  instagram?: InputMaybe<StringFilter>;
  lat?: InputMaybe<StringFilter>;
  long?: InputMaybe<StringFilter>;
  shortDescription?: InputMaybe<StringFilter>;
  shortDescriptionFa?: InputMaybe<StringFilter>;
  tel?: InputMaybe<StringFilter>;
  telegram?: InputMaybe<StringFilter>;
  whatsapp?: InputMaybe<StringFilter>;
};

export type ContactUsWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type ContactUs_AboutFa_Document = {
  __typename?: 'ContactUs_aboutFa_Document';
  document: Scalars['JSON']['output'];
};


export type ContactUs_AboutFa_DocumentDocumentArgs = {
  hydrateRelationships?: Scalars['Boolean']['input'];
};

export type ContactUs_AboutUs_Document = {
  __typename?: 'ContactUs_aboutUs_Document';
  document: Scalars['JSON']['output'];
};


export type ContactUs_AboutUs_DocumentDocumentArgs = {
  hydrateRelationships?: Scalars['Boolean']['input'];
};

export type CreateInitialUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type Customer = {
  __typename?: 'Customer';
  address?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  orders?: Maybe<Array<Order>>;
  ordersCount?: Maybe<Scalars['Int']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  tel?: Maybe<Scalars['String']['output']>;
};


export type CustomerOrdersArgs = {
  cursor?: InputMaybe<OrderWhereUniqueInput>;
  orderBy?: Array<OrderOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: OrderWhereInput;
};


export type CustomerOrdersCountArgs = {
  where?: OrderWhereInput;
};

export type CustomerCreateInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  orders?: InputMaybe<OrderRelateToManyForCreateInput>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  tel?: InputMaybe<Scalars['String']['input']>;
};

export type CustomerOrderByInput = {
  address?: InputMaybe<OrderDirection>;
  city?: InputMaybe<OrderDirection>;
  code?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  postalCode?: InputMaybe<OrderDirection>;
  tel?: InputMaybe<OrderDirection>;
};

export type CustomerRelateToOneForCreateInput = {
  connect?: InputMaybe<CustomerWhereUniqueInput>;
  create?: InputMaybe<CustomerCreateInput>;
};

export type CustomerRelateToOneForUpdateInput = {
  connect?: InputMaybe<CustomerWhereUniqueInput>;
  create?: InputMaybe<CustomerCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CustomerUpdateArgs = {
  data: CustomerUpdateInput;
  where: CustomerWhereUniqueInput;
};

export type CustomerUpdateInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  orders?: InputMaybe<OrderRelateToManyForUpdateInput>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  tel?: InputMaybe<Scalars['String']['input']>;
};

export type CustomerWhereInput = {
  AND?: InputMaybe<Array<CustomerWhereInput>>;
  NOT?: InputMaybe<Array<CustomerWhereInput>>;
  OR?: InputMaybe<Array<CustomerWhereInput>>;
  address?: InputMaybe<StringFilter>;
  city?: InputMaybe<StringFilter>;
  code?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  orders?: InputMaybe<OrderManyRelationFilter>;
  postalCode?: InputMaybe<StringFilter>;
  tel?: InputMaybe<StringFilter>;
};

export type CustomerWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<DateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type FileFieldInput = {
  upload: Scalars['Upload']['input'];
};

export type FileFieldOutput = {
  __typename?: 'FileFieldOutput';
  filename: Scalars['String']['output'];
  filesize: Scalars['Int']['output'];
  url: Scalars['String']['output'];
};

export type FileStore = {
  __typename?: 'FileStore';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  file?: Maybe<FileFieldOutput>;
  id: Scalars['ID']['output'];
  title?: Maybe<Scalars['String']['output']>;
};

export type FileStoreCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  file?: InputMaybe<FileFieldInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type FileStoreOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
};

export type FileStoreRelateToOneForCreateInput = {
  connect?: InputMaybe<FileStoreWhereUniqueInput>;
  create?: InputMaybe<FileStoreCreateInput>;
};

export type FileStoreRelateToOneForUpdateInput = {
  connect?: InputMaybe<FileStoreWhereUniqueInput>;
  create?: InputMaybe<FileStoreCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type FileStoreUpdateArgs = {
  data: FileStoreUpdateInput;
  where: FileStoreWhereUniqueInput;
};

export type FileStoreUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  file?: InputMaybe<FileFieldInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type FileStoreWhereInput = {
  AND?: InputMaybe<Array<FileStoreWhereInput>>;
  NOT?: InputMaybe<Array<FileStoreWhereInput>>;
  OR?: InputMaybe<Array<FileStoreWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  title?: InputMaybe<StringFilter>;
};

export type FileStoreWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type FrontPage = {
  __typename?: 'FrontPage';
  blog?: Maybe<Category>;
  blogTitleAndDescription_en?: Maybe<Resource>;
  blogTitleAndDescription_fa?: Maybe<Resource>;
  consortiumCEOSignatureImage?: Maybe<ImageStore>;
  consortiumImages?: Maybe<Array<ImageStore>>;
  consortiumImagesCount?: Maybe<Scalars['Int']['output']>;
  consortiumIntro_en?: Maybe<Resource>;
  consortiumIntro_fa?: Maybe<Resource>;
  features?: Maybe<Category>;
  heroImage?: Maybe<Array<ImageStore>>;
  heroImageCount?: Maybe<Scalars['Int']['output']>;
  hero_en?: Maybe<Resource>;
  hero_fa?: Maybe<Resource>;
  id: Scalars['ID']['output'];
  introVideo?: Maybe<FileStore>;
  introVideoTitle_en?: Maybe<Resource>;
  introVideoTitle_fa?: Maybe<Resource>;
  logos?: Maybe<Array<ImageStore>>;
  logosCount?: Maybe<Scalars['Int']['output']>;
  meta_en?: Maybe<Resource>;
  meta_fa?: Maybe<Resource>;
  sites?: Maybe<Category>;
  statistics?: Maybe<Array<Post>>;
  statisticsCount?: Maybe<Scalars['Int']['output']>;
  statusTitleAndDescription_en?: Maybe<Resource>;
  statusTitleAndDescription_fa?: Maybe<Resource>;
  testimonial?: Maybe<Category>;
  testimonial_bg_image?: Maybe<ImageStore>;
};


export type FrontPageConsortiumImagesArgs = {
  cursor?: InputMaybe<ImageStoreWhereUniqueInput>;
  orderBy?: Array<ImageStoreOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ImageStoreWhereInput;
};


export type FrontPageConsortiumImagesCountArgs = {
  where?: ImageStoreWhereInput;
};


export type FrontPageHeroImageArgs = {
  cursor?: InputMaybe<ImageStoreWhereUniqueInput>;
  orderBy?: Array<ImageStoreOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ImageStoreWhereInput;
};


export type FrontPageHeroImageCountArgs = {
  where?: ImageStoreWhereInput;
};


export type FrontPageLogosArgs = {
  cursor?: InputMaybe<ImageStoreWhereUniqueInput>;
  orderBy?: Array<ImageStoreOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ImageStoreWhereInput;
};


export type FrontPageLogosCountArgs = {
  where?: ImageStoreWhereInput;
};


export type FrontPageStatisticsArgs = {
  cursor?: InputMaybe<PostWhereUniqueInput>;
  orderBy?: Array<PostOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: PostWhereInput;
};


export type FrontPageStatisticsCountArgs = {
  where?: PostWhereInput;
};

export type FrontPageCreateInput = {
  blog?: InputMaybe<CategoryRelateToOneForCreateInput>;
  blogTitleAndDescription_en?: InputMaybe<ResourceRelateToOneForCreateInput>;
  blogTitleAndDescription_fa?: InputMaybe<ResourceRelateToOneForCreateInput>;
  consortiumCEOSignatureImage?: InputMaybe<ImageStoreRelateToOneForCreateInput>;
  consortiumImages?: InputMaybe<ImageStoreRelateToManyForCreateInput>;
  consortiumIntro_en?: InputMaybe<ResourceRelateToOneForCreateInput>;
  consortiumIntro_fa?: InputMaybe<ResourceRelateToOneForCreateInput>;
  features?: InputMaybe<CategoryRelateToOneForCreateInput>;
  heroImage?: InputMaybe<ImageStoreRelateToManyForCreateInput>;
  hero_en?: InputMaybe<ResourceRelateToOneForCreateInput>;
  hero_fa?: InputMaybe<ResourceRelateToOneForCreateInput>;
  introVideo?: InputMaybe<FileStoreRelateToOneForCreateInput>;
  introVideoTitle_en?: InputMaybe<ResourceRelateToOneForCreateInput>;
  introVideoTitle_fa?: InputMaybe<ResourceRelateToOneForCreateInput>;
  logos?: InputMaybe<ImageStoreRelateToManyForCreateInput>;
  meta_en?: InputMaybe<ResourceRelateToOneForCreateInput>;
  meta_fa?: InputMaybe<ResourceRelateToOneForCreateInput>;
  sites?: InputMaybe<CategoryRelateToOneForCreateInput>;
  statistics?: InputMaybe<PostRelateToManyForCreateInput>;
  statusTitleAndDescription_en?: InputMaybe<ResourceRelateToOneForCreateInput>;
  statusTitleAndDescription_fa?: InputMaybe<ResourceRelateToOneForCreateInput>;
  testimonial?: InputMaybe<CategoryRelateToOneForCreateInput>;
  testimonial_bg_image?: InputMaybe<ImageStoreRelateToOneForCreateInput>;
};

export type FrontPageOrderByInput = {
  id?: InputMaybe<OrderDirection>;
};

export type FrontPageUpdateArgs = {
  data: FrontPageUpdateInput;
  where?: FrontPageWhereUniqueInput;
};

export type FrontPageUpdateInput = {
  blog?: InputMaybe<CategoryRelateToOneForUpdateInput>;
  blogTitleAndDescription_en?: InputMaybe<ResourceRelateToOneForUpdateInput>;
  blogTitleAndDescription_fa?: InputMaybe<ResourceRelateToOneForUpdateInput>;
  consortiumCEOSignatureImage?: InputMaybe<ImageStoreRelateToOneForUpdateInput>;
  consortiumImages?: InputMaybe<ImageStoreRelateToManyForUpdateInput>;
  consortiumIntro_en?: InputMaybe<ResourceRelateToOneForUpdateInput>;
  consortiumIntro_fa?: InputMaybe<ResourceRelateToOneForUpdateInput>;
  features?: InputMaybe<CategoryRelateToOneForUpdateInput>;
  heroImage?: InputMaybe<ImageStoreRelateToManyForUpdateInput>;
  hero_en?: InputMaybe<ResourceRelateToOneForUpdateInput>;
  hero_fa?: InputMaybe<ResourceRelateToOneForUpdateInput>;
  introVideo?: InputMaybe<FileStoreRelateToOneForUpdateInput>;
  introVideoTitle_en?: InputMaybe<ResourceRelateToOneForUpdateInput>;
  introVideoTitle_fa?: InputMaybe<ResourceRelateToOneForUpdateInput>;
  logos?: InputMaybe<ImageStoreRelateToManyForUpdateInput>;
  meta_en?: InputMaybe<ResourceRelateToOneForUpdateInput>;
  meta_fa?: InputMaybe<ResourceRelateToOneForUpdateInput>;
  sites?: InputMaybe<CategoryRelateToOneForUpdateInput>;
  statistics?: InputMaybe<PostRelateToManyForUpdateInput>;
  statusTitleAndDescription_en?: InputMaybe<ResourceRelateToOneForUpdateInput>;
  statusTitleAndDescription_fa?: InputMaybe<ResourceRelateToOneForUpdateInput>;
  testimonial?: InputMaybe<CategoryRelateToOneForUpdateInput>;
  testimonial_bg_image?: InputMaybe<ImageStoreRelateToOneForUpdateInput>;
};

export type FrontPageWhereInput = {
  AND?: InputMaybe<Array<FrontPageWhereInput>>;
  NOT?: InputMaybe<Array<FrontPageWhereInput>>;
  OR?: InputMaybe<Array<FrontPageWhereInput>>;
  blog?: InputMaybe<CategoryWhereInput>;
  blogTitleAndDescription_en?: InputMaybe<ResourceWhereInput>;
  blogTitleAndDescription_fa?: InputMaybe<ResourceWhereInput>;
  consortiumCEOSignatureImage?: InputMaybe<ImageStoreWhereInput>;
  consortiumImages?: InputMaybe<ImageStoreManyRelationFilter>;
  consortiumIntro_en?: InputMaybe<ResourceWhereInput>;
  consortiumIntro_fa?: InputMaybe<ResourceWhereInput>;
  features?: InputMaybe<CategoryWhereInput>;
  heroImage?: InputMaybe<ImageStoreManyRelationFilter>;
  hero_en?: InputMaybe<ResourceWhereInput>;
  hero_fa?: InputMaybe<ResourceWhereInput>;
  id?: InputMaybe<IdFilter>;
  introVideo?: InputMaybe<FileStoreWhereInput>;
  introVideoTitle_en?: InputMaybe<ResourceWhereInput>;
  introVideoTitle_fa?: InputMaybe<ResourceWhereInput>;
  logos?: InputMaybe<ImageStoreManyRelationFilter>;
  meta_en?: InputMaybe<ResourceWhereInput>;
  meta_fa?: InputMaybe<ResourceWhereInput>;
  sites?: InputMaybe<CategoryWhereInput>;
  statistics?: InputMaybe<PostManyRelationFilter>;
  statusTitleAndDescription_en?: InputMaybe<ResourceWhereInput>;
  statusTitleAndDescription_fa?: InputMaybe<ResourceWhereInput>;
  testimonial?: InputMaybe<CategoryWhereInput>;
  testimonial_bg_image?: InputMaybe<ImageStoreWhereInput>;
};

export type FrontPageWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type IdFilter = {
  equals?: InputMaybe<Scalars['ID']['input']>;
  gt?: InputMaybe<Scalars['ID']['input']>;
  gte?: InputMaybe<Scalars['ID']['input']>;
  in?: InputMaybe<Array<Scalars['ID']['input']>>;
  lt?: InputMaybe<Scalars['ID']['input']>;
  lte?: InputMaybe<Scalars['ID']['input']>;
  not?: InputMaybe<IdFilter>;
  notIn?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export enum ImageExtension {
  Gif = 'gif',
  Jpg = 'jpg',
  Png = 'png',
  Webp = 'webp'
}

export type ImageFieldInput = {
  upload: Scalars['Upload']['input'];
};

export type ImageFieldOutput = {
  __typename?: 'ImageFieldOutput';
  extension: ImageExtension;
  filesize: Scalars['Int']['output'];
  height: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  url: Scalars['String']['output'];
  width: Scalars['Int']['output'];
};

export type ImageStore = {
  __typename?: 'ImageStore';
  altText?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<ImageFieldOutput>;
};

export type ImageStoreCreateInput = {
  altText?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  image?: InputMaybe<ImageFieldInput>;
};

export type ImageStoreManyRelationFilter = {
  every?: InputMaybe<ImageStoreWhereInput>;
  none?: InputMaybe<ImageStoreWhereInput>;
  some?: InputMaybe<ImageStoreWhereInput>;
};

export type ImageStoreOrderByInput = {
  altText?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
};

export type ImageStoreRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<ImageStoreWhereUniqueInput>>;
  create?: InputMaybe<Array<ImageStoreCreateInput>>;
};

export type ImageStoreRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<ImageStoreWhereUniqueInput>>;
  create?: InputMaybe<Array<ImageStoreCreateInput>>;
  disconnect?: InputMaybe<Array<ImageStoreWhereUniqueInput>>;
  set?: InputMaybe<Array<ImageStoreWhereUniqueInput>>;
};

export type ImageStoreRelateToOneForCreateInput = {
  connect?: InputMaybe<ImageStoreWhereUniqueInput>;
  create?: InputMaybe<ImageStoreCreateInput>;
};

export type ImageStoreRelateToOneForUpdateInput = {
  connect?: InputMaybe<ImageStoreWhereUniqueInput>;
  create?: InputMaybe<ImageStoreCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ImageStoreUpdateArgs = {
  data: ImageStoreUpdateInput;
  where: ImageStoreWhereUniqueInput;
};

export type ImageStoreUpdateInput = {
  altText?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  image?: InputMaybe<ImageFieldInput>;
};

export type ImageStoreWhereInput = {
  AND?: InputMaybe<Array<ImageStoreWhereInput>>;
  NOT?: InputMaybe<Array<ImageStoreWhereInput>>;
  OR?: InputMaybe<Array<ImageStoreWhereInput>>;
  altText?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
};

export type ImageStoreWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type IntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<IntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type KeyValue = {
  __typename?: 'KeyValue';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  key?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type KeyValueCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type KeyValueManyRelationFilter = {
  every?: InputMaybe<KeyValueWhereInput>;
  none?: InputMaybe<KeyValueWhereInput>;
  some?: InputMaybe<KeyValueWhereInput>;
};

export type KeyValueOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  key?: InputMaybe<OrderDirection>;
  value?: InputMaybe<OrderDirection>;
};

export type KeyValueRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<KeyValueWhereUniqueInput>>;
  create?: InputMaybe<Array<KeyValueCreateInput>>;
};

export type KeyValueRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<KeyValueWhereUniqueInput>>;
  create?: InputMaybe<Array<KeyValueCreateInput>>;
  disconnect?: InputMaybe<Array<KeyValueWhereUniqueInput>>;
  set?: InputMaybe<Array<KeyValueWhereUniqueInput>>;
};

export type KeyValueUpdateArgs = {
  data: KeyValueUpdateInput;
  where: KeyValueWhereUniqueInput;
};

export type KeyValueUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type KeyValueWhereInput = {
  AND?: InputMaybe<Array<KeyValueWhereInput>>;
  NOT?: InputMaybe<Array<KeyValueWhereInput>>;
  OR?: InputMaybe<Array<KeyValueWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  key?: InputMaybe<StringFilter>;
  value?: InputMaybe<StringFilter>;
};

export type KeyValueWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type KeystoneAdminMeta = {
  __typename?: 'KeystoneAdminMeta';
  list?: Maybe<KeystoneAdminUiListMeta>;
  lists: Array<KeystoneAdminUiListMeta>;
};


export type KeystoneAdminMetaListArgs = {
  key: Scalars['String']['input'];
};

export type KeystoneAdminUiFieldGroupMeta = {
  __typename?: 'KeystoneAdminUIFieldGroupMeta';
  description?: Maybe<Scalars['String']['output']>;
  fields: Array<KeystoneAdminUiFieldMeta>;
  label: Scalars['String']['output'];
};

export type KeystoneAdminUiFieldMeta = {
  __typename?: 'KeystoneAdminUIFieldMeta';
  createView: KeystoneAdminUiFieldMetaCreateView;
  customViewsIndex?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  fieldMeta?: Maybe<Scalars['JSON']['output']>;
  isFilterable: Scalars['Boolean']['output'];
  isNonNull?: Maybe<Array<KeystoneAdminUiFieldMetaIsNonNull>>;
  isOrderable: Scalars['Boolean']['output'];
  itemView?: Maybe<KeystoneAdminUiFieldMetaItemView>;
  label: Scalars['String']['output'];
  listView: KeystoneAdminUiFieldMetaListView;
  path: Scalars['String']['output'];
  search?: Maybe<QueryMode>;
  viewsIndex: Scalars['Int']['output'];
};


export type KeystoneAdminUiFieldMetaItemViewArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type KeystoneAdminUiFieldMetaCreateView = {
  __typename?: 'KeystoneAdminUIFieldMetaCreateView';
  fieldMode: KeystoneAdminUiFieldMetaCreateViewFieldMode;
};

export enum KeystoneAdminUiFieldMetaCreateViewFieldMode {
  Edit = 'edit',
  Hidden = 'hidden'
}

export enum KeystoneAdminUiFieldMetaIsNonNull {
  Create = 'create',
  Read = 'read',
  Update = 'update'
}

export type KeystoneAdminUiFieldMetaItemView = {
  __typename?: 'KeystoneAdminUIFieldMetaItemView';
  fieldMode?: Maybe<KeystoneAdminUiFieldMetaItemViewFieldMode>;
  fieldPosition?: Maybe<KeystoneAdminUiFieldMetaItemViewFieldPosition>;
};

export enum KeystoneAdminUiFieldMetaItemViewFieldMode {
  Edit = 'edit',
  Hidden = 'hidden',
  Read = 'read'
}

export enum KeystoneAdminUiFieldMetaItemViewFieldPosition {
  Form = 'form',
  Sidebar = 'sidebar'
}

export type KeystoneAdminUiFieldMetaListView = {
  __typename?: 'KeystoneAdminUIFieldMetaListView';
  fieldMode: KeystoneAdminUiFieldMetaListViewFieldMode;
};

export enum KeystoneAdminUiFieldMetaListViewFieldMode {
  Hidden = 'hidden',
  Read = 'read'
}

export type KeystoneAdminUiListMeta = {
  __typename?: 'KeystoneAdminUIListMeta';
  description?: Maybe<Scalars['String']['output']>;
  fields: Array<KeystoneAdminUiFieldMeta>;
  groups: Array<KeystoneAdminUiFieldGroupMeta>;
  hideCreate: Scalars['Boolean']['output'];
  hideDelete: Scalars['Boolean']['output'];
  initialColumns: Array<Scalars['String']['output']>;
  initialSort?: Maybe<KeystoneAdminUiSort>;
  isHidden: Scalars['Boolean']['output'];
  isSingleton: Scalars['Boolean']['output'];
  itemQueryName: Scalars['String']['output'];
  key: Scalars['String']['output'];
  label: Scalars['String']['output'];
  labelField: Scalars['String']['output'];
  listQueryName: Scalars['String']['output'];
  pageSize: Scalars['Int']['output'];
  path: Scalars['String']['output'];
  plural: Scalars['String']['output'];
  singular: Scalars['String']['output'];
};

export type KeystoneAdminUiSort = {
  __typename?: 'KeystoneAdminUISort';
  direction: KeystoneAdminUiSortDirection;
  field: Scalars['String']['output'];
};

export enum KeystoneAdminUiSortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type KeystoneMeta = {
  __typename?: 'KeystoneMeta';
  adminMeta: KeystoneAdminMeta;
};

export type MainMenu = {
  __typename?: 'MainMenu';
  en?: Maybe<Resource>;
  fa?: Maybe<Resource>;
  id: Scalars['ID']['output'];
  link?: Maybe<Scalars['String']['output']>;
  priority?: Maybe<Scalars['Int']['output']>;
};

export type MainMenuCreateInput = {
  en?: InputMaybe<ResourceRelateToOneForCreateInput>;
  fa?: InputMaybe<ResourceRelateToOneForCreateInput>;
  link?: InputMaybe<Scalars['String']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
};

export type MainMenuOrderByInput = {
  id?: InputMaybe<OrderDirection>;
  link?: InputMaybe<OrderDirection>;
  priority?: InputMaybe<OrderDirection>;
};

export type MainMenuUpdateArgs = {
  data: MainMenuUpdateInput;
  where: MainMenuWhereUniqueInput;
};

export type MainMenuUpdateInput = {
  en?: InputMaybe<ResourceRelateToOneForUpdateInput>;
  fa?: InputMaybe<ResourceRelateToOneForUpdateInput>;
  link?: InputMaybe<Scalars['String']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
};

export type MainMenuWhereInput = {
  AND?: InputMaybe<Array<MainMenuWhereInput>>;
  NOT?: InputMaybe<Array<MainMenuWhereInput>>;
  OR?: InputMaybe<Array<MainMenuWhereInput>>;
  en?: InputMaybe<ResourceWhereInput>;
  fa?: InputMaybe<ResourceWhereInput>;
  id?: InputMaybe<IdFilter>;
  link?: InputMaybe<StringFilter>;
  priority?: InputMaybe<IntNullableFilter>;
};

export type MainMenuWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  authenticateUserWithPassword?: Maybe<UserAuthenticationWithPasswordResult>;
  createCategories?: Maybe<Array<Maybe<Category>>>;
  createCategory?: Maybe<Category>;
  createContactUs?: Maybe<ContactUs>;
  createContactuses?: Maybe<Array<Maybe<ContactUs>>>;
  createCustomer?: Maybe<Customer>;
  createCustomers?: Maybe<Array<Maybe<Customer>>>;
  createFileStore?: Maybe<FileStore>;
  createFileStores?: Maybe<Array<Maybe<FileStore>>>;
  createFrontPage?: Maybe<FrontPage>;
  createFrontPages?: Maybe<Array<Maybe<FrontPage>>>;
  createImageStore?: Maybe<ImageStore>;
  createImageStores?: Maybe<Array<Maybe<ImageStore>>>;
  createInitialUser: UserAuthenticationWithPasswordSuccess;
  createKeyValue?: Maybe<KeyValue>;
  createKeyValues?: Maybe<Array<Maybe<KeyValue>>>;
  createMainMenu?: Maybe<MainMenu>;
  createMainMenus?: Maybe<Array<Maybe<MainMenu>>>;
  createOrder?: Maybe<Order>;
  createOrders?: Maybe<Array<Maybe<Order>>>;
  createPost?: Maybe<Post>;
  createPostTranslation?: Maybe<PostTranslation>;
  createPostTranslations?: Maybe<Array<Maybe<PostTranslation>>>;
  createPosts?: Maybe<Array<Maybe<Post>>>;
  createResource?: Maybe<Resource>;
  createResources?: Maybe<Array<Maybe<Resource>>>;
  createTag?: Maybe<Tag>;
  createTags?: Maybe<Array<Maybe<Tag>>>;
  createUser?: Maybe<User>;
  createUsers?: Maybe<Array<Maybe<User>>>;
  deleteCategories?: Maybe<Array<Maybe<Category>>>;
  deleteCategory?: Maybe<Category>;
  deleteContactUs?: Maybe<ContactUs>;
  deleteContactuses?: Maybe<Array<Maybe<ContactUs>>>;
  deleteCustomer?: Maybe<Customer>;
  deleteCustomers?: Maybe<Array<Maybe<Customer>>>;
  deleteFileStore?: Maybe<FileStore>;
  deleteFileStores?: Maybe<Array<Maybe<FileStore>>>;
  deleteFrontPage?: Maybe<FrontPage>;
  deleteFrontPages?: Maybe<Array<Maybe<FrontPage>>>;
  deleteImageStore?: Maybe<ImageStore>;
  deleteImageStores?: Maybe<Array<Maybe<ImageStore>>>;
  deleteKeyValue?: Maybe<KeyValue>;
  deleteKeyValues?: Maybe<Array<Maybe<KeyValue>>>;
  deleteMainMenu?: Maybe<MainMenu>;
  deleteMainMenus?: Maybe<Array<Maybe<MainMenu>>>;
  deleteOrder?: Maybe<Order>;
  deleteOrders?: Maybe<Array<Maybe<Order>>>;
  deletePost?: Maybe<Post>;
  deletePostTranslation?: Maybe<PostTranslation>;
  deletePostTranslations?: Maybe<Array<Maybe<PostTranslation>>>;
  deletePosts?: Maybe<Array<Maybe<Post>>>;
  deleteResource?: Maybe<Resource>;
  deleteResources?: Maybe<Array<Maybe<Resource>>>;
  deleteTag?: Maybe<Tag>;
  deleteTags?: Maybe<Array<Maybe<Tag>>>;
  deleteUser?: Maybe<User>;
  deleteUsers?: Maybe<Array<Maybe<User>>>;
  endSession: Scalars['Boolean']['output'];
  updateCategories?: Maybe<Array<Maybe<Category>>>;
  updateCategory?: Maybe<Category>;
  updateContactUs?: Maybe<ContactUs>;
  updateContactuses?: Maybe<Array<Maybe<ContactUs>>>;
  updateCustomer?: Maybe<Customer>;
  updateCustomers?: Maybe<Array<Maybe<Customer>>>;
  updateFileStore?: Maybe<FileStore>;
  updateFileStores?: Maybe<Array<Maybe<FileStore>>>;
  updateFrontPage?: Maybe<FrontPage>;
  updateFrontPages?: Maybe<Array<Maybe<FrontPage>>>;
  updateImageStore?: Maybe<ImageStore>;
  updateImageStores?: Maybe<Array<Maybe<ImageStore>>>;
  updateKeyValue?: Maybe<KeyValue>;
  updateKeyValues?: Maybe<Array<Maybe<KeyValue>>>;
  updateMainMenu?: Maybe<MainMenu>;
  updateMainMenus?: Maybe<Array<Maybe<MainMenu>>>;
  updateOrder?: Maybe<Order>;
  updateOrders?: Maybe<Array<Maybe<Order>>>;
  updatePost?: Maybe<Post>;
  updatePostTranslation?: Maybe<PostTranslation>;
  updatePostTranslations?: Maybe<Array<Maybe<PostTranslation>>>;
  updatePosts?: Maybe<Array<Maybe<Post>>>;
  updateResource?: Maybe<Resource>;
  updateResources?: Maybe<Array<Maybe<Resource>>>;
  updateTag?: Maybe<Tag>;
  updateTags?: Maybe<Array<Maybe<Tag>>>;
  updateUser?: Maybe<User>;
  updateUsers?: Maybe<Array<Maybe<User>>>;
};


export type MutationAuthenticateUserWithPasswordArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationCreateCategoriesArgs = {
  data: Array<CategoryCreateInput>;
};


export type MutationCreateCategoryArgs = {
  data: CategoryCreateInput;
};


export type MutationCreateContactUsArgs = {
  data: ContactUsCreateInput;
};


export type MutationCreateContactusesArgs = {
  data: Array<ContactUsCreateInput>;
};


export type MutationCreateCustomerArgs = {
  data: CustomerCreateInput;
};


export type MutationCreateCustomersArgs = {
  data: Array<CustomerCreateInput>;
};


export type MutationCreateFileStoreArgs = {
  data: FileStoreCreateInput;
};


export type MutationCreateFileStoresArgs = {
  data: Array<FileStoreCreateInput>;
};


export type MutationCreateFrontPageArgs = {
  data: FrontPageCreateInput;
};


export type MutationCreateFrontPagesArgs = {
  data: Array<FrontPageCreateInput>;
};


export type MutationCreateImageStoreArgs = {
  data: ImageStoreCreateInput;
};


export type MutationCreateImageStoresArgs = {
  data: Array<ImageStoreCreateInput>;
};


export type MutationCreateInitialUserArgs = {
  data: CreateInitialUserInput;
};


export type MutationCreateKeyValueArgs = {
  data: KeyValueCreateInput;
};


export type MutationCreateKeyValuesArgs = {
  data: Array<KeyValueCreateInput>;
};


export type MutationCreateMainMenuArgs = {
  data: MainMenuCreateInput;
};


export type MutationCreateMainMenusArgs = {
  data: Array<MainMenuCreateInput>;
};


export type MutationCreateOrderArgs = {
  data: OrderCreateInput;
};


export type MutationCreateOrdersArgs = {
  data: Array<OrderCreateInput>;
};


export type MutationCreatePostArgs = {
  data: PostCreateInput;
};


export type MutationCreatePostTranslationArgs = {
  data: PostTranslationCreateInput;
};


export type MutationCreatePostTranslationsArgs = {
  data: Array<PostTranslationCreateInput>;
};


export type MutationCreatePostsArgs = {
  data: Array<PostCreateInput>;
};


export type MutationCreateResourceArgs = {
  data: ResourceCreateInput;
};


export type MutationCreateResourcesArgs = {
  data: Array<ResourceCreateInput>;
};


export type MutationCreateTagArgs = {
  data: TagCreateInput;
};


export type MutationCreateTagsArgs = {
  data: Array<TagCreateInput>;
};


export type MutationCreateUserArgs = {
  data: UserCreateInput;
};


export type MutationCreateUsersArgs = {
  data: Array<UserCreateInput>;
};


export type MutationDeleteCategoriesArgs = {
  where: Array<CategoryWhereUniqueInput>;
};


export type MutationDeleteCategoryArgs = {
  where: CategoryWhereUniqueInput;
};


export type MutationDeleteContactUsArgs = {
  where?: ContactUsWhereUniqueInput;
};


export type MutationDeleteContactusesArgs = {
  where: Array<ContactUsWhereUniqueInput>;
};


export type MutationDeleteCustomerArgs = {
  where: CustomerWhereUniqueInput;
};


export type MutationDeleteCustomersArgs = {
  where: Array<CustomerWhereUniqueInput>;
};


export type MutationDeleteFileStoreArgs = {
  where: FileStoreWhereUniqueInput;
};


export type MutationDeleteFileStoresArgs = {
  where: Array<FileStoreWhereUniqueInput>;
};


export type MutationDeleteFrontPageArgs = {
  where?: FrontPageWhereUniqueInput;
};


export type MutationDeleteFrontPagesArgs = {
  where: Array<FrontPageWhereUniqueInput>;
};


export type MutationDeleteImageStoreArgs = {
  where: ImageStoreWhereUniqueInput;
};


export type MutationDeleteImageStoresArgs = {
  where: Array<ImageStoreWhereUniqueInput>;
};


export type MutationDeleteKeyValueArgs = {
  where: KeyValueWhereUniqueInput;
};


export type MutationDeleteKeyValuesArgs = {
  where: Array<KeyValueWhereUniqueInput>;
};


export type MutationDeleteMainMenuArgs = {
  where: MainMenuWhereUniqueInput;
};


export type MutationDeleteMainMenusArgs = {
  where: Array<MainMenuWhereUniqueInput>;
};


export type MutationDeleteOrderArgs = {
  where: OrderWhereUniqueInput;
};


export type MutationDeleteOrdersArgs = {
  where: Array<OrderWhereUniqueInput>;
};


export type MutationDeletePostArgs = {
  where: PostWhereUniqueInput;
};


export type MutationDeletePostTranslationArgs = {
  where: PostTranslationWhereUniqueInput;
};


export type MutationDeletePostTranslationsArgs = {
  where: Array<PostTranslationWhereUniqueInput>;
};


export type MutationDeletePostsArgs = {
  where: Array<PostWhereUniqueInput>;
};


export type MutationDeleteResourceArgs = {
  where: ResourceWhereUniqueInput;
};


export type MutationDeleteResourcesArgs = {
  where: Array<ResourceWhereUniqueInput>;
};


export type MutationDeleteTagArgs = {
  where: TagWhereUniqueInput;
};


export type MutationDeleteTagsArgs = {
  where: Array<TagWhereUniqueInput>;
};


export type MutationDeleteUserArgs = {
  where: UserWhereUniqueInput;
};


export type MutationDeleteUsersArgs = {
  where: Array<UserWhereUniqueInput>;
};


export type MutationUpdateCategoriesArgs = {
  data: Array<CategoryUpdateArgs>;
};


export type MutationUpdateCategoryArgs = {
  data: CategoryUpdateInput;
  where: CategoryWhereUniqueInput;
};


export type MutationUpdateContactUsArgs = {
  data: ContactUsUpdateInput;
  where?: ContactUsWhereUniqueInput;
};


export type MutationUpdateContactusesArgs = {
  data: Array<ContactUsUpdateArgs>;
};


export type MutationUpdateCustomerArgs = {
  data: CustomerUpdateInput;
  where: CustomerWhereUniqueInput;
};


export type MutationUpdateCustomersArgs = {
  data: Array<CustomerUpdateArgs>;
};


export type MutationUpdateFileStoreArgs = {
  data: FileStoreUpdateInput;
  where: FileStoreWhereUniqueInput;
};


export type MutationUpdateFileStoresArgs = {
  data: Array<FileStoreUpdateArgs>;
};


export type MutationUpdateFrontPageArgs = {
  data: FrontPageUpdateInput;
  where?: FrontPageWhereUniqueInput;
};


export type MutationUpdateFrontPagesArgs = {
  data: Array<FrontPageUpdateArgs>;
};


export type MutationUpdateImageStoreArgs = {
  data: ImageStoreUpdateInput;
  where: ImageStoreWhereUniqueInput;
};


export type MutationUpdateImageStoresArgs = {
  data: Array<ImageStoreUpdateArgs>;
};


export type MutationUpdateKeyValueArgs = {
  data: KeyValueUpdateInput;
  where: KeyValueWhereUniqueInput;
};


export type MutationUpdateKeyValuesArgs = {
  data: Array<KeyValueUpdateArgs>;
};


export type MutationUpdateMainMenuArgs = {
  data: MainMenuUpdateInput;
  where: MainMenuWhereUniqueInput;
};


export type MutationUpdateMainMenusArgs = {
  data: Array<MainMenuUpdateArgs>;
};


export type MutationUpdateOrderArgs = {
  data: OrderUpdateInput;
  where: OrderWhereUniqueInput;
};


export type MutationUpdateOrdersArgs = {
  data: Array<OrderUpdateArgs>;
};


export type MutationUpdatePostArgs = {
  data: PostUpdateInput;
  where: PostWhereUniqueInput;
};


export type MutationUpdatePostTranslationArgs = {
  data: PostTranslationUpdateInput;
  where: PostTranslationWhereUniqueInput;
};


export type MutationUpdatePostTranslationsArgs = {
  data: Array<PostTranslationUpdateArgs>;
};


export type MutationUpdatePostsArgs = {
  data: Array<PostUpdateArgs>;
};


export type MutationUpdateResourceArgs = {
  data: ResourceUpdateInput;
  where: ResourceWhereUniqueInput;
};


export type MutationUpdateResourcesArgs = {
  data: Array<ResourceUpdateArgs>;
};


export type MutationUpdateTagArgs = {
  data: TagUpdateInput;
  where: TagWhereUniqueInput;
};


export type MutationUpdateTagsArgs = {
  data: Array<TagUpdateArgs>;
};


export type MutationUpdateUserArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};


export type MutationUpdateUsersArgs = {
  data: Array<UserUpdateArgs>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Order = {
  __typename?: 'Order';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  customer?: Maybe<Customer>;
  customerName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  orderContent?: Maybe<Scalars['String']['output']>;
  orderType?: Maybe<Scalars['JSON']['output']>;
};

export type OrderCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  customer?: InputMaybe<CustomerRelateToOneForCreateInput>;
  customerName?: InputMaybe<Scalars['String']['input']>;
  orderContent?: InputMaybe<Scalars['String']['input']>;
  orderType?: InputMaybe<Scalars['JSON']['input']>;
};

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type OrderManyRelationFilter = {
  every?: InputMaybe<OrderWhereInput>;
  none?: InputMaybe<OrderWhereInput>;
  some?: InputMaybe<OrderWhereInput>;
};

export type OrderOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  customerName?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  orderContent?: InputMaybe<OrderDirection>;
};

export type OrderRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<OrderWhereUniqueInput>>;
  create?: InputMaybe<Array<OrderCreateInput>>;
};

export type OrderRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<OrderWhereUniqueInput>>;
  create?: InputMaybe<Array<OrderCreateInput>>;
  disconnect?: InputMaybe<Array<OrderWhereUniqueInput>>;
  set?: InputMaybe<Array<OrderWhereUniqueInput>>;
};

export type OrderUpdateArgs = {
  data: OrderUpdateInput;
  where: OrderWhereUniqueInput;
};

export type OrderUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  customer?: InputMaybe<CustomerRelateToOneForUpdateInput>;
  customerName?: InputMaybe<Scalars['String']['input']>;
  orderContent?: InputMaybe<Scalars['String']['input']>;
  orderType?: InputMaybe<Scalars['JSON']['input']>;
};

export type OrderWhereInput = {
  AND?: InputMaybe<Array<OrderWhereInput>>;
  NOT?: InputMaybe<Array<OrderWhereInput>>;
  OR?: InputMaybe<Array<OrderWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  customer?: InputMaybe<CustomerWhereInput>;
  customerName?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  orderContent?: InputMaybe<StringFilter>;
};

export type OrderWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type PasswordState = {
  __typename?: 'PasswordState';
  isSet: Scalars['Boolean']['output'];
};

export type Post = {
  __typename?: 'Post';
  category?: Maybe<Array<Category>>;
  categoryCount?: Maybe<Scalars['Int']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  en?: Maybe<PostTranslation>;
  fa?: Maybe<PostTranslation>;
  featuredImage?: Maybe<ImageStore>;
  id: Scalars['ID']['output'];
  misc?: Maybe<Array<KeyValue>>;
  miscCount?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};


export type PostCategoryArgs = {
  cursor?: InputMaybe<CategoryWhereUniqueInput>;
  orderBy?: Array<CategoryOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: CategoryWhereInput;
};


export type PostCategoryCountArgs = {
  where?: CategoryWhereInput;
};


export type PostMiscArgs = {
  cursor?: InputMaybe<KeyValueWhereUniqueInput>;
  orderBy?: Array<KeyValueOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: KeyValueWhereInput;
};


export type PostMiscCountArgs = {
  where?: KeyValueWhereInput;
};

export type PostCreateInput = {
  category?: InputMaybe<CategoryRelateToManyForCreateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  en?: InputMaybe<PostTranslationRelateToOneForCreateInput>;
  fa?: InputMaybe<PostTranslationRelateToOneForCreateInput>;
  featuredImage?: InputMaybe<ImageStoreRelateToOneForCreateInput>;
  misc?: InputMaybe<KeyValueRelateToManyForCreateInput>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type PostManyRelationFilter = {
  every?: InputMaybe<PostWhereInput>;
  none?: InputMaybe<PostWhereInput>;
  some?: InputMaybe<PostWhereInput>;
};

export type PostOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
  type?: InputMaybe<OrderDirection>;
};

export type PostRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<PostWhereUniqueInput>>;
  create?: InputMaybe<Array<PostCreateInput>>;
};

export type PostRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<PostWhereUniqueInput>>;
  create?: InputMaybe<Array<PostCreateInput>>;
  disconnect?: InputMaybe<Array<PostWhereUniqueInput>>;
  set?: InputMaybe<Array<PostWhereUniqueInput>>;
};

export type PostRelateToOneForCreateInput = {
  connect?: InputMaybe<PostWhereUniqueInput>;
  create?: InputMaybe<PostCreateInput>;
};

export type PostRelateToOneForUpdateInput = {
  connect?: InputMaybe<PostWhereUniqueInput>;
  create?: InputMaybe<PostCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PostTranslation = {
  __typename?: 'PostTranslation';
  author?: Maybe<User>;
  content?: Maybe<PostTranslation_Content_Document>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  excerpt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  language?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<Post>;
  tags?: Maybe<Array<Tag>>;
  tagsCount?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


export type PostTranslationTagsArgs = {
  cursor?: InputMaybe<TagWhereUniqueInput>;
  orderBy?: Array<TagOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: TagWhereInput;
};


export type PostTranslationTagsCountArgs = {
  where?: TagWhereInput;
};

export type PostTranslationCreateInput = {
  author?: InputMaybe<UserRelateToOneForCreateInput>;
  content?: InputMaybe<Scalars['JSON']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<PostRelateToOneForCreateInput>;
  tags?: InputMaybe<TagRelateToManyForCreateInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type PostTranslationManyRelationFilter = {
  every?: InputMaybe<PostTranslationWhereInput>;
  none?: InputMaybe<PostTranslationWhereInput>;
  some?: InputMaybe<PostTranslationWhereInput>;
};

export type PostTranslationOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  language?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
};

export type PostTranslationRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<PostTranslationWhereUniqueInput>>;
  create?: InputMaybe<Array<PostTranslationCreateInput>>;
};

export type PostTranslationRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<PostTranslationWhereUniqueInput>>;
  create?: InputMaybe<Array<PostTranslationCreateInput>>;
  disconnect?: InputMaybe<Array<PostTranslationWhereUniqueInput>>;
  set?: InputMaybe<Array<PostTranslationWhereUniqueInput>>;
};

export type PostTranslationRelateToOneForCreateInput = {
  connect?: InputMaybe<PostTranslationWhereUniqueInput>;
  create?: InputMaybe<PostTranslationCreateInput>;
};

export type PostTranslationRelateToOneForUpdateInput = {
  connect?: InputMaybe<PostTranslationWhereUniqueInput>;
  create?: InputMaybe<PostTranslationCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PostTranslationUpdateArgs = {
  data: PostTranslationUpdateInput;
  where: PostTranslationWhereUniqueInput;
};

export type PostTranslationUpdateInput = {
  author?: InputMaybe<UserRelateToOneForUpdateInput>;
  content?: InputMaybe<Scalars['JSON']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  language?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<PostRelateToOneForUpdateInput>;
  tags?: InputMaybe<TagRelateToManyForUpdateInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type PostTranslationWhereInput = {
  AND?: InputMaybe<Array<PostTranslationWhereInput>>;
  NOT?: InputMaybe<Array<PostTranslationWhereInput>>;
  OR?: InputMaybe<Array<PostTranslationWhereInput>>;
  author?: InputMaybe<UserWhereInput>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  language?: InputMaybe<StringNullableFilter>;
  parent?: InputMaybe<PostWhereInput>;
  tags?: InputMaybe<TagManyRelationFilter>;
  title?: InputMaybe<StringFilter>;
};

export type PostTranslationWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type PostTranslation_Content_Document = {
  __typename?: 'PostTranslation_content_Document';
  document: Scalars['JSON']['output'];
};


export type PostTranslation_Content_DocumentDocumentArgs = {
  hydrateRelationships?: Scalars['Boolean']['input'];
};

export type PostUpdateArgs = {
  data: PostUpdateInput;
  where: PostWhereUniqueInput;
};

export type PostUpdateInput = {
  category?: InputMaybe<CategoryRelateToManyForUpdateInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  en?: InputMaybe<PostTranslationRelateToOneForUpdateInput>;
  fa?: InputMaybe<PostTranslationRelateToOneForUpdateInput>;
  featuredImage?: InputMaybe<ImageStoreRelateToOneForUpdateInput>;
  misc?: InputMaybe<KeyValueRelateToManyForUpdateInput>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type PostWhereInput = {
  AND?: InputMaybe<Array<PostWhereInput>>;
  NOT?: InputMaybe<Array<PostWhereInput>>;
  OR?: InputMaybe<Array<PostWhereInput>>;
  category?: InputMaybe<CategoryManyRelationFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  en?: InputMaybe<PostTranslationWhereInput>;
  fa?: InputMaybe<PostTranslationWhereInput>;
  featuredImage?: InputMaybe<ImageStoreWhereInput>;
  id?: InputMaybe<IdFilter>;
  misc?: InputMaybe<KeyValueManyRelationFilter>;
  title?: InputMaybe<StringFilter>;
  type?: InputMaybe<StringFilter>;
};

export type PostWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Query = {
  __typename?: 'Query';
  authenticatedItem?: Maybe<AuthenticatedItem>;
  categories?: Maybe<Array<Category>>;
  categoriesCount?: Maybe<Scalars['Int']['output']>;
  category?: Maybe<Category>;
  contactUs?: Maybe<ContactUs>;
  contactuses?: Maybe<Array<ContactUs>>;
  contactusesCount?: Maybe<Scalars['Int']['output']>;
  customer?: Maybe<Customer>;
  customers?: Maybe<Array<Customer>>;
  customersCount?: Maybe<Scalars['Int']['output']>;
  fileStore?: Maybe<FileStore>;
  fileStores?: Maybe<Array<FileStore>>;
  fileStoresCount?: Maybe<Scalars['Int']['output']>;
  frontPage?: Maybe<FrontPage>;
  frontPages?: Maybe<Array<FrontPage>>;
  frontPagesCount?: Maybe<Scalars['Int']['output']>;
  imageStore?: Maybe<ImageStore>;
  imageStores?: Maybe<Array<ImageStore>>;
  imageStoresCount?: Maybe<Scalars['Int']['output']>;
  keyValue?: Maybe<KeyValue>;
  keyValues?: Maybe<Array<KeyValue>>;
  keyValuesCount?: Maybe<Scalars['Int']['output']>;
  keystone: KeystoneMeta;
  mainMenu?: Maybe<MainMenu>;
  mainMenus?: Maybe<Array<MainMenu>>;
  mainMenusCount?: Maybe<Scalars['Int']['output']>;
  order?: Maybe<Order>;
  orders?: Maybe<Array<Order>>;
  ordersCount?: Maybe<Scalars['Int']['output']>;
  post?: Maybe<Post>;
  postTranslation?: Maybe<PostTranslation>;
  postTranslations?: Maybe<Array<PostTranslation>>;
  postTranslationsCount?: Maybe<Scalars['Int']['output']>;
  posts?: Maybe<Array<Post>>;
  postsCount?: Maybe<Scalars['Int']['output']>;
  resource?: Maybe<Resource>;
  resources?: Maybe<Array<Resource>>;
  resourcesCount?: Maybe<Scalars['Int']['output']>;
  tag?: Maybe<Tag>;
  tags?: Maybe<Array<Tag>>;
  tagsCount?: Maybe<Scalars['Int']['output']>;
  user?: Maybe<User>;
  users?: Maybe<Array<User>>;
  usersCount?: Maybe<Scalars['Int']['output']>;
};


export type QueryCategoriesArgs = {
  cursor?: InputMaybe<CategoryWhereUniqueInput>;
  orderBy?: Array<CategoryOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: CategoryWhereInput;
};


export type QueryCategoriesCountArgs = {
  where?: CategoryWhereInput;
};


export type QueryCategoryArgs = {
  where: CategoryWhereUniqueInput;
};


export type QueryContactUsArgs = {
  where?: ContactUsWhereUniqueInput;
};


export type QueryContactusesArgs = {
  cursor?: InputMaybe<ContactUsWhereUniqueInput>;
  orderBy?: Array<ContactUsOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ContactUsWhereInput;
};


export type QueryContactusesCountArgs = {
  where?: ContactUsWhereInput;
};


export type QueryCustomerArgs = {
  where: CustomerWhereUniqueInput;
};


export type QueryCustomersArgs = {
  cursor?: InputMaybe<CustomerWhereUniqueInput>;
  orderBy?: Array<CustomerOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: CustomerWhereInput;
};


export type QueryCustomersCountArgs = {
  where?: CustomerWhereInput;
};


export type QueryFileStoreArgs = {
  where: FileStoreWhereUniqueInput;
};


export type QueryFileStoresArgs = {
  cursor?: InputMaybe<FileStoreWhereUniqueInput>;
  orderBy?: Array<FileStoreOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: FileStoreWhereInput;
};


export type QueryFileStoresCountArgs = {
  where?: FileStoreWhereInput;
};


export type QueryFrontPageArgs = {
  where?: FrontPageWhereUniqueInput;
};


export type QueryFrontPagesArgs = {
  cursor?: InputMaybe<FrontPageWhereUniqueInput>;
  orderBy?: Array<FrontPageOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: FrontPageWhereInput;
};


export type QueryFrontPagesCountArgs = {
  where?: FrontPageWhereInput;
};


export type QueryImageStoreArgs = {
  where: ImageStoreWhereUniqueInput;
};


export type QueryImageStoresArgs = {
  cursor?: InputMaybe<ImageStoreWhereUniqueInput>;
  orderBy?: Array<ImageStoreOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ImageStoreWhereInput;
};


export type QueryImageStoresCountArgs = {
  where?: ImageStoreWhereInput;
};


export type QueryKeyValueArgs = {
  where: KeyValueWhereUniqueInput;
};


export type QueryKeyValuesArgs = {
  cursor?: InputMaybe<KeyValueWhereUniqueInput>;
  orderBy?: Array<KeyValueOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: KeyValueWhereInput;
};


export type QueryKeyValuesCountArgs = {
  where?: KeyValueWhereInput;
};


export type QueryMainMenuArgs = {
  where: MainMenuWhereUniqueInput;
};


export type QueryMainMenusArgs = {
  cursor?: InputMaybe<MainMenuWhereUniqueInput>;
  orderBy?: Array<MainMenuOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: MainMenuWhereInput;
};


export type QueryMainMenusCountArgs = {
  where?: MainMenuWhereInput;
};


export type QueryOrderArgs = {
  where: OrderWhereUniqueInput;
};


export type QueryOrdersArgs = {
  cursor?: InputMaybe<OrderWhereUniqueInput>;
  orderBy?: Array<OrderOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: OrderWhereInput;
};


export type QueryOrdersCountArgs = {
  where?: OrderWhereInput;
};


export type QueryPostArgs = {
  where: PostWhereUniqueInput;
};


export type QueryPostTranslationArgs = {
  where: PostTranslationWhereUniqueInput;
};


export type QueryPostTranslationsArgs = {
  cursor?: InputMaybe<PostTranslationWhereUniqueInput>;
  orderBy?: Array<PostTranslationOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: PostTranslationWhereInput;
};


export type QueryPostTranslationsCountArgs = {
  where?: PostTranslationWhereInput;
};


export type QueryPostsArgs = {
  cursor?: InputMaybe<PostWhereUniqueInput>;
  orderBy?: Array<PostOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: PostWhereInput;
};


export type QueryPostsCountArgs = {
  where?: PostWhereInput;
};


export type QueryResourceArgs = {
  where: ResourceWhereUniqueInput;
};


export type QueryResourcesArgs = {
  cursor?: InputMaybe<ResourceWhereUniqueInput>;
  orderBy?: Array<ResourceOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ResourceWhereInput;
};


export type QueryResourcesCountArgs = {
  where?: ResourceWhereInput;
};


export type QueryTagArgs = {
  where: TagWhereUniqueInput;
};


export type QueryTagsArgs = {
  cursor?: InputMaybe<TagWhereUniqueInput>;
  orderBy?: Array<TagOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: TagWhereInput;
};


export type QueryTagsCountArgs = {
  where?: TagWhereInput;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  orderBy?: Array<UserOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: UserWhereInput;
};


export type QueryUsersCountArgs = {
  where?: UserWhereInput;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type Resource = {
  __typename?: 'Resource';
  bannerImage?: Maybe<ImageStore>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  featuredImage?: Maybe<ImageStore>;
  id: Scalars['ID']['output'];
  misc?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type ResourceCreateInput = {
  bannerImage?: InputMaybe<ImageStoreRelateToOneForCreateInput>;
  content?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  featuredImage?: InputMaybe<ImageStoreRelateToOneForCreateInput>;
  misc?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ResourceOrderByInput = {
  content?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  misc?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
};

export type ResourceRelateToOneForCreateInput = {
  connect?: InputMaybe<ResourceWhereUniqueInput>;
  create?: InputMaybe<ResourceCreateInput>;
};

export type ResourceRelateToOneForUpdateInput = {
  connect?: InputMaybe<ResourceWhereUniqueInput>;
  create?: InputMaybe<ResourceCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ResourceUpdateArgs = {
  data: ResourceUpdateInput;
  where: ResourceWhereUniqueInput;
};

export type ResourceUpdateInput = {
  bannerImage?: InputMaybe<ImageStoreRelateToOneForUpdateInput>;
  content?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  featuredImage?: InputMaybe<ImageStoreRelateToOneForUpdateInput>;
  misc?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ResourceWhereInput = {
  AND?: InputMaybe<Array<ResourceWhereInput>>;
  NOT?: InputMaybe<Array<ResourceWhereInput>>;
  OR?: InputMaybe<Array<ResourceWhereInput>>;
  bannerImage?: InputMaybe<ImageStoreWhereInput>;
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  featuredImage?: InputMaybe<ImageStoreWhereInput>;
  id?: InputMaybe<IdFilter>;
  misc?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type ResourceWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<StringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  posts?: Maybe<Array<PostTranslation>>;
  postsCount?: Maybe<Scalars['Int']['output']>;
};


export type TagPostsArgs = {
  cursor?: InputMaybe<PostTranslationWhereUniqueInput>;
  orderBy?: Array<PostTranslationOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: PostTranslationWhereInput;
};


export type TagPostsCountArgs = {
  where?: PostTranslationWhereInput;
};

export type TagCreateInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  posts?: InputMaybe<PostTranslationRelateToManyForCreateInput>;
};

export type TagManyRelationFilter = {
  every?: InputMaybe<TagWhereInput>;
  none?: InputMaybe<TagWhereInput>;
  some?: InputMaybe<TagWhereInput>;
};

export type TagOrderByInput = {
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
};

export type TagRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<TagWhereUniqueInput>>;
  create?: InputMaybe<Array<TagCreateInput>>;
};

export type TagRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<TagWhereUniqueInput>>;
  create?: InputMaybe<Array<TagCreateInput>>;
  disconnect?: InputMaybe<Array<TagWhereUniqueInput>>;
  set?: InputMaybe<Array<TagWhereUniqueInput>>;
};

export type TagUpdateArgs = {
  data: TagUpdateInput;
  where: TagWhereUniqueInput;
};

export type TagUpdateInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  posts?: InputMaybe<PostTranslationRelateToManyForUpdateInput>;
};

export type TagWhereInput = {
  AND?: InputMaybe<Array<TagWhereInput>>;
  NOT?: InputMaybe<Array<TagWhereInput>>;
  OR?: InputMaybe<Array<TagWhereInput>>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  posts?: InputMaybe<PostTranslationManyRelationFilter>;
};

export type TagWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  password?: Maybe<PasswordState>;
  posts?: Maybe<Array<PostTranslation>>;
  postsCount?: Maybe<Scalars['Int']['output']>;
  role?: Maybe<Scalars['String']['output']>;
};


export type UserPostsArgs = {
  cursor?: InputMaybe<PostTranslationWhereUniqueInput>;
  orderBy?: Array<PostTranslationOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: PostTranslationWhereInput;
};


export type UserPostsCountArgs = {
  where?: PostTranslationWhereInput;
};

export type UserAuthenticationWithPasswordFailure = {
  __typename?: 'UserAuthenticationWithPasswordFailure';
  message: Scalars['String']['output'];
};

export type UserAuthenticationWithPasswordResult = UserAuthenticationWithPasswordFailure | UserAuthenticationWithPasswordSuccess;

export type UserAuthenticationWithPasswordSuccess = {
  __typename?: 'UserAuthenticationWithPasswordSuccess';
  item: User;
  sessionToken: Scalars['String']['output'];
};

export type UserCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  posts?: InputMaybe<PostTranslationRelateToManyForCreateInput>;
  role?: InputMaybe<Scalars['String']['input']>;
};

export type UserOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  email?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  role?: InputMaybe<OrderDirection>;
};

export type UserRelateToOneForCreateInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  create?: InputMaybe<UserCreateInput>;
};

export type UserRelateToOneForUpdateInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  create?: InputMaybe<UserCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UserUpdateArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};

export type UserUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  posts?: InputMaybe<PostTranslationRelateToManyForUpdateInput>;
  role?: InputMaybe<Scalars['String']['input']>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  posts?: InputMaybe<PostTranslationManyRelationFilter>;
  role?: InputMaybe<StringNullableFilter>;
};

export type UserWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type TopMenuQueryVariables = Exact<{ [key: string]: never; }>;


export type TopMenuQuery = { __typename?: 'Query', mainMenus?: Array<{ __typename?: 'MainMenu', id: string, link?: string | null, priority?: number | null, en?: { __typename?: 'Resource', title?: string | null, content?: string | null } | null, fa?: { __typename?: 'Resource', title?: string | null, content?: string | null } | null }> | null, contactUs?: { __typename?: 'ContactUs', email?: string | null, instagram?: string | null, tel?: string | null, telegram?: string | null, whatsapp?: string | null, bale?: string | null, address?: string | null, addressFa?: string | null, shortDescription?: string | null, shortDescriptionFa?: string | null } | null };

export type BlogsQueryVariables = Exact<{
  isEn: Scalars['Boolean']['input'];
}>;


export type BlogsQuery = { __typename?: 'Query', categories?: Array<{ __typename?: 'Category', id: string, slug?: string | null, en?: { __typename?: 'Resource', content?: string | null, title?: string | null } | null, fa?: { __typename?: 'Resource', content?: string | null, title?: string | null } | null, posts?: Array<{ __typename?: 'Post', id: string, createdAt?: any | null, featuredImage?: { __typename?: 'ImageStore', image?: { __typename?: 'ImageFieldOutput', url: string } | null } | null, en?: { __typename?: 'PostTranslation', id: string, title?: string | null, excerpt?: string | null } | null, fa?: { __typename?: 'PostTranslation', id: string, title?: string | null, excerpt?: string | null } | null }> | null }> | null };

export type CategoryByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  isEn: Scalars['Boolean']['input'];
}>;


export type CategoryByIdQuery = { __typename?: 'Query', category?: { __typename?: 'Category', id: string, slug?: string | null, en?: { __typename?: 'Resource', content?: string | null, title?: string | null } | null, fa?: { __typename?: 'Resource', content?: string | null, title?: string | null } | null, posts?: Array<{ __typename?: 'Post', id: string, featuredImage?: { __typename?: 'ImageStore', image?: { __typename?: 'ImageFieldOutput', url: string } | null } | null, en?: { __typename?: 'PostTranslation', title?: string | null, excerpt?: string | null } | null, fa?: { __typename?: 'PostTranslation', title?: string | null, excerpt?: string | null } | null }> | null } | null };

export type ContactUsQueryVariables = Exact<{
  isEn: Scalars['Boolean']['input'];
}>;


export type ContactUsQuery = { __typename?: 'Query', contactUs?: { __typename?: 'ContactUs', address?: string | null, addressFa?: string | null, bale?: string | null, email?: string | null, instagram?: string | null, lat?: string | null, long?: string | null, telegram?: string | null, whatsapp?: string | null, aboutFa?: { __typename?: 'ContactUs_aboutFa_Document', document: any } | null, aboutUs?: { __typename?: 'ContactUs_aboutUs_Document', document: any } | null } | null };

export type HomePageQueryVariables = Exact<{
  isEn: Scalars['Boolean']['input'];
}>;


export type HomePageQuery = { __typename?: 'Query', frontPage?: { __typename?: 'FrontPage', meta_en?: { __typename?: 'Resource', title?: string | null, content?: string | null } | null, meta_fa?: { __typename?: 'Resource', title?: string | null, content?: string | null } | null, hero_en?: { __typename?: 'Resource', title?: string | null, content?: string | null } | null, hero_fa?: { __typename?: 'Resource', title?: string | null, content?: string | null } | null, heroImage?: Array<{ __typename?: 'ImageStore', altText?: string | null, id: string, image?: { __typename?: 'ImageFieldOutput', id: string, url: string } | null }> | null, consortiumImages?: Array<{ __typename?: 'ImageStore', id: string, image?: { __typename?: 'ImageFieldOutput', id: string, url: string } | null }> | null, consortiumIntro_en?: { __typename?: 'Resource', title?: string | null, content?: string | null } | null, consortiumIntro_fa?: { __typename?: 'Resource', title?: string | null, content?: string | null } | null, consortiumCEOSignatureImage?: { __typename?: 'ImageStore', id: string, image?: { __typename?: 'ImageFieldOutput', id: string, url: string } | null } | null, statusTitleAndDescription_fa?: { __typename?: 'Resource', title?: string | null, content?: string | null } | null, statusTitleAndDescription_en?: { __typename?: 'Resource', title?: string | null, content?: string | null } | null, statistics?: Array<{ __typename?: 'Post', id: string, title?: string | null, en?: { __typename?: 'PostTranslation', title?: string | null, content?: { __typename?: 'PostTranslation_content_Document', document: any } | null } | null, fa?: { __typename?: 'PostTranslation', title?: string | null, content?: { __typename?: 'PostTranslation_content_Document', document: any } | null } | null, misc?: Array<{ __typename?: 'KeyValue', id: string, key?: string | null, value?: string | null }> | null }> | null, introVideo?: { __typename?: 'FileStore', file?: { __typename?: 'FileFieldOutput', url: string } | null } | null, introVideoTitle_en?: { __typename?: 'Resource', title?: string | null, content?: string | null } | null, introVideoTitle_fa?: { __typename?: 'Resource', title?: string | null, content?: string | null } | null, sites?: { __typename?: 'Category', posts?: Array<{ __typename?: 'Post', fa?: { __typename?: 'PostTranslation', id: string, title?: string | null, excerpt?: string | null } | null, en?: { __typename?: 'PostTranslation', id: string, title?: string | null, excerpt?: string | null } | null, featuredImage?: { __typename?: 'ImageStore', id: string, image?: { __typename?: 'ImageFieldOutput', id: string, url: string } | null } | null }> | null } | null, features?: { __typename?: 'Category', posts?: Array<{ __typename?: 'Post', fa?: { __typename?: 'PostTranslation', id: string, title?: string | null, excerpt?: string | null } | null, en?: { __typename?: 'PostTranslation', id: string, title?: string | null, excerpt?: string | null } | null, featuredImage?: { __typename?: 'ImageStore', id: string, image?: { __typename?: 'ImageFieldOutput', id: string, url: string } | null } | null }> | null } | null, testimonial?: { __typename?: 'Category', posts?: Array<{ __typename?: 'Post', fa?: { __typename?: 'PostTranslation', id: string, title?: string | null, excerpt?: string | null } | null, en?: { __typename?: 'PostTranslation', id: string, title?: string | null, excerpt?: string | null } | null, featuredImage?: { __typename?: 'ImageStore', id: string, image?: { __typename?: 'ImageFieldOutput', id: string, url: string } | null } | null, misc?: Array<{ __typename?: 'KeyValue', key?: string | null, value?: string | null }> | null }> | null } | null, testimonial_bg_image?: { __typename?: 'ImageStore', id: string, altText?: string | null, image?: { __typename?: 'ImageFieldOutput', url: string, id: string } | null } | null, logos?: Array<{ __typename?: 'ImageStore', id: string, altText?: string | null, image?: { __typename?: 'ImageFieldOutput', url: string } | null }> | null, blogTitleAndDescription_en?: { __typename?: 'Resource', title?: string | null, content?: string | null } | null, blogTitleAndDescription_fa?: { __typename?: 'Resource', title?: string | null, content?: string | null } | null, blog?: { __typename?: 'Category', posts?: Array<{ __typename?: 'Post', id: string, featuredImage?: { __typename?: 'ImageStore', id: string, image?: { __typename?: 'ImageFieldOutput', id: string, url: string } | null } | null, fa?: { __typename?: 'PostTranslation', title?: string | null, excerpt?: string | null } | null, en?: { __typename?: 'PostTranslation', title?: string | null, excerpt?: string | null } | null }> | null } | null } | null };

export type PostFullQueryVariables = Exact<{
  where: PostWhereUniqueInput;
  isEn: Scalars['Boolean']['input'];
}>;


export type PostFullQuery = { __typename?: 'Query', post?: { __typename?: 'Post', id: string, createdAt?: any | null, featuredImage?: { __typename?: 'ImageStore', altText?: string | null, image?: { __typename?: 'ImageFieldOutput', url: string } | null } | null, en?: { __typename?: 'PostTranslation', title?: string | null, content?: { __typename?: 'PostTranslation_content_Document', document: any } | null } | null, fa?: { __typename?: 'PostTranslation', title?: string | null, content?: { __typename?: 'PostTranslation_content_Document', document: any } | null } | null } | null };


export const TopMenuDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"topMenu"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mainMenus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"en"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}},{"kind":"Field","name":{"kind":"Name","value":"fa"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"contactUs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"instagram"}},{"kind":"Field","name":{"kind":"Name","value":"tel"}},{"kind":"Field","name":{"kind":"Name","value":"telegram"}},{"kind":"Field","name":{"kind":"Name","value":"whatsapp"}},{"kind":"Field","name":{"kind":"Name","value":"bale"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"addressFa"}},{"kind":"Field","name":{"kind":"Name","value":"shortDescription"}},{"kind":"Field","name":{"kind":"Name","value":"shortDescriptionFa"}}]}}]}}]} as unknown as DocumentNode<TopMenuQuery, TopMenuQueryVariables>;
export const BlogsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Blogs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isEn"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"slug"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"equals"},"value":{"kind":"StringValue","value":"blog","block":false}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"en"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isEn"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"fa"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"skip"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isEn"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"en"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isEn"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"excerpt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"fa"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"skip"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isEn"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"excerpt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<BlogsQuery, BlogsQueryVariables>;
export const CategoryByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CategoryByID"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isEn"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"en"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isEn"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"fa"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"skip"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isEn"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"en"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isEn"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"excerpt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"fa"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"skip"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isEn"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"excerpt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CategoryByIdQuery, CategoryByIdQueryVariables>;
export const ContactUsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"contactUs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isEn"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contactUs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aboutFa"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"skip"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isEn"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"document"}}]}},{"kind":"Field","name":{"kind":"Name","value":"aboutUs"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isEn"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"document"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"addressFa"}},{"kind":"Field","name":{"kind":"Name","value":"bale"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"instagram"}},{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"long"}},{"kind":"Field","name":{"kind":"Name","value":"telegram"}},{"kind":"Field","name":{"kind":"Name","value":"whatsapp"}}]}}]}}]} as unknown as DocumentNode<ContactUsQuery, ContactUsQueryVariables>;
export const HomePageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HomePage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isEn"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"frontPage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta_en"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isEn"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta_fa"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"skip"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isEn"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hero_en"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isEn"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hero_fa"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"skip"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isEn"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}},{"kind":"Field","name":{"kind":"Name","value":"heroImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"consortiumImages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"consortiumIntro_en"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isEn"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}},{"kind":"Field","name":{"kind":"Name","value":"consortiumIntro_fa"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"skip"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isEn"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}},{"kind":"Field","name":{"kind":"Name","value":"consortiumCEOSignatureImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"statusTitleAndDescription_fa"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"skip"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isEn"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}},{"kind":"Field","name":{"kind":"Name","value":"statusTitleAndDescription_en"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isEn"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}},{"kind":"Field","name":{"kind":"Name","value":"statistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"en"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isEn"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"document"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"fa"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"skip"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isEn"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"document"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"misc"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"introVideo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"file"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"introVideoTitle_en"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isEn"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}},{"kind":"Field","name":{"kind":"Name","value":"introVideoTitle_fa"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"skip"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isEn"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sites"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fa"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"skip"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isEn"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"excerpt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"en"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isEn"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"excerpt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"features"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fa"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"skip"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isEn"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"excerpt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"en"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isEn"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"excerpt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"testimonial"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fa"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"skip"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isEn"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"excerpt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"en"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isEn"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"excerpt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"misc"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"testimonial_bg_image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"logos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"blogTitleAndDescription_en"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isEn"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}},{"kind":"Field","name":{"kind":"Name","value":"blogTitleAndDescription_fa"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"skip"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isEn"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}},{"kind":"Field","name":{"kind":"Name","value":"blog"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"fa"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"skip"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isEn"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"excerpt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"en"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isEn"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"excerpt"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<HomePageQuery, HomePageQueryVariables>;
export const PostFullDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PostFull"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PostWhereUniqueInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isEn"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"post"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"en"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isEn"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"document"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"fa"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"skip"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isEn"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"document"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PostFullQuery, PostFullQueryVariables>;