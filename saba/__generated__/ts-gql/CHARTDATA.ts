// ts-gql-integrity:f473faf6e81be36302f0729a7f75025a
/*
ts-gql-meta-begin
{
  "hash": "204972a305c089c783fbf7cc7928470d"
}
ts-gql-meta-end
*/

import * as SchemaTypes from "./@schema";
import { TypedDocumentNode } from "@ts-gql/tag";

type CHARTDATAQueryVariables = SchemaTypes.Exact<{ [key: string]: never; }>;


type CHARTDATAQuery = { readonly __typename: 'Query', readonly contracts: ReadonlyArray<{ readonly __typename: 'Contract', readonly id: string, readonly end: number | null, readonly startFrom: number | null, readonly summery: string | null, readonly physicalProgress: number }> | null };



export type type = TypedDocumentNode<{
  type: "query";
  result: CHARTDATAQuery;
  variables: {};
  documents: SchemaTypes.TSGQLDocuments;
  fragments: SchemaTypes.TSGQLRequiredFragments<"none">
}>

declare module "./@schema" {
  interface TSGQLDocuments {
    CHARTDATA: type;
  }
}

export const document = JSON.parse("{\"kind\":\"Document\",\"definitions\":[{\"kind\":\"OperationDefinition\",\"operation\":\"query\",\"name\":{\"kind\":\"Name\",\"value\":\"CHARTDATA\"},\"variableDefinitions\":[],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"contracts\"},\"arguments\":[],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"arguments\":[],\"directives\":[]},{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"end\"},\"arguments\":[],\"directives\":[]},{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"startFrom\"},\"arguments\":[],\"directives\":[]},{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"summery\"},\"arguments\":[],\"directives\":[]},{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"physicalProgress\"},\"arguments\":[],\"directives\":[]}]}}]}}]}")
