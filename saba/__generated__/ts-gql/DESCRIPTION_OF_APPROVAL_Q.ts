// ts-gql-integrity:8b11a2663d3fdd8ea0d900c33c43cbeb
/*
ts-gql-meta-begin
{
  "hash": "007f24bc669b1abf92f59a16006f58f9"
}
ts-gql-meta-end
*/

import * as SchemaTypes from "./@schema";
import { TypedDocumentNode } from "@ts-gql/tag";

type DESCRIPTION_OF_APPROVAL_QQueryVariables = SchemaTypes.Exact<{
  approvalId: SchemaTypes.Scalars['ID'];
}>;


type DESCRIPTION_OF_APPROVAL_QQuery = { readonly __typename: 'Query', readonly descriptions: ReadonlyArray<{ readonly __typename: 'Description', readonly id: string, readonly code: string | null, readonly title: string | null }> | null };



export type type = TypedDocumentNode<{
  type: "query";
  result: DESCRIPTION_OF_APPROVAL_QQuery;
  variables: DESCRIPTION_OF_APPROVAL_QQueryVariables;
  documents: SchemaTypes.TSGQLDocuments;
  fragments: SchemaTypes.TSGQLRequiredFragments<"none">
}>

declare module "./@schema" {
  interface TSGQLDocuments {
    DESCRIPTION_OF_APPROVAL_Q: type;
  }
}

export const document = JSON.parse("{\"kind\":\"Document\",\"definitions\":[{\"kind\":\"OperationDefinition\",\"operation\":\"query\",\"name\":{\"kind\":\"Name\",\"value\":\"DESCRIPTION_OF_APPROVAL_Q\"},\"variableDefinitions\":[{\"kind\":\"VariableDefinition\",\"variable\":{\"kind\":\"Variable\",\"name\":{\"kind\":\"Name\",\"value\":\"approvalId\"}},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]}],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"descriptions\"},\"arguments\":[{\"kind\":\"Argument\",\"name\":{\"kind\":\"Name\",\"value\":\"where\"},\"value\":{\"kind\":\"ObjectValue\",\"fields\":[{\"kind\":\"ObjectField\",\"name\":{\"kind\":\"Name\",\"value\":\"approvals\"},\"value\":{\"kind\":\"ObjectValue\",\"fields\":[{\"kind\":\"ObjectField\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"value\":{\"kind\":\"ObjectValue\",\"fields\":[{\"kind\":\"ObjectField\",\"name\":{\"kind\":\"Name\",\"value\":\"equals\"},\"value\":{\"kind\":\"Variable\",\"name\":{\"kind\":\"Name\",\"value\":\"approvalId\"}}}]}}]}}]}}],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"arguments\":[],\"directives\":[]},{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"code\"},\"arguments\":[],\"directives\":[]},{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"title\"},\"arguments\":[],\"directives\":[]}]}}]}}]}")
