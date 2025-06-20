// ts-gql-integrity:2cc56a6b957a03e2b0fb07c7542b9b54
/*
ts-gql-meta-begin
{
  "hash": "898ddecac668b062488f05160757cb47"
}
ts-gql-meta-end
*/

import * as SchemaTypes from "./@schema";
import { TypedDocumentNode } from "@ts-gql/tag";

type GET_ROWSQueryVariables = SchemaTypes.Exact<{
  where: SchemaTypes.RowWhereInput;
}>;


type GET_ROWSQuery = { readonly __typename: 'Query', readonly rows: ReadonlyArray<{ readonly __typename: 'Row', readonly total: any | null }> | null };



export type type = TypedDocumentNode<{
  type: "query";
  result: GET_ROWSQuery;
  variables: GET_ROWSQueryVariables;
  documents: SchemaTypes.TSGQLDocuments;
  fragments: SchemaTypes.TSGQLRequiredFragments<"none">
}>

declare module "./@schema" {
  interface TSGQLDocuments {
    GET_ROWS: type;
  }
}

export const document = JSON.parse("{\"kind\":\"Document\",\"definitions\":[{\"kind\":\"OperationDefinition\",\"operation\":\"query\",\"name\":{\"kind\":\"Name\",\"value\":\"GET_ROWS\"},\"variableDefinitions\":[{\"kind\":\"VariableDefinition\",\"variable\":{\"kind\":\"Variable\",\"name\":{\"kind\":\"Name\",\"value\":\"where\"}},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"RowWhereInput\"}}},\"directives\":[]}],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"rows\"},\"arguments\":[{\"kind\":\"Argument\",\"name\":{\"kind\":\"Name\",\"value\":\"where\"},\"value\":{\"kind\":\"Variable\",\"name\":{\"kind\":\"Name\",\"value\":\"where\"}}}],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"total\"},\"arguments\":[],\"directives\":[]}]}}]}}]}")
