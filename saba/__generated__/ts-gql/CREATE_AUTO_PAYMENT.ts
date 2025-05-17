// ts-gql-integrity:12bce13ecf5c4cec6b864612dd3a88be
/*
ts-gql-meta-begin
{
  "hash": "2722984a67e3dfca2076ff7dd84b01c6"
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
