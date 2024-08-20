// ts-gql-integrity:2fb8149e1669571a99daa83190490459
/*
ts-gql-meta-begin
{
  "hash": "2f6702b437595e581e62d65026691c1d"
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
