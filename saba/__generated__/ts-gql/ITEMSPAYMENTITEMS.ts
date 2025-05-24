// ts-gql-integrity:b11f9a73c8d50218ce6d71eb5a0363b4
/*
ts-gql-meta-begin
{
  "hash": "74e5dce8d026e00c6e8cd2606f199ef0"
}
ts-gql-meta-end
*/

import * as SchemaTypes from "./@schema";
import { TypedDocumentNode } from "@ts-gql/tag";

type ITEMSPAYMENTITEMSQueryVariables = SchemaTypes.Exact<{
  id: SchemaTypes.Scalars['ID'];
}>;


type ITEMSPAYMENTITEMSQuery = { readonly __typename: 'Query', readonly payment: { readonly __typename: 'Payment', readonly id: string, readonly paymentItems: ReadonlyArray<{ readonly __typename: 'PaymentItem', readonly price: any | null }> | null } | null };



export type type = TypedDocumentNode<{
  type: "query";
  result: ITEMSPAYMENTITEMSQuery;
  variables: ITEMSPAYMENTITEMSQueryVariables;
  documents: SchemaTypes.TSGQLDocuments;
  fragments: SchemaTypes.TSGQLRequiredFragments<"none">
}>

declare module "./@schema" {
  interface TSGQLDocuments {
    ITEMSPAYMENTITEMS: type;
  }
}

export const document = JSON.parse("{\"kind\":\"Document\",\"definitions\":[{\"kind\":\"OperationDefinition\",\"operation\":\"query\",\"name\":{\"kind\":\"Name\",\"value\":\"ITEMSPAYMENTITEMS\"},\"variableDefinitions\":[{\"kind\":\"VariableDefinition\",\"variable\":{\"kind\":\"Variable\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"}},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]}],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"payment\"},\"arguments\":[{\"kind\":\"Argument\",\"name\":{\"kind\":\"Name\",\"value\":\"where\"},\"value\":{\"kind\":\"ObjectValue\",\"fields\":[{\"kind\":\"ObjectField\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"value\":{\"kind\":\"Variable\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"}}}]}}],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"arguments\":[],\"directives\":[]},{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"paymentItems\"},\"arguments\":[],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"price\"},\"arguments\":[],\"directives\":[]}]}}]}}]}}]}")
