// ts-gql-integrity:da6f56769496a4e14a699a1f21a5966c
/*
ts-gql-meta-begin
{
  "hash": "83b775361b3fd8cf9c939fcee3b81c6b"
}
ts-gql-meta-end
*/

import * as SchemaTypes from "./@schema";
import { TypedDocumentNode } from "@ts-gql/tag";

type CREATE_AUTO_PAYMENTMutationVariables = SchemaTypes.Exact<{
  data: SchemaTypes.PaymentCreateInput;
}>;


type CREATE_AUTO_PAYMENTMutation = { readonly __typename: 'Mutation', readonly createPayment: { readonly __typename: 'Payment', readonly id: string } | null };



export type type = TypedDocumentNode<{
  type: "mutation";
  result: CREATE_AUTO_PAYMENTMutation;
  variables: CREATE_AUTO_PAYMENTMutationVariables;
  documents: SchemaTypes.TSGQLDocuments;
  fragments: SchemaTypes.TSGQLRequiredFragments<"none">
}>

declare module "./@schema" {
  interface TSGQLDocuments {
    CREATE_AUTO_PAYMENT: type;
  }
}

export const document = JSON.parse("{\"kind\":\"Document\",\"definitions\":[{\"kind\":\"OperationDefinition\",\"operation\":\"mutation\",\"name\":{\"kind\":\"Name\",\"value\":\"CREATE_AUTO_PAYMENT\"},\"variableDefinitions\":[{\"kind\":\"VariableDefinition\",\"variable\":{\"kind\":\"Variable\",\"name\":{\"kind\":\"Name\",\"value\":\"data\"}},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"PaymentCreateInput\"}}},\"directives\":[]}],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"createPayment\"},\"arguments\":[{\"kind\":\"Argument\",\"name\":{\"kind\":\"Name\",\"value\":\"data\"},\"value\":{\"kind\":\"Variable\",\"name\":{\"kind\":\"Name\",\"value\":\"data\"}}}],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"arguments\":[],\"directives\":[]}]}}]}}]}")
