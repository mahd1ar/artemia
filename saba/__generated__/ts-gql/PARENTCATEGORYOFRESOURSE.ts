// ts-gql-integrity:47d01610a2553eec960db1f332a67672
/*
ts-gql-meta-begin
{
  "hash": "30f42f3973d8251808f804833d5d698c"
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
