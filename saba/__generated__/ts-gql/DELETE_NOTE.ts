// ts-gql-integrity:6e82558c1a22344fbf78faa3756308b3
/*
ts-gql-meta-begin
{
  "hash": "1836ad8a8278a54c78b7f99b0397fa55"
}
ts-gql-meta-end
*/

import * as SchemaTypes from "./@schema";
import { TypedDocumentNode } from "@ts-gql/tag";

type DELETE_NOTEMutationVariables = SchemaTypes.Exact<{
  where: SchemaTypes.NoteWhereUniqueInput;
}>;


type DELETE_NOTEMutation = { readonly __typename: 'Mutation', readonly deleteNote: { readonly __typename: 'Note', readonly id: string } | null };



export type type = TypedDocumentNode<{
  type: "mutation";
  result: DELETE_NOTEMutation;
  variables: DELETE_NOTEMutationVariables;
  documents: SchemaTypes.TSGQLDocuments;
  fragments: SchemaTypes.TSGQLRequiredFragments<"none">
}>

declare module "./@schema" {
  interface TSGQLDocuments {
    DELETE_NOTE: type;
  }
}

export const document = JSON.parse("{\"kind\":\"Document\",\"definitions\":[{\"kind\":\"OperationDefinition\",\"operation\":\"mutation\",\"name\":{\"kind\":\"Name\",\"value\":\"DELETE_NOTE\"},\"variableDefinitions\":[{\"kind\":\"VariableDefinition\",\"variable\":{\"kind\":\"Variable\",\"name\":{\"kind\":\"Name\",\"value\":\"where\"}},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"NoteWhereUniqueInput\"}}},\"directives\":[]}],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"deleteNote\"},\"arguments\":[{\"kind\":\"Argument\",\"name\":{\"kind\":\"Name\",\"value\":\"where\"},\"value\":{\"kind\":\"Variable\",\"name\":{\"kind\":\"Name\",\"value\":\"where\"}}}],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"arguments\":[],\"directives\":[]}]}}]}}]}")
