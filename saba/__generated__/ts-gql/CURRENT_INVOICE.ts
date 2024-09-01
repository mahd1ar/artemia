// ts-gql-integrity:1dbdb99c4e9a0247ca469d47242cf165
/*
ts-gql-meta-begin
{
  "hash": "705edd7e467b5ab211a9002b8bb108f7"
}
ts-gql-meta-end
*/

import * as SchemaTypes from "./@schema";
import { TypedDocumentNode } from "@ts-gql/tag";

type CURRENT_INVOICEQueryVariables = SchemaTypes.Exact<{
  id: SchemaTypes.Scalars['ID'];
}>;


type CURRENT_INVOICEQuery = { readonly __typename: 'Query', readonly invoice: { readonly __typename: 'Invoice', readonly attachments: ReadonlyArray<{ readonly __typename: 'FileStore', readonly id: string, readonly file: { readonly __typename: 'FileFieldOutput', readonly filename: string, readonly url: string } | null }> | null, readonly createdBy: { readonly __typename: 'User', readonly fullname: string | null } | null } | null };



export type type = TypedDocumentNode<{
  type: "query";
  result: CURRENT_INVOICEQuery;
  variables: CURRENT_INVOICEQueryVariables;
  documents: SchemaTypes.TSGQLDocuments;
  fragments: SchemaTypes.TSGQLRequiredFragments<"none">
}>

declare module "./@schema" {
  interface TSGQLDocuments {
    CURRENT_INVOICE: type;
  }
}

export const document = JSON.parse("{\"kind\":\"Document\",\"definitions\":[{\"kind\":\"OperationDefinition\",\"operation\":\"query\",\"name\":{\"kind\":\"Name\",\"value\":\"CURRENT_INVOICE\"},\"variableDefinitions\":[{\"kind\":\"VariableDefinition\",\"variable\":{\"kind\":\"Variable\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"}},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"ID\"}}},\"directives\":[]}],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"invoice\"},\"arguments\":[{\"kind\":\"Argument\",\"name\":{\"kind\":\"Name\",\"value\":\"where\"},\"value\":{\"kind\":\"ObjectValue\",\"fields\":[{\"kind\":\"ObjectField\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"value\":{\"kind\":\"Variable\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"}}}]}}],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"attachments\"},\"arguments\":[],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"arguments\":[],\"directives\":[]},{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"file\"},\"arguments\":[],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"filename\"},\"arguments\":[],\"directives\":[]},{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"url\"},\"arguments\":[],\"directives\":[]}]}}]}},{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"createdBy\"},\"arguments\":[],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"fullname\"},\"arguments\":[],\"directives\":[]}]}}]}}]}}]}")
