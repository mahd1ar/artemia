// ts-gql-integrity:39ab7742ac7b0bea851aea504ffcf795
/*
ts-gql-meta-begin
{
  "hash": "18e683c1dcc2ec436c7a6c735cbef272"
}
ts-gql-meta-end
*/

import * as SchemaTypes from "./@schema";
import { TypedDocumentNode } from "@ts-gql/tag";

type APPROVALS_QQueryVariables = SchemaTypes.Exact<{ [key: string]: never; }>;


type APPROVALS_QQuery = { readonly __typename: 'Query', readonly approvals: ReadonlyArray<{ readonly __typename: 'Approval', readonly id: string, readonly title: string | null }> | null };



export type type = TypedDocumentNode<{
  type: "query";
  result: APPROVALS_QQuery;
  variables: {};
  documents: SchemaTypes.TSGQLDocuments;
  fragments: SchemaTypes.TSGQLRequiredFragments<"none">
}>

declare module "./@schema" {
  interface TSGQLDocuments {
    APPROVALS_Q: type;
  }
}

export const document = JSON.parse("{\"kind\":\"Document\",\"definitions\":[{\"kind\":\"OperationDefinition\",\"operation\":\"query\",\"name\":{\"kind\":\"Name\",\"value\":\"APPROVALS_Q\"},\"variableDefinitions\":[],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"approvals\"},\"arguments\":[],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"arguments\":[],\"directives\":[]},{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"title\"},\"arguments\":[],\"directives\":[]}]}}]}}]}")
