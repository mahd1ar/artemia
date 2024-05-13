import React from "react"
import Link from 'next/link';
import { PageContainer } from '@keystone-6/core/admin-ui/components';
// import { jsx, Heading, useManagedState } from '@keystone-ui/core'
import {
    gql,
    useQuery
} from '@apollo/client'
import { Roles } from '../../data/types';
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
                    <b>{data?.authenticatedItem?.name}</b>
                    &nbsp;
                    خوش آمدید

                </h1>
                {/* <pre>
                    {JSON.stringify(data, null, 2)}
                </pre> */}
                <h2>

                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 64 64"><path fill="#ffce31" d="M5.9 62c-3.3 0-4.8-2.4-3.3-5.3L29.3 4.2c1.5-2.9 3.9-2.9 5.4 0l26.7 52.5c1.5 2.9 0 5.3-3.3 5.3z" /><g fill="#231f20"><path d="m27.8 23.6l2.8 18.5c.3 1.8 2.6 1.8 2.9 0l2.7-18.5c.5-7.2-8.9-7.2-8.4 0" /><circle cx="32" cy="49.6" r="4.2" /></g></svg> این صفحه در دست ساخت میباشد
                </h2>
                {data?.authenticatedItem?.role !== Roles.mobayen ? <p>
                    <br />
                    برای بارگزاری مصوبات از
                    <Link href="/approvals">اینجا</Link>
                </p> :
                    <p>
                        برای بارگزاری صورت وضعیت ها از
                        <Link href="/statements">اینجا</Link>

                    </p>
                }
                <p>

                    و
                    برای بارگزاری نقشه ها از
                    <Link href="/designs">اینجا</Link>
                    اقدام کنید
                </p>


                <h1>
                    💖
                    آخرین بروزرسانی ها</h1>
                <ChangeLog />
            </div>



        </PageContainer>
    )
}