// ts-gql-integrity:e236b505b5ad07bc38c980ae976094c1
/*
ts-gql-meta-begin
{
  "hash": "bbb0110d40ab273c9edcef06b68b42b6"
}
ts-gql-meta-end
*/

import * as SchemaTypes from "./@schema";
import { TypedDocumentNode } from "@ts-gql/tag";

type STATEMENTIMAGSQueryVariables = SchemaTypes.Exact<{ [key: string]: never; }>;


type STATEMENTIMAGSQuery = { readonly __typename: 'Query', readonly statements: ReadonlyArray<{ readonly __typename: 'Statement', readonly id: string, readonly createdAt: any | null, readonly image: { readonly __typename: 'ImageFieldOutput', readonly id: string, readonly url: string, readonly extension: SchemaTypes.ImageExtension, readonly filesize: number } | null }> | null };



export type type = TypedDocumentNode<{
  type: "query";
  result: STATEMENTIMAGSQuery;
  variables: {};
  documents: SchemaTypes.TSGQLDocuments;
  fragments: SchemaTypes.TSGQLRequiredFragments<"none">
}>

declare module "./@schema" {
  interface TSGQLDocuments {
    STATEMENTIMAGS: type;
  }
}

export const document = JSON.parse("{\"kind\":\"Document\",\"definitions\":[{\"kind\":\"OperationDefinition\",\"operation\":\"query\",\"name\":{\"kind\":\"Name\",\"value\":\"STATEMENTIMAGS\"},\"variableDefinitions\":[],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"statements\"},\"arguments\":[],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"arguments\":[],\"directives\":[]},{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"image\"},\"arguments\":[],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"arguments\":[],\"directives\":[]},{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"url\"},\"arguments\":[],\"directives\":[]},{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"extension\"},\"arguments\":[],\"directives\":[]},{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"filesize\"},\"arguments\":[],\"directives\":[]}]}},{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"createdAt\"},\"arguments\":[],\"directives\":[]}]}}]}}]}")
