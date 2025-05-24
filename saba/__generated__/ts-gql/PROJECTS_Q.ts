// ts-gql-integrity:4c01dbf9ec27dad5b7b65fb4f3965b99
/*
ts-gql-meta-begin
{
  "hash": "f6d9b15f9b9f4bd8f1d6c8415047a34d"
}
ts-gql-meta-end
*/

import * as SchemaTypes from "./@schema";
import { TypedDocumentNode } from "@ts-gql/tag";

type PROJECTS_QQueryVariables = SchemaTypes.Exact<{ [key: string]: never; }>;


type PROJECTS_QQuery = { readonly __typename: 'Query', readonly projects: ReadonlyArray<{ readonly __typename: 'Project', readonly id: string, readonly title: string | null, readonly onGoing: { readonly __typename: 'Description', readonly id: string, readonly title: string | null } | null, readonly outside: { readonly __typename: 'Description', readonly id: string, readonly title: string | null } | null }> | null };



export type type = TypedDocumentNode<{
  type: "query";
  result: PROJECTS_QQuery;
  variables: {};
  documents: SchemaTypes.TSGQLDocuments;
  fragments: SchemaTypes.TSGQLRequiredFragments<"none">
}>

declare module "./@schema" {
  interface TSGQLDocuments {
    PROJECTS_Q: type;
  }
}

export const document = JSON.parse("{\"kind\":\"Document\",\"definitions\":[{\"kind\":\"OperationDefinition\",\"operation\":\"query\",\"name\":{\"kind\":\"Name\",\"value\":\"PROJECTS_Q\"},\"variableDefinitions\":[],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"projects\"},\"arguments\":[],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"arguments\":[],\"directives\":[]},{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"title\"},\"arguments\":[],\"directives\":[]},{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"onGoing\"},\"arguments\":[],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"arguments\":[],\"directives\":[]},{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"title\"},\"arguments\":[],\"directives\":[]}]}},{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"outside\"},\"arguments\":[],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"arguments\":[],\"directives\":[]},{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"title\"},\"arguments\":[],\"directives\":[]}]}}]}}]}}]}")
