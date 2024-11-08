// ts-gql-integrity:6fe4abf90e6b6d10b1aa15c75f68f379
/*
ts-gql-meta-begin
{
  "hash": "ac030c00049e86b0a975827d411af22d"
}
ts-gql-meta-end
*/

import * as SchemaTypes from "./@schema";
import { TypedDocumentNode } from "@ts-gql/tag";

type STATEMENTSQueryVariables = SchemaTypes.Exact<{
  take?: SchemaTypes.InputMaybe<SchemaTypes.Scalars['Int']>;
  where: SchemaTypes.StatementWhereInput;
}>;


type STATEMENTSQuery = { readonly __typename: 'Query', readonly statements: ReadonlyArray<{ readonly __typename: 'Statement', readonly id: string, readonly title: string | null, readonly createdAt: any | null, readonly confirmedBySupervisor: boolean | null, readonly confirmedByTechnicalSupervisor: boolean | null, readonly confirmedByFinancialSupervisor: boolean | null, readonly confirmedByProjectControlSupervisor: boolean | null, readonly confirmedByTheUploader: boolean | null }> | null };



export type type = TypedDocumentNode<{
  type: "query";
  result: STATEMENTSQuery;
  variables: STATEMENTSQueryVariables;
  documents: SchemaTypes.TSGQLDocuments;
  fragments: SchemaTypes.TSGQLRequiredFragments<"none">
}>

declare module "./@schema" {
  interface TSGQLDocuments {
    STATEMENTS: type;
  }
}

export const document = JSON.parse("{\"kind\":\"Document\",\"definitions\":[{\"kind\":\"OperationDefinition\",\"operation\":\"query\",\"name\":{\"kind\":\"Name\",\"value\":\"STATEMENTS\"},\"variableDefinitions\":[{\"kind\":\"VariableDefinition\",\"variable\":{\"kind\":\"Variable\",\"name\":{\"kind\":\"Name\",\"value\":\"take\"}},\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"Int\"}},\"directives\":[]},{\"kind\":\"VariableDefinition\",\"variable\":{\"kind\":\"Variable\",\"name\":{\"kind\":\"Name\",\"value\":\"where\"}},\"type\":{\"kind\":\"NonNullType\",\"type\":{\"kind\":\"NamedType\",\"name\":{\"kind\":\"Name\",\"value\":\"StatementWhereInput\"}}},\"directives\":[]}],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"statements\"},\"arguments\":[{\"kind\":\"Argument\",\"name\":{\"kind\":\"Name\",\"value\":\"where\"},\"value\":{\"kind\":\"Variable\",\"name\":{\"kind\":\"Name\",\"value\":\"where\"}}},{\"kind\":\"Argument\",\"name\":{\"kind\":\"Name\",\"value\":\"take\"},\"value\":{\"kind\":\"Variable\",\"name\":{\"kind\":\"Name\",\"value\":\"take\"}}}],\"directives\":[],\"selectionSet\":{\"kind\":\"SelectionSet\",\"selections\":[{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"id\"},\"arguments\":[],\"directives\":[]},{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"title\"},\"arguments\":[],\"directives\":[]},{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"createdAt\"},\"arguments\":[],\"directives\":[]},{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"confirmedBySupervisor\"},\"arguments\":[],\"directives\":[]},{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"confirmedByTechnicalSupervisor\"},\"arguments\":[],\"directives\":[]},{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"confirmedByFinancialSupervisor\"},\"arguments\":[],\"directives\":[]},{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"confirmedByProjectControlSupervisor\"},\"arguments\":[],\"directives\":[]},{\"kind\":\"Field\",\"name\":{\"kind\":\"Name\",\"value\":\"confirmedByTheUploader\"},\"arguments\":[],\"directives\":[]}]}}]}}]}")
