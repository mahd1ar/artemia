import { Link } from '@keystone-ui/core'
import React from 'react'
// import { gql, useMutation } from '@keystone-6/core/admin-ui/apollo';
import {
  gql,
  useQuery,
} from '@apollo/client'

interface UtilsBarProps {
  value: string | null
  onChange?: (_value: string | null) => void
}

export function UtilsBar(props: UtilsBarProps) {
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
      `, {
    variables: {
      where: {
        id: props.value,
      },
    },
  })

  return (
    <div>
      {/*
      <pre>
        {JSON.stringify(data?.design.design || {}, null, 2)}
      </pre> */}
      <div dir="rtl">

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

              <Link href={d?.file?.url} download={d?.file?.filename} target="_blank" rel="noreferrer">

                {d?.file?.filename}
              </Link>
            </div>
          )
        ))
      }

    </div>
  )
}
