// ts-gql-integrity:eea7ed44baff94b5a7f1bae4929565f6
/*
ts-gql-meta-begin
{
  "hash": "1fa2b4c26d091abce8f6a7f9eff40c11"
}
ts-gql-meta-end
*/

import * as SchemaTypes from "./@schema";
import { TypedDocumentNode } from "@ts-gql/tag";

type CHARTDATAQueryVariables = SchemaTypes.Exact<{ [key: string]: never; }>;


type CHARTDATAQuery = { readonly __typename: 'Query', readonly approvals: ReadonlyArray<{ readonly __typename: 'Approval', readonly estimatedEndDate: number | null, readonly startDate: number | null, readonly code: string | null }> | null };



export type type = TypedDocumentNode<{
  type: "query";
  result: CHARTDATAQuery;
  variables: {};
  documents: SchemaTypes.TSGQLDocuments;
  fragments: SchemaTypes.TSGQLRequiredFragments<"none">
}>

declare module "./@schema" {
  interface TSGQLDocuments {
    CHARTDATA: type;
  }
}

export const document = JSON.parse("{\"kind\":\"Document\",\"definitions\":[{\"kind\":\"OperationDefinition\",\"operation\":\"query\",\"name\":{\"kind\":\"Name\",\"value\":\"CHARTDATA\"},\"variableDefinitions\":[],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"approvals\"},\"arguments\":[],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"estimatedEndDate\"},\"arguments\":[],\"directives\":[]},{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"startDate\"},\"arguments\":[],\"directives\":[]},{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"code\"},\"arguments\":[],\"directives\":[]}]}}]}}]}")
