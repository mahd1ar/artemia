// ts-gql-integrity:18abfe16b46f4f0f2ef11520fb5591f4
/*
ts-gql-meta-begin
{
  "hash": "d50383e47a1456379032365a536c4400"
}
ts-gql-meta-end
*/

import * as SchemaTypes from "./@schema";
import { TypedDocumentNode } from "@ts-gql/tag";

type CURRENT_DESCRIPTION_INVOCESQueryVariables = SchemaTypes.Exact<{
  where: SchemaTypes.DescriptionWhereUniqueInput;
}>;


type CURRENT_DESCRIPTION_INVOCESQuery = { readonly __typename: 'Query', readonly description: { readonly __typename: 'Description', readonly invoices: ReadonlyArray<{ readonly __typename: 'Invoice', readonly totalPayable: any | null }> | null } | null };



export type type = TypedDocumentNode<{
  type: "query";
  result: CURRENT_DESCRIPTION_INVOCESQuery;
  variables: CURRENT_DESCRIPTION_INVOCESQueryVariables;
  documents: SchemaTypes.TSGQLDocuments;
  fragments: SchemaTypes.TSGQLRequiredFragments<"none">
}>

declare module "./@schema" {
  interface TSGQLDocuments {
    CURRENT_DESCRIPTION_INVOCES: type;
  }
}

export const document = JSON.parse("{\"kind\":\"Document\",\"definitions\":[{\"kind\":\"OperationDefinition\",\"operation\":\"query\",\"name\":{\"kind\":\"Name\",\"value\":\"CURRENT_DESCRIPTION_INVOCES\"},\"variableDefinitions\":[{\"kind\":\"VariableDefinition\",\"variable\":{\"kind\":\"Variable\",\"name\":{\"kind\":\"Name\",\"value\":\"where\"}},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"DescriptionWhereUniqueInput\"}}},\"directives\":[]}],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"description\"},\"arguments\":[{\"kind\":\"Argument\",\"name\":{\"kind\":\"Name\",\"value\":\"where\"},\"value\":{\"kind\":\"Variable\",\"name\":{\"kind\":\"Name\",\"value\":\"where\"}}}],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"invoices\"},\"arguments\":[],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"totalPayable\"},\"arguments\":[],\"directives\":[]}]}}]}}]}}]}")