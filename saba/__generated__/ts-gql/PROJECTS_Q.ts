// ts-gql-integrity:e76595ee113ab6d18d5402cbe084d708
/*
ts-gql-meta-begin
{
  "hash": "22d16a92344002f9eae9849264739ec4"
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
