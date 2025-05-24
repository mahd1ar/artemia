// ts-gql-integrity:9c2d7c2002988c5391c3bc96c9d12326
/*
ts-gql-meta-begin
{
  "hash": "189a7710e4e2ed2c46fb01de1f29708c"
}
ts-gql-meta-end
*/

import * as SchemaTypes from "./@schema";
import { TypedDocumentNode } from "@ts-gql/tag";

type EXTRACT_STATUSQueryVariables = SchemaTypes.Exact<{
  where: SchemaTypes.DescriptionWhereUniqueInput;
}>;


type EXTRACT_STATUSQuery = { readonly __typename: 'Query', readonly description: { readonly __typename: 'Description', readonly invoices: ReadonlyArray<{ readonly __typename: 'Invoice', readonly payment: { readonly __typename: 'Payment', readonly grossTotal: any } | null }> | null, readonly contracts: ReadonlyArray<{ readonly __typename: 'Contract', readonly id: string, readonly physicalProgress: number, readonly totalPaid: any }> | null } | null };



export type type = TypedDocumentNode<{
  type: "query";
  result: EXTRACT_STATUSQuery;
  variables: EXTRACT_STATUSQueryVariables;
  documents: SchemaTypes.TSGQLDocuments;
  fragments: SchemaTypes.TSGQLRequiredFragments<"none">
}>

declare module "./@schema" {
  interface TSGQLDocuments {
    EXTRACT_STATUS: type;
  }
}

export const document = JSON.parse("{\"kind\":\"Document\",\"definitions\":[{\"kind\":\"OperationDefinition\",\"operation\":\"query\",\"name\":{\"kind\":\"Name\",\"value\":\"EXTRACT_STATUS\"},\"variableDefinitions\":[{\"kind\":\"VariableDefinition\",\"variable\":{\"kind\":\"Variable\",\"name\":{\"kind\":\"Name\",\"value\":\"where\"}},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"DescriptionWhereUniqueInput\"}}},\"directives\":[]}],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"description\"},\"arguments\":[{\"kind\":\"Argument\",\"name\":{\"kind\":\"Name\",\"value\":\"where\"},\"value\":{\"kind\":\"Variable\",\"name\":{\"kind\":\"Name\",\"value\":\"where\"}}}],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"invoices\"},\"arguments\":[],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"payment\"},\"arguments\":[],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"grossTotal\"},\"arguments\":[],\"directives\":[]}]}}]}},{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"contracts\"},\"arguments\":[],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"arguments\":[],\"directives\":[]},{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"physicalProgress\"},\"arguments\":[],\"directives\":[]},{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"totalPaid\"},\"arguments\":[],\"directives\":[]}]}}]}}]}}]}")
