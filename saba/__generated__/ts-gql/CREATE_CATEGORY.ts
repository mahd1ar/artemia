// ts-gql-integrity:519b7c25c0616602ce122bae5f174a16
/*
ts-gql-meta-begin
{
  "hash": "2bd0bb9fc1f0496df42535b8ebbe3efc"
}
ts-gql-meta-end
*/

import * as SchemaTypes from "./@schema";
import { TypedDocumentNode } from "@ts-gql/tag";

type CREATE_CATEGORYMutationVariables = SchemaTypes.Exact<{
  data: SchemaTypes.CategoryCreateInput;
}>;


type CREATE_CATEGORYMutation = { readonly __typename: 'Mutation', readonly createCategory: { readonly __typename: 'Category', readonly id: string } | null };



export type type = TypedDocumentNode<{
  type: "mutation";
  result: CREATE_CATEGORYMutation;
  variables: CREATE_CATEGORYMutationVariables;
  documents: SchemaTypes.TSGQLDocuments;
  fragments: SchemaTypes.TSGQLRequiredFragments<"none">
}>

declare module "./@schema" {
  interface TSGQLDocuments {
    CREATE_CATEGORY: type;
  }
}

export const document = JSON.parse("{\"kind\":\"Document\",\"definitions\":[{\"kind\":\"OperationDefinition\",\"operation\":\"mutation\",\"name\":{\"kind\":\"Name\",\"value\":\"CREATE_CATEGORY\"},\"variableDefinitions\":[{\"kind\":\"VariableDefinition\",\"variable\":{\"kind\":\"Variable\",\"name\":{\"kind\":\"Name\",\"value\":\"data\"}},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"CategoryCreateInput\"}}},\"directives\":[]}],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"createCategory\"},\"arguments\":[{\"kind\":\"Argument\",\"name\":{\"kind\":\"Name\",\"value\":\"data\"},\"value\":{\"kind\":\"Variable\",\"name\":{\"kind\":\"Name\",\"value\":\"data\"}}}],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"arguments\":[],\"directives\":[]}]}}]}}]}")
