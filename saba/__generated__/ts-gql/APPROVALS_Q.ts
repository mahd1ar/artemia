// ts-gql-integrity:2990b0d42f7558e8dfec36571336ba42
/*
ts-gql-meta-begin
{
  "hash": "3c3718bbe07988d435ec1f787bb10ff1"
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
