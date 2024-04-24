import React, { useState } from "react";
import { useTheme } from '@keystone-ui/core';
import { Link } from '@keystone-ui/core';
import { Button } from '@keystone-ui/button';
import { useToasts } from "@keystone-ui/toast"
// import { gql, useMutation } from '@keystone-6/core/admin-ui/apollo';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  useQuery
} from '@apollo/client'

type UtilsBarProps = {
  value: string | null;
  onChange?: (value: string | null) => void;
};



export function UtilsBar(props: UtilsBarProps) {


  const [emailIsSent, setEmailIsSent] = useState(false);
  const { addToast } = useToasts()


  const { data } = useQuery(gql`
        query DesignFiles($where: DesignWhereUniqueInput!) {
          design(where: $where) {
            id
            design {
              file {
                filename
                url
              }
            }
          }
        }
      `,
    {
      variables: {
        "where": {
          "id": props.value
        }
      }
    }
  )


  return (
    <div>
      {/* 
      <pre>
        {JSON.stringify(data?.design.design || {}, null, 2)}
      </pre> */}
      <div dir="rtl" >


        <span>
          نقشه های بارگذاری شده:
        </span>

        <b>
          {data?.design?.design?.length || 0}
        </b>
        <span>
          عدد
        </span>
      </div>
      {
        data?.design.design.map((d: any) => (

          d?.file?.url && (
            <div>

              <Link href={d?.file?.url} download={d?.file?.filename} target="_blank" rel="noreferrer" >

                {d?.file?.filename}
              </Link>
            </div>
          )
        ))
      }

    </div>
  );
}
