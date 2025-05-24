// ts-gql-integrity:676cbe9e8c57c105ceeb73d2f576b18d
/*
ts-gql-meta-begin
{
  "hash": "75ccf44b1dd93779bf1264911f2e98c4"
}
ts-gql-meta-end
*/

import * as SchemaTypes from "./@schema";
import { TypedDocumentNode } from "@ts-gql/tag";

type APPROVALS_OF_PROJECT_QQueryVariables = SchemaTypes.Exact<{
  projectId: SchemaTypes.Scalars['ID'];
}>;


type APPROVALS_OF_PROJECT_QQuery = { readonly __typename: 'Query', readonly approvals: ReadonlyArray<{ readonly __typename: 'Approval', readonly id: string, readonly code: string | null, readonly title: string | null }> | null };



export type type = TypedDocumentNode<{
  type: "query";
  result: APPROVALS_OF_PROJECT_QQuery;
  variables: APPROVALS_OF_PROJECT_QQueryVariables;
  documents: SchemaTypes.TSGQLDocuments;
  fragments: SchemaTypes.TSGQLRequiredFragments<"none">
}>

declare module "./@schema" {
  interface TSGQLDocuments {
    APPROVALS_OF_PROJECT_Q: type;
  }
}

export const document = JSON.parse("{\"kind\":\"Document\",\"definitions\":[{\"kind\":\"OperationDefinition\",\"operation\":\"query\",\"name\":{\"kind\":\"Name\",\"value\":\"APPROVALS_OF_PROJECT_Q\"},\"variableDefinitions\":[{\"kind\":\"VariableDefinition\",\"variable\":{\"kind\":\"Variable\",\"name\":{\"kind\":\"Name\",\"value\":\"projectId\"}},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]}],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"approvals\"},\"arguments\":[{\"kind\":\"Argument\",\"name\":{\"kind\":\"Name\",\"value\":\"where\"},\"value\":{\"kind\":\"ObjectValue\",\"fields\":[{\"kind\":\"ObjectField\",\"name\":{\"kind\":\"Name\",\"value\":\"project\"},\"value\":{\"kind\":\"ObjectValue\",\"fields\":[{\"kind\":\"ObjectField\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"value\":{\"kind\":\"ObjectValue\",\"fields\":[{\"kind\":\"ObjectField\",\"name\":{\"kind\":\"Name\",\"value\":\"equals\"},\"value\":{\"kind\":\"Variable\",\"name\":{\"kind\":\"Name\",\"value\":\"projectId\"}}}]}}]}}]}}],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"arguments\":[],\"directives\":[]},{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"code\"},\"arguments\":[],\"directives\":[]},{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"title\"},\"arguments\":[],\"directives\":[]}]}}]}}]}")
