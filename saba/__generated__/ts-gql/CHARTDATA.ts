// ts-gql-integrity:6a27c395dc0efeec3915fcc96c2802fe
/*
ts-gql-meta-begin
{
  "hash": "ad8b663e4426cae32a9651b0bea68226"
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
