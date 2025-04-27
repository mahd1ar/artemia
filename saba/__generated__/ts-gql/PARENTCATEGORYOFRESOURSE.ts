// ts-gql-integrity:7fc10bf1740e7258dcc3968d7fb39b61
/*
ts-gql-meta-begin
{
  "hash": "00e79e79e2c4291a05bf1ebad0f485aa"
}
ts-gql-meta-end
*/

import * as SchemaTypes from "./@schema";
import { TypedDocumentNode } from "@ts-gql/tag";

type PARENTCATEGORYOFRESOURSEQueryVariables = SchemaTypes.Exact<{ [key: string]: never; }>;


type PARENTCATEGORYOFRESOURSEQuery = { readonly __typename: 'Query', readonly setting: { readonly __typename: 'Setting', readonly parentCategoryOfDesign: string | null } | null };



export type type = TypedDocumentNode<{
  type: "query";
  result: PARENTCATEGORYOFRESOURSEQuery;
  variables: {};
  documents: SchemaTypes.TSGQLDocuments;
  fragments: SchemaTypes.TSGQLRequiredFragments<"none">
}>

declare module "./@schema" {
  interface TSGQLDocuments {
    PARENTCATEGORYOFRESOURSE: type;
  }
}

export const document = JSON.parse("{\"kind\":\"Document\",\"definitions\":[{\"kind\":\"OperationDefinition\",\"operation\":\"query\",\"name\":{\"kind\":\"Name\",\"value\":\"PARENTCATEGORYOFRESOURSE\"},\"variableDefinitions\":[],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"setting\"},\"arguments\":[],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"parentCategoryOfDesign\"},\"arguments\":[],\"directives\":[]}]}}]}}]}")
