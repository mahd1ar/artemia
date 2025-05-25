// ts-gql-integrity:d1794a9c0b7ec5cba801594ccce05494
/*
ts-gql-meta-begin
{
  "hash": "dfa4718f8fd4c62e9d72637cb895a002"
}
ts-gql-meta-end
*/

import * as SchemaTypes from "./@schema";
import { TypedDocumentNode } from "@ts-gql/tag";

type CONSTRACTORSQueryVariables = SchemaTypes.Exact<{ [key: string]: never; }>;


type CONSTRACTORSQuery = { readonly __typename: 'Query', readonly constractors: ReadonlyArray<{ readonly __typename: 'Constractor', readonly name: string | null, readonly id: string }> | null };



export type type = TypedDocumentNode<{
  type: "query";
  result: CONSTRACTORSQuery;
  variables: {};
  documents: SchemaTypes.TSGQLDocuments;
  fragments: SchemaTypes.TSGQLRequiredFragments<"none">
}>

declare module "./@schema" {
  interface TSGQLDocuments {
    CONSTRACTORS: type;
  }
}

export const document = JSON.parse("{\"kind\":\"Document\",\"definitions\":[{\"kind\":\"OperationDefinition\",\"operation\":\"query\",\"name\":{\"kind\":\"Name\",\"value\":\"CONSTRACTORS\"},\"variableDefinitions\":[],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"constractors\"},\"arguments\":[],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"name\"},\"arguments\":[],\"directives\":[]},{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"arguments\":[],\"directives\":[]}]}}]}}]}")
