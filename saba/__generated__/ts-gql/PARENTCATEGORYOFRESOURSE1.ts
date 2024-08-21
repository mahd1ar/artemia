// ts-gql-integrity:247f8dcc67c9d3990d4e4bbc91b60294
/*
ts-gql-meta-begin
{
  "hash": "5f7682f5705af1c689085b258931785b"
}
ts-gql-meta-end
*/

import * as SchemaTypes from "./@schema";
import { TypedDocumentNode } from "@ts-gql/tag";

type PARENTCATEGORYOFRESOURSE1QueryVariables = SchemaTypes.Exact<{ [key: string]: never; }>;


type PARENTCATEGORYOFRESOURSE1Query = { readonly __typename: 'Query', readonly setting: { readonly __typename: 'Setting', readonly parentCategoryOfDesign: string | null } | null };



export type type = TypedDocumentNode<{
  type: "query";
  result: PARENTCATEGORYOFRESOURSE1Query;
  variables: {};
  documents: SchemaTypes.TSGQLDocuments;
  fragments: SchemaTypes.TSGQLRequiredFragments<"none">
}>

declare module "./@schema" {
  interface TSGQLDocuments {
    PARENTCATEGORYOFRESOURSE1: type;
  }
}

export const document = JSON.parse("{\"kind\":\"Document\",\"definitions\":[{\"kind\":\"OperationDefinition\",\"operation\":\"query\",\"name\":{\"kind\":\"Name\",\"value\":\"PARENTCATEGORYOFRESOURSE1\"},\"variableDefinitions\":[],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"setting\"},\"arguments\":[],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"parentCategoryOfDesign\"},\"arguments\":[],\"directives\":[]}]}}]}}]}")
