import {
    gql,
    useQuery
} from '@apollo/client';
import { PageContainer, } from '@keystone-6/core/admin-ui/components';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import React from "react";
import { Roles } from '../../data/types';
import { Box, Button, ButtonGroup, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useRouter } from 'next/router';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MoreVertIcon from '@mui/icons-material/MoreVert';


function Dashboard(props: {role: Roles}) {
    return (
        <div>

        </div>
    )
}

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

                <h2>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 64 64"><path fill="#ffce31" d="M5.9 62c-3.3 0-4.8-2.4-3.3-5.3L29.3 4.2c1.5-2.9 3.9-2.9 5.4 0l26.7 52.5c1.5 2.9 0 5.3-3.3 5.3z" /><g fill="#231f20"><path d="m27.8 23.6l2.8 18.5c.3 1.8 2.6 1.8 2.9 0l2.7-18.5c.5-7.2-8.9-7.2-8.4 0" /><circle cx="32" cy="49.6" r="4.2" /></g></svg> این صفحه در دست ساخت میباشد
                </h2>
                {data?.authenticatedItem?.role !== Roles.workshop ? <p>
                    <br />
                    برای بارگزاری یا  مصوبات از
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



            </div>

            {data?.authenticatedItem?.role && data?.authenticatedItem?.role === Roles.admin && <Dashboard role={data.authenticatedItem.role} />  }

        </PageContainer>
    )
}