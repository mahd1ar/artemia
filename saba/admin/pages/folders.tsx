import React from 'react'
import Link from 'next/link'
import { PageContainer } from '@keystone-6/core/admin-ui/components'
import { gql, useQuery } from '@apollo/client'
import { useRouter, useSearchParams } from 'next/navigation'

export default function CustomPage() {
    const parent = useSearchParams().get('parent')

    const FOLDERPATH = gql`
    query FOLDERPATH($where: CategoryWhereInput!, $id: ID) {
      categories(where: $where) {
        id
        title
        childrenCount
        parent {
            id
        }
      }
      category(where: { id: $id }) {
        id
        title
        parent {
            id
        }
      }
    }
  ` as import('../../__generated__/ts-gql/FOLDERPATH').type

    const parentVariable = parent
        ? {
            where: {
                parent: {
                    id: {
                        equals: parent
                    }
                }
            }
        }
        : { where: {} }

    const { data } = useQuery(FOLDERPATH, { variables: parentVariable })

    const backUrl = React.useMemo(() => {
        if (data?.category?.parent?.id) {
            return `/folders?parent=${data.category.parent.id}`
        } else
            return "#"
    }, [data])

    return (
        <PageContainer header='Dashboard'>
            <div dir='rtl'>
                <h1>💖 آخرین بروزرسانی ها</h1>
            </div>
            <Link href={`/designs/create`}>
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='1em'
                    height='1em'
                    viewBox='0 0 32 32'
                >
                    <defs>
                        <path
                            id='carbonNewTab0'
                            fill='currentColor'
                            d='M26 26H6V6h10V4H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V16h-2Z'
                        />
                    </defs>
                    <use href='#carbonNewTab0' />
                    <use href='#carbonNewTab0' />
                    <path fill='currentColor' d='M26 6V2h-2v4h-4v2h4v4h2V8h4V6z' />
                </svg>
                new
            </Link>
            <br />
            {data?.categories?.at(0)?.parent?.id && <Link href={'/folders?parent=' + data?.categories?.at(0)?.parent?.id}>
                <svg xmlns="http://www.w3.org/2000/svg" width={"1em"} height={"1em"} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                </svg>


                back</Link>}
            <ul>
                {data?.categories?.map(i => (
                    <li key={i.id}>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='1.5em'
                            height='1.5em'
                            viewBox='0 0 24 24'
                        >
                            <path
                                fill='currentColor'
                                d='M4.616 19q-.691 0-1.153-.462T3 17.384V6.616q0-.691.463-1.153T4.615 5h4.981l2 2h7.789q.69 0 1.153.463T21 8.616v8.769q0 .69-.462 1.153T19.385 19zm0-1h14.769q.269 0 .442-.173t.173-.442v-8.77q0-.269-.173-.442T19.385 8h-8.19l-2-2h-4.58q-.269 0-.442.173T4 6.616v10.769q0 .269.173.442t.443.173M4 18V6z'
                            />
                        </svg>
                        <Link href={'/folders?parent=' + i.id}>{i.title}</Link>
                        <br />
                    </li>
                ))}
                {data?.categories?.length === 0 && <div>هیچ فایلی ای یافت نشد</div>}
            </ul>
        </PageContainer>
    )
}
