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

export type FrontPage = {
  __typename?: 'FrontPage';
  BlogDescription?: Maybe<Scalars['String']['output']>;
  BlogTitle?: Maybe<Scalars['String']['output']>;
  features?: Maybe<Array<Resource>>;
  featuresCount?: Maybe<Scalars['Int']['output']>;
  featuresDescription?: Maybe<Scalars['String']['output']>;
  featuresTitle?: Maybe<Scalars['String']['output']>;
  headline?: Maybe<Scalars['String']['output']>;
  heroDescription?: Maybe<Scalars['String']['output']>;
  heroImage?: Maybe<ImageStore>;
  heroTitle?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lang?: Maybe<Scalars['String']['output']>;
  logos?: Maybe<Array<ImageStore>>;
  logosCount?: Maybe<Scalars['Int']['output']>;
  sites?: Maybe<Array<Resource>>;
  sitesCount?: Maybe<Scalars['Int']['output']>;
  statistics?: Maybe<Array<Resource>>;
  statisticsCount?: Maybe<Scalars['Int']['output']>;
  statusDescription?: Maybe<Scalars['String']['output']>;
  statusTitle?: Maybe<Scalars['String']['output']>;
  testimonial?: Maybe<Array<Resource>>;
  testimonialCount?: Maybe<Scalars['Int']['output']>;
};


export type FrontPageFeaturesArgs = {
  cursor?: InputMaybe<ResourceWhereUniqueInput>;
  orderBy?: Array<ResourceOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ResourceWhereInput;
};


