// ts-gql-integrity:d33fbcd9f3645afb5f4f52e3c3d61264
/*
ts-gql-meta-begin
{
  "hash": "3ca2900ba233e971e279eaf8ed0b5fa7"
}
ts-gql-meta-end
*/

import * as SchemaTypes from "./@schema";
import { TypedDocumentNode } from "@ts-gql/tag";

type ALLUSERSQueryVariables = SchemaTypes.Exact<{ [key: string]: never; }>;


type ALLUSERSQuery = { readonly __typename: 'Query', readonly users: ReadonlyArray<{ readonly __typename: 'User', readonly name: string | null, readonly id: string }> | null };



export type type = TypedDocumentNode<{
  type: "query";
  result: ALLUSERSQuery;
  variables: {};
  documents: SchemaTypes.TSGQLDocuments;
  fragments: SchemaTypes.TSGQLRequiredFragments<"none">
}>

declare module "./@schema" {
  interface TSGQLDocuments {
    ALLUSERS: type;
  }
}

export const document = JSON.parse("{\"kind\":\"Document\",\"definitions\":[{\"kind\":\"OperationDefinition\",\"operation\":\"query\",\"name\":{\"kind\":\"Name\",\"value\":\"ALLUSERS\"},\"variableDefinitions\":[],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"users\"},\"arguments\":[],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"name\"},\"arguments\":[],\"directives\":[]},{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"arguments\":[],\"directives\":[]}]}}]}}]}")
