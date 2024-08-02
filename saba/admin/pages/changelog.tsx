import React from "react"
import { PageContainer } from '@keystone-6/core/admin-ui/components';
// import { jsx, Heading, useManagedState } from '@keystone-ui/core'
import {
    gql,
    useQuery
} from '@apollo/client'
import ChangeLog from "../components/changelog";

export default function CustomPage() {


    const { data } = useQuery(gql`
        query AuthenticatedItem {
            authenticatedItem {
                ... on User {
                id
                role
                name
                }
            }
        }
      `,
    )

    return (
        <PageContainer header="Dashboard"  >
            <div dir='rtl' >
                <h1>
                    💖
                    آخرین بروزرسانی ها</h1>

                <ChangeLog />
            </div>



        </PageContainer>
    )
}