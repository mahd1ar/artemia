import React from "react";
import Link from "next/link";
import { PageContainer } from "@keystone-6/core/admin-ui/components";
import { gql, useQuery } from "@apollo/client";
import { useRouter, useSearchParams } from "next/navigation"

export default function CustomPage() {

    const parent = useSearchParams().get('parent')

    const parentVariable = parent ?
        {
            where: {
                parent: {
                    id: {
                        equals: parent
                    },
                },
            },
        } : { where: {} }

    const { data } = useQuery(
        gql`
       query folders($where: CategoryWhereInput!) {
            categories (where: $where) {
                id
                title
                childrenCount
            }
        }
      `,
        {
            variables: parentVariable,
        }
    );

    return (
        <PageContainer header="Dashboard">
            <div dir="rtl">
                <h1>💖 آخرین بروزرسانی ها</h1>
            </div>

            <ul>
                {
                    data?.categories.map(i => <><Link href={'/folders?parent=' + i.id}>{i.title}</Link><br /></>)


                }
            </ul>
        </PageContainer>
    );
}
