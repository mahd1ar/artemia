// ts-gql-integrity:64a88af3e0260ffca546d150bd5d5751
/*
ts-gql-meta-begin
{
  "hash": "6b20227386dc40efaef4d38b474f41bc"
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