export type FrontPageFeaturesCountArgs = {
  where?: ResourceWhereInput;
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


export type FrontPageSitesArgs = {
  cursor?: InputMaybe<ResourceWhereUniqueInput>;
  orderBy?: Array<ResourceOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ResourceWhereInput;
};


export type FrontPageSitesCountArgs = {
  where?: ResourceWhereInput;
};


export type FrontPageStatisticsArgs = {
  cursor?: InputMaybe<ResourceWhereUniqueInput>;
  orderBy?: Array<ResourceOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ResourceWhereInput;
};


export type FrontPageStatisticsCountArgs = {
  where?: ResourceWhereInput;
};


export type FrontPageTestimonialArgs = {
  cursor?: InputMaybe<ResourceWhereUniqueInput>;
  orderBy?: Array<ResourceOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ResourceWhereInput;
};


export type FrontPageTestimonialCountArgs = {
  where?: ResourceWhereInput;
};

export type FrontPageCreateInput = {
  BlogDescription?: InputMaybe<Scalars['String']['input']>;
  BlogTitle?: InputMaybe<Scalars['String']['input']>;
  features?: InputMaybe<ResourceRelateToManyForCreateInput>;
  featuresDescription?: InputMaybe<Scalars['String']['input']>;
  featuresTitle?: InputMaybe<Scalars['String']['input']>;
  headline?: InputMaybe<Scalars['String']['input']>;
  heroDescription?: InputMaybe<Scalars['String']['input']>;
  heroImage?: InputMaybe<ImageStoreRelateToOneForCreateInput>;
  heroTitle?: InputMaybe<Scalars['String']['input']>;
  lang?: InputMaybe<Scalars['String']['input']>;
  logos?: InputMaybe<ImageStoreRelateToManyForCreateInput>;
  sites?: InputMaybe<ResourceRelateToManyForCreateInput>;
  statistics?: InputMaybe<ResourceRelateToManyForCreateInput>;
  statusDescription?: InputMaybe<Scalars['String']['input']>;
  statusTitle?: InputMaybe<Scalars['String']['input']>;
  testimonial?: InputMaybe<ResourceRelateToManyForCreateInput>;
};

export type FrontPageOrderByInput = {
  BlogDescription?: InputMaybe<OrderDirection>;
  BlogTitle?: InputMaybe<OrderDirection>;
  featuresDescription?: InputMaybe<OrderDirection>;
  featuresTitle?: InputMaybe<OrderDirection>;
  headline?: InputMaybe<OrderDirection>;
  heroDescription?: InputMaybe<OrderDirection>;
  heroTitle?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  lang?: InputMaybe<OrderDirection>;
  statusDescription?: InputMaybe<OrderDirection>;
  statusTitle?: InputMaybe<OrderDirection>;
};

export type FrontPageUpdateArgs = {
  data: FrontPageUpdateInput;
  where: FrontPageWhereUniqueInput;
};

export type FrontPageUpdateInput = {
  BlogDescription?: InputMaybe<Scalars['String']['input']>;
  BlogTitle?: InputMaybe<Scalars['String']['input']>;
  features?: InputMaybe<ResourceRelateToManyForUpdateInput>;
  featuresDescription?: InputMaybe<Scalars['String']['input']>;
  featuresTitle?: InputMaybe<Scalars['String']['input']>;
  headline?: InputMaybe<Scalars['String']['input']>;
  heroDescription?: InputMaybe<Scalars['String']['input']>;
  heroImage?: InputMaybe<ImageStoreRelateToOneForUpdateInput>;
  heroTitle?: InputMaybe<Scalars['String']['input']>;
  lang?: InputMaybe<Scalars['String']['input']>;
  logos?: InputMaybe<ImageStoreRelateToManyForUpdateInput>;
  sites?: InputMaybe<ResourceRelateToManyForUpdateInput>;
  statistics?: InputMaybe<ResourceRelateToManyForUpdateInput>;
  statusDescription?: InputMaybe<Scalars['String']['input']>;
  statusTitle?: InputMaybe<Scalars['String']['input']>;
  testimonial?: InputMaybe<ResourceRelateToManyForUpdateInput>;
};

export type FrontPageWhereInput = {
  AND?: InputMaybe<Array<FrontPageWhereInput>>;
  BlogDescription?: InputMaybe<StringFilter>;
  BlogTitle?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<FrontPageWhereInput>>;
  OR?: InputMaybe<Array<FrontPageWhereInput>>;
  features?: InputMaybe<ResourceManyRelationFilter>;
  featuresDescription?: InputMaybe<StringFilter>;
  featuresTitle?: InputMaybe<StringFilter>;
  headline?: InputMaybe<StringFilter>;
  heroDescription?: InputMaybe<StringFilter>;
  heroImage?: InputMaybe<ImageStoreWhereInput>;
  heroTitle?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  lang?: InputMaybe<StringNullableFilter>;
  logos?: InputMaybe<ImageStoreManyRelationFilter>;
  sites?: InputMaybe<ResourceManyRelationFilter>;
  statistics?: InputMaybe<ResourceManyRelationFilter>;
  statusDescription?: InputMaybe<StringFilter>;
  statusTitle?: InputMaybe<StringFilter>;
  testimonial?: InputMaybe<ResourceManyRelationFilter>;
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
};

export type MainMenuCreateInput = {
  en?: InputMaybe<ResourceRelateToOneForCreateInput>;
  fa?: InputMaybe<ResourceRelateToOneForCreateInput>;
  link?: InputMaybe<Scalars['String']['input']>;
};

export type MainMenuOrderByInput = {
  id?: InputMaybe<OrderDirection>;
  link?: InputMaybe<OrderDirection>;
};

export type MainMenuUpdateArgs = {
  data: MainMenuUpdateInput;
  where: MainMenuWhereUniqueInput;
};

export type MainMenuUpdateInput = {
  en?: InputMaybe<ResourceRelateToOneForUpdateInput>;
  fa?: InputMaybe<ResourceRelateToOneForUpdateInput>;
  link?: InputMaybe<Scalars['String']['input']>;
};

export type MainMenuWhereInput = {
  AND?: InputMaybe<Array<MainMenuWhereInput>>;
  NOT?: InputMaybe<Array<MainMenuWhereInput>>;
  OR?: InputMaybe<Array<MainMenuWhereInput>>;
  en?: InputMaybe<ResourceWhereInput>;
  fa?: InputMaybe<ResourceWhereInput>;
  id?: InputMaybe<IdFilter>;
  link?: InputMaybe<StringFilter>;
};

export type MainMenuWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  authenticateUserWithPassword?: Maybe<UserAuthenticationWithPasswordResult>;
  createContactUs?: Maybe<ContactUs>;
  createContactuses?: Maybe<Array<Maybe<ContactUs>>>;
  createFrontPage?: Maybe<FrontPage>;
  createFrontPages?: Maybe<Array<Maybe<FrontPage>>>;
  createImageStore?: Maybe<ImageStore>;
  createImageStores?: Maybe<Array<Maybe<ImageStore>>>;
  createInitialUser: UserAuthenticationWithPasswordSuccess;
  createMainMenu?: Maybe<MainMenu>;
  createMainMenus?: Maybe<Array<Maybe<MainMenu>>>;
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
  deleteContactUs?: Maybe<ContactUs>;
  deleteContactuses?: Maybe<Array<Maybe<ContactUs>>>;
  deleteFrontPage?: Maybe<FrontPage>;
  deleteFrontPages?: Maybe<Array<Maybe<FrontPage>>>;
  deleteImageStore?: Maybe<ImageStore>;
  deleteImageStores?: Maybe<Array<Maybe<ImageStore>>>;
  deleteMainMenu?: Maybe<MainMenu>;
  deleteMainMenus?: Maybe<Array<Maybe<MainMenu>>>;
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
  updateContactUs?: Maybe<ContactUs>;
  updateContactuses?: Maybe<Array<Maybe<ContactUs>>>;
  updateFrontPage?: Maybe<FrontPage>;
  updateFrontPages?: Maybe<Array<Maybe<FrontPage>>>;
  updateImageStore?: Maybe<ImageStore>;
  updateImageStores?: Maybe<Array<Maybe<ImageStore>>>;
  updateMainMenu?: Maybe<MainMenu>;
  updateMainMenus?: Maybe<Array<Maybe<MainMenu>>>;
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


export type MutationCreateContactUsArgs = {
  data: ContactUsCreateInput;
};


export type MutationCreateContactusesArgs = {
  data: Array<ContactUsCreateInput>;
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


export type MutationCreateMainMenuArgs = {
  data: MainMenuCreateInput;
};


export type MutationCreateMainMenusArgs = {
  data: Array<MainMenuCreateInput>;
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


export type MutationDeleteContactUsArgs = {
  where?: ContactUsWhereUniqueInput;
};


export type MutationDeleteContactusesArgs = {
  where: Array<ContactUsWhereUniqueInput>;
};


export type MutationDeleteFrontPageArgs = {
  where: FrontPageWhereUniqueInput;
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


export type MutationDeleteMainMenuArgs = {
  where: MainMenuWhereUniqueInput;
};


export type MutationDeleteMainMenusArgs = {
  where: Array<MainMenuWhereUniqueInput>;
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


export type MutationUpdateContactUsArgs = {
  data: ContactUsUpdateInput;
  where?: ContactUsWhereUniqueInput;
};


export type MutationUpdateContactusesArgs = {
  data: Array<ContactUsUpdateArgs>;
};


export type MutationUpdateFrontPageArgs = {
  data: FrontPageUpdateInput;
  where: FrontPageWhereUniqueInput;
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


export type MutationUpdateMainMenuArgs = {
  data: MainMenuUpdateInput;
  where: MainMenuWhereUniqueInput;
};


export type MutationUpdateMainMenusArgs = {
  data: Array<MainMenuUpdateArgs>;
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

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type PasswordState = {
  __typename?: 'PasswordState';
  isSet: Scalars['Boolean']['output'];
};

export type Post = {
  __typename?: 'Post';
  category?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  en?: Maybe<PostTranslation>;
  fa?: Maybe<PostTranslation>;
  featuredImage?: Maybe<ImageStore>;
  id: Scalars['ID']['output'];
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type PostCreateInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  en?: InputMaybe<PostTranslationRelateToOneForCreateInput>;
  fa?: InputMaybe<PostTranslationRelateToOneForCreateInput>;
  featuredImage?: InputMaybe<ImageStoreRelateToOneForCreateInput>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type PostOrderByInput = {
  category?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
  type?: InputMaybe<OrderDirection>;
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
  category?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  en?: InputMaybe<PostTranslationRelateToOneForUpdateInput>;
  fa?: InputMaybe<PostTranslationRelateToOneForUpdateInput>;
  featuredImage?: InputMaybe<ImageStoreRelateToOneForUpdateInput>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type PostWhereInput = {
  AND?: InputMaybe<Array<PostWhereInput>>;
  NOT?: InputMaybe<Array<PostWhereInput>>;
  OR?: InputMaybe<Array<PostWhereInput>>;
  category?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  en?: InputMaybe<PostTranslationWhereInput>;
  fa?: InputMaybe<PostTranslationWhereInput>;
  featuredImage?: InputMaybe<ImageStoreWhereInput>;
  id?: InputMaybe<IdFilter>;
  title?: InputMaybe<StringFilter>;
  type?: InputMaybe<StringFilter>;
};

export type PostWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Query = {
  __typename?: 'Query';
  authenticatedItem?: Maybe<AuthenticatedItem>;
  contactUs?: Maybe<ContactUs>;
  contactuses?: Maybe<Array<ContactUs>>;
  contactusesCount?: Maybe<Scalars['Int']['output']>;
  frontPage?: Maybe<FrontPage>;
  frontPages?: Maybe<Array<FrontPage>>;
  frontPagesCount?: Maybe<Scalars['Int']['output']>;
  imageStore?: Maybe<ImageStore>;
  imageStores?: Maybe<Array<ImageStore>>;
  imageStoresCount?: Maybe<Scalars['Int']['output']>;
  keystone: KeystoneMeta;
  mainMenu?: Maybe<MainMenu>;
  mainMenus?: Maybe<Array<MainMenu>>;
  mainMenusCount?: Maybe<Scalars['Int']['output']>;
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


export type QueryFrontPageArgs = {
  where: FrontPageWhereUniqueInput;
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

export type ResourceManyRelationFilter = {
  every?: InputMaybe<ResourceWhereInput>;
  none?: InputMaybe<ResourceWhereInput>;
  some?: InputMaybe<ResourceWhereInput>;
};

export type ResourceOrderByInput = {
  content?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  misc?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
};

export type ResourceRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<ResourceWhereUniqueInput>>;
  create?: InputMaybe<Array<ResourceCreateInput>>;
};

export type ResourceRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<ResourceWhereUniqueInput>>;
  create?: InputMaybe<Array<ResourceCreateInput>>;
  disconnect?: InputMaybe<Array<ResourceWhereUniqueInput>>;
  set?: InputMaybe<Array<ResourceWhereUniqueInput>>;
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
};

export type UserOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  email?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
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
};

export type UserWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type TopMenuQueryVariables = Exact<{ [key: string]: never; }>;


export type TopMenuQuery = { __typename?: 'Query', mainMenus?: Array<{ __typename?: 'MainMenu', id: string, link?: string | null, en?: { __typename?: 'Resource', title?: string | null, content?: string | null } | null, fa?: { __typename?: 'Resource', title?: string | null, content?: string | null } | null }> | null, contactUs?: { __typename?: 'ContactUs', email?: string | null, instagram?: string | null, tel?: string | null, telegram?: string | null, whatsapp?: string | null, bale?: string | null, address?: string | null, addressFa?: string | null } | null };

export type BlogFullQueryVariables = Exact<{
  where: PostWhereUniqueInput;
  isEn: Scalars['Boolean']['input'];
}>;


export type BlogFullQuery = { __typename?: 'Query', post?: { __typename?: 'Post', id: string, createdAt?: any | null, featuredImage?: { __typename?: 'ImageStore', altText?: string | null, image?: { __typename?: 'ImageFieldOutput', url: string } | null } | null, en?: { __typename?: 'PostTranslation', title?: string | null, content?: { __typename?: 'PostTranslation_content_Document', document: any } | null } | null, fa?: { __typename?: 'PostTranslation', title?: string | null, content?: { __typename?: 'PostTranslation_content_Document', document: any } | null } | null } | null };

export type PostsQueryVariables = Exact<{
  where: PostWhereInput;
  isEnLang: Scalars['Boolean']['input'];
}>;


export type PostsQuery = { __typename?: 'Query', posts?: Array<{ __typename?: 'Post', id: string, createdAt?: any | null, featuredImage?: { __typename?: 'ImageStore', altText?: string | null, id: string, image?: { __typename?: 'ImageFieldOutput', id: string, url: string } | null } | null, en?: { __typename?: 'PostTranslation', title?: string | null, excerpt?: string | null } | null, fa?: { __typename?: 'PostTranslation', title?: string | null, excerpt?: string | null } | null }> | null };

export type FrontPageQueryVariables = Exact<{
  isEnLang: Scalars['Boolean']['input'];
  lang: Scalars['String']['input'];
}>;


export type FrontPageQuery = { __typename?: 'Query', frontPages?: Array<{ __typename?: 'FrontPage', heroTitle?: string | null, heroDescription?: string | null, statusTitle?: string | null, statusDescription?: string | null, featuresTitle?: string | null, featuresDescription?: string | null, BlogTitle?: string | null, BlogDescription?: string | null, heroImage?: { __typename?: 'ImageStore', altText?: string | null, id: string, image?: { __typename?: 'ImageFieldOutput', id: string, url: string } | null } | null, statistics?: Array<{ __typename?: 'Resource', id: string, title?: string | null, content?: string | null, misc?: string | null }> | null, sites?: Array<{ __typename?: 'Resource', title?: string | null, featuredImage?: { __typename?: 'ImageStore', id: string, altText?: string | null, image?: { __typename?: 'ImageFieldOutput', url: string } | null } | null }> | null, features?: Array<{ __typename?: 'Resource', title?: string | null, content?: string | null, featuredImage?: { __typename?: 'ImageStore', altText?: string | null, id: string, image?: { __typename?: 'ImageFieldOutput', url: string } | null } | null }> | null, testimonial?: Array<{ __typename?: 'Resource', title?: string | null, featuredImage?: { __typename?: 'ImageStore', altText?: string | null, id: string, image?: { __typename?: 'ImageFieldOutput', id: string, url: string } | null } | null }> | null, logos?: Array<{ __typename?: 'ImageStore', id: string, altText?: string | null, image?: { __typename?: 'ImageFieldOutput', url: string } | null }> | null }> | null, posts?: Array<{ __typename?: 'Post', id: string, title?: string | null, type?: string | null, featuredImage?: { __typename?: 'ImageStore', image?: { __typename?: 'ImageFieldOutput', url: string } | null } | null, en?: { __typename?: 'PostTranslation', title?: string | null, content?: { __typename?: 'PostTranslation_content_Document', document: any } | null, tags?: Array<{ __typename?: 'Tag', id: string, name?: string | null }> | null } | null, fa?: { __typename?: 'PostTranslation', title?: string | null, content?: { __typename?: 'PostTranslation_content_Document', document: any } | null, tags?: Array<{ __typename?: 'Tag', id: string, name?: string | null }> | null } | null }> | null };


export const TopMenuDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"topMenu"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mainMenus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"en"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}},{"kind":"Field","name":{"kind":"Name","value":"fa"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"contactUs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"instagram"}},{"kind":"Field","name":{"kind":"Name","value":"tel"}},{"kind":"Field","name":{"kind":"Name","value":"telegram"}},{"kind":"Field","name":{"kind":"Name","value":"whatsapp"}},{"kind":"Field","name":{"kind":"Name","value":"bale"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"addressFa"}}]}}]}}]} as unknown as DocumentNode<TopMenuQuery, TopMenuQueryVariables>;
export const BlogFullDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BlogFull"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PostWhereUniqueInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isEn"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"post"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"en"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isEn"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"document"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"fa"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"skip"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isEn"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"document"}}]}}]}}]}}]}}]} as unknown as DocumentNode<BlogFullQuery, BlogFullQueryVariables>;
export const PostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Posts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PostWhereInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isEnLang"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"en"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isEnLang"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"excerpt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"fa"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"skip"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isEnLang"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"excerpt"}}]}}]}}]}}]} as unknown as DocumentNode<PostsQuery, PostsQueryVariables>;
export const FrontPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FrontPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isEnLang"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lang"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"frontPages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"lang"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"equals"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lang"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"heroTitle"}},{"kind":"Field","name":{"kind":"Name","value":"heroDescription"}},{"kind":"Field","name":{"kind":"Name","value":"heroImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"statusTitle"}},{"kind":"Field","name":{"kind":"Name","value":"statusDescription"}},{"kind":"Field","name":{"kind":"Name","value":"statistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"misc"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sites"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"featuresTitle"}},{"kind":"Field","name":{"kind":"Name","value":"featuresDescription"}},{"kind":"Field","name":{"kind":"Name","value":"features"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"testimonial"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"logos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"altText"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"BlogTitle"}},{"kind":"Field","name":{"kind":"Name","value":"BlogDescription"}}]}},{"kind":"Field","name":{"kind":"Name","value":"posts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"category"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"equals"},"value":{"kind":"StringValue","value":"blog","block":false}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"en"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"include"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isEnLang"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"document"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"fa"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"skip"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"if"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isEnLang"}}}]}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"document"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<FrontPageQuery, FrontPageQueryVariables>;