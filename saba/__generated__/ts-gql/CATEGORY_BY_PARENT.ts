// ts-gql-integrity:07b47977c36b45c9e53baee288df689a
/*
ts-gql-meta-begin
{
  "hash": "1e76550c6d6ad172f185c8ecd474d89a"
}
ts-gql-meta-end
*/

import * as SchemaTypes from "./@schema";
import { TypedDocumentNode } from "@ts-gql/tag";

type CATEGORY_BY_PARENTQueryVariables = SchemaTypes.Exact<{
  categoryWhereInput: SchemaTypes.CategoryWhereInput;
}>;


type CATEGORY_BY_PARENTQuery = { readonly __typename: 'Query', readonly categories: ReadonlyArray<{ readonly __typename: 'Category', readonly id: string, readonly code: string | null, readonly title: string | null, readonly childrenCount: number | null, readonly children: ReadonlyArray<{ readonly __typename: 'Category', readonly id: string, readonly title: string | null }> | null }> | null };



export type type = TypedDocumentNode<{
  type: "query";
  result: CATEGORY_BY_PARENTQuery;
  variables: CATEGORY_BY_PARENTQueryVariables;
  documents: SchemaTypes.TSGQLDocuments;
  fragments: SchemaTypes.TSGQLRequiredFragments<"none">
}>

declare module "./@schema" {
  interface TSGQLDocuments {
    CATEGORY_BY_PARENT: type;
  }
}

export const document = JSON.parse("{\"kind\":\"Document\",\"definitions\":[{\"kind\":\"OperationDefinition\",\"operation\":\"query\",\"name\":{\"kind\":\"Name\",\"value\":\"CATEGORY_BY_PARENT\"},\"variableDefinitions\":[{\"kind\":\"VariableDefinition\",\"variable\":{\"kind\":\"Variable\",\"name\":{\"kind\":\"Name\",\"value\":\"categoryWhereInput\"}},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"CategoryWhereInput\"}}},\"directives\":[]}],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"categories\"},\"arguments\":[{\"kind\":\"Argument\",\"name\":{\"kind\":\"Name\",\"value\":\"where\"},\"value\":{\"kind\":\"Variable\",\"name\":{\"kind\":\"Name\",\"value\":\"categoryWhereInput\"}}}],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"arguments\":[],\"directives\":[]},{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"code\"},\"arguments\":[],\"directives\":[]},{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"title\"},\"arguments\":[],\"directives\":[]},{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"childrenCount\"},\"arguments\":[],\"directives\":[]},{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"children\"},\"arguments\":[],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"arguments\":[],\"directives\":[]},{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"title\"},\"arguments\":[],\"directives\":[]}]}}]}}]}}]}")
