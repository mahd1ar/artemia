// ts-gql-integrity:94c1665f65a63f78f9e1c8a91e4d685a
/*
ts-gql-meta-begin
{
  "hash": "c4e615f46ca04b0300a2453535a9d4f1"
}
ts-gql-meta-end
*/

import * as SchemaTypes from "./@schema";
import { TypedDocumentNode } from "@ts-gql/tag";

type CORESPONDING_STATEMENTS_WITH_PAYMENTQueryVariables = SchemaTypes.Exact<{
  contractId: SchemaTypes.Scalars['ID'];
}>;


type CORESPONDING_STATEMENTS_WITH_PAYMENTQuery = { readonly __typename: 'Query', readonly statements: ReadonlyArray<{ readonly __typename: 'Statement', readonly id: string, readonly peyment: { readonly __typename: 'Payment', readonly grossTotal: any } | null }> | null };



export type type = TypedDocumentNode<{
  type: "query";
  result: CORESPONDING_STATEMENTS_WITH_PAYMENTQuery;
  variables: CORESPONDING_STATEMENTS_WITH_PAYMENTQueryVariables;
  documents: SchemaTypes.TSGQLDocuments;
  fragments: SchemaTypes.TSGQLRequiredFragments<"none">
}>

declare module "./@schema" {
  interface TSGQLDocuments {
    CORESPONDING_STATEMENTS_WITH_PAYMENT: type;
  }
}

export const document = JSON.parse("{\"kind\":\"Document\",\"definitions\":[{\"kind\":\"OperationDefinition\",\"operation\":\"query\",\"name\":{\"kind\":\"Name\",\"value\":\"CORESPONDING_STATEMENTS_WITH_PAYMENT\"},\"variableDefinitions\":[{\"kind\":\"VariableDefinition\",\"variable\":{\"kind\":\"Variable\",\"name\":{\"kind\":\"Name\",\"value\":\"contractId\"}},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]}],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"statements\"},\"arguments\":[{\"kind\":\"Argument\",\"name\":{\"kind\":\"Name\",\"value\":\"where\"},\"value\":{\"kind\":\"ObjectValue\",\"fields\":[{\"kind\":\"ObjectField\",\"name\":{\"kind\":\"Name\",\"value\":\"contract\"},\"value\":{\"kind\":\"ObjectValue\",\"fields\":[{\"kind\":\"ObjectField\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"value\":{\"kind\":\"ObjectValue\",\"fields\":[{\"kind\":\"ObjectField\",\"name\":{\"kind\":\"Name\",\"value\":\"equals\"},\"value\":{\"kind\":\"Variable\",\"name\":{\"kind\":\"Name\",\"value\":\"contractId\"}}}]}}]}}]}}],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"arguments\":[],\"directives\":[]},{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"peyment\"},\"arguments\":[],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"grossTotal\"},\"arguments\":[],\"directives\":[]}]}}]}}]}}]}")
