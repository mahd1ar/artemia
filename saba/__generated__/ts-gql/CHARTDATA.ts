// ts-gql-integrity:fe267210c0add9f97ebd5e1e04c1cc96
/*
ts-gql-meta-begin
{
  "hash": "6d0eb8b5e1daac2352aef96f6c65b3cf"
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
