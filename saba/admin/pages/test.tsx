import type { Session } from '../../data/types'
import {
  gql,
  useQuery,
} from '@apollo/client'
import { PageContainer } from '@keystone-6/core/admin-ui/components'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Box, Button, ButtonGroup, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import { ThemeProvider } from '@mui/material/styles'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Roles } from '../../data/types'
import { theme } from '../../data/utils'
import { GanttChart } from '../components/gannt-chart'

function StatementReviewCard(props: { role: Roles }) {
  const router = useRouter()

  const statementMode = React.useMemo(() => {
    return router.query.statementMode === 'latest' ? 'latest' : 'unconfirmed'
  }, [router])

  const STATEMENTS = gql`
    query STATEMENTS( $take: Int, $where: StatementWhereInput!) {
        statements( where: $where, take: $take) {
            id
            title
            createdAt
            
            confirmedBySupervisor 
            confirmedByFinancialSupervisor 
            confirmedByProjectControlSupervisor 
            confirmedByTheUploader
        }
    }` as import('../../__generated__/ts-gql/STATEMENTS').type

  const confirmedByMy = props.role === Roles.supervisor
    ? 'confirmedBySupervisor'
    : props.role === Roles.technical
      ? 'confirmedByTechnicalSupervisor' // delete this
      : props.role === Roles.financial
        ? 'confirmedByFinancialSupervisor'
        : props.role === Roles.projectControl
          ? 'confirmedByProjectControlSupervisor'
          : props.role === Roles.workshop ? 'confirmedByTheUploader' : 'confirmedByTheUploader'

  const { data } = useQuery(STATEMENTS, {
    variables: {
      take: 20,
      where: statementMode === 'latest'
        ? {}
        : {
            [confirmedByMy]: {
              equals: false,
            },
          },
    },
  })

  return (
    <Card sx={{ maxWidth: 445 }}>
      <CardHeader
        // avatar={
        //     <Avatar sx={{ bgcolor: red[500] }} aria-label="statement summery">
        //         R
        //     </Avatar>
        // }
        action={(
          <ButtonGroup variant="outlined" aria-label="Loading button group">
            {
              ['latest', 'unconfirmed'].map(i => (
                <Button
                  size="small"
                  key={i}
                  variant={statementMode === i ? 'contained' : 'outlined'}
                  onClick={() => router.push({
                    pathname: router.pathname,
                    query: { ...router.query, statementMode: i },
                  })}
                  disableElevation
                >
                  {i}
                </Button>
              ))
            }

          </ButtonGroup>
        )}
        title="صورت وضعیت ها"
        subheader="September 14, 2016"
      />

      <CardContent>
        <Box
          sx={{ width: '100%', height: 400, overflow: 'auto', bgcolor: 'background.paper', p: 0 }}
        >
          <List dense>
            {data?.statements?.map(i => (
              <ListItem key={i.id} disablePadding>
                <ListItemButton onClick={() => router.push(`/statements/${i.id}`)}>
                  <ListItemIcon sx={{ color: i[confirmedByMy] ? '#00c853' : '#b9b9b9' }}>
                    {
                      i[confirmedByMy]
                        ? <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="m23.5 17l-5 5l-3.5-3.5l1.5-1.5l2 2l3.5-3.5zM6 2c-1.11 0-2 .89-2 2v16c0 1.11.89 2 2 2h7.81c-.53-.91-.81-1.95-.81-3c0-.33.03-.67.08-1H6v-2h7.81c.46-.8 1.1-1.5 1.87-2H6v-2h12v1.08c.33-.05.67-.08 1-.08c.34 0 .67.03 1 .08V8l-6-6m-1 1.5L18.5 9H13Z"></path></svg>
                        : <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M20 17h2v-2h-2zm0-10v6h2V7zm-9 2h5.5L11 3.5zM4 2h8l6 6v12c0 1.11-.89 2-2 2H4a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2m9 16v-2H4v2zm3-4v-2H4v2z"></path></svg>
                    }
                  </ListItemIcon>
                  <ListItemText
                    primary={i.title}
                    secondary={new Date(i.createdAt).toLocaleDateString('fa', { dateStyle: 'medium' })}
                  />
                </ListItemButton>
              </ListItem>
            ),
            )}
            {data?.statements?.length === 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', color: '#888', p: 2, gap: 2 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="4em" height="4em" viewBox="0 0 24 24">
                  <mask id="lineMdFileDocumentOff0">
                    <g fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                      <path strokeDasharray={64} strokeDashoffset={64} d="M13.5 3l5.5 5.5v11.5c0 0.55 -0.45 1 -1 1h-12c-0.55 0 -1 -0.45 -1 -1v-16c0 -0.55 0.45 -1 1 -1Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="64;0"></animate></path>
                      <path d="M14.5 3.5l2.25 2.25l2.25 2.25z" opacity={0}>
                        <animate fill="freeze" attributeName="d" begin="0.6s" dur="0.2s" values="M14.5 3.5l2.25 2.25l2.25 2.25z;M14.5 3.5l0 4.5l4.5 0z"></animate>
                        <set fill="freeze" attributeName="opacity" begin="0.6s" to={1}></set>
                      </path>
                      <path strokeDasharray={8} strokeDashoffset={8} d="M9 13h6"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.2s" values="8;0"></animate></path>
                      <path strokeDasharray={4} strokeDashoffset={4} d="M9 17h3"><animate fill="freeze" attributeName="stroke-dashoffset" begin="1s" dur="0.2s" values="4;0"></animate></path>
                      <path stroke="#000" strokeDasharray={28} strokeDashoffset={28} d="M-1 11h26" transform="rotate(45 12 12)"><animate fill="freeze" attributeName="stroke-dashoffset" begin="1.2s" dur="0.4s" values="28;0"></animate></path>
                      <path strokeDasharray={28} strokeDashoffset={28} d="M-1 13h26" transform="rotate(45 12 12)"><animate fill="freeze" attributeName="stroke-dashoffset" begin="1.2s" dur="0.4s" values="28;0"></animate></path>
                    </g>
                  </mask>
                  <rect width={24} height={24} fill="currentColor" mask="url(#lineMdFileDocumentOff0)"></rect>
                </svg>
                <span>
                  هیچ سند تایید نشده ای یافت نشد
                </span>

              </Box>
            )}

          </List>
        </Box>
      </CardContent>
      <CardActions>
        <Button
          variant="text"
          size="small"
          endIcon={<ChevronRightIcon />}
          onClick={() => router.push('/statements')}
        >

          مشاهدهمه

        </Button>
      </CardActions>

    </Card>
  )
}

function Dashboard(props: { session: Session }) {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <StatementReviewCard role={props.session!.data.role} />
      </div>
    </ThemeProvider>
  )
}

export default function CustomPage() {
  const AUTHITEM = gql`
        query AUTHITEM {
            authenticatedItem {
                ... on User {
                id
                role
                name
                createdAt
                }
            }
        }
      ` as import('../../__generated__/ts-gql/AUTHITEM').type

  const { data } = useQuery(AUTHITEM)

  return (
    <PageContainer header="Dashboard">
      <div dir="rtl">

        <h1>
          <b>{data?.authenticatedItem?.name}</b>
          &nbsp;
          خوش آمدید

        </h1>

        <h2>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 64 64">
            <path fill="#ffce31" d="M5.9 62c-3.3 0-4.8-2.4-3.3-5.3L29.3 4.2c1.5-2.9 3.9-2.9 5.4 0l26.7 52.5c1.5 2.9 0 5.3-3.3 5.3z" />
            <g fill="#231f20">
              <path d="m27.8 23.6l2.8 18.5c.3 1.8 2.6 1.8 2.9 0l2.7-18.5c.5-7.2-8.9-7.2-8.4 0" />
              <circle cx="32" cy="49.6" r="4.2" />
            </g>
          </svg>
          {' '}
          این صفحه در دست ساخت میباشد
        </h2>
        {data?.authenticatedItem?.role !== Roles.workshop
          ? (
              <p>
                <br />
                برای بارگزاری یا  مصوبات از
                <Link href="/approvals">اینجا</Link>
              </p>
            )
          : (
              <p>
                برای بارگزاری صورت وضعیت ها از
                <Link href="/statements">اینجا</Link>
              </p>
            )}
        <p>

          و
          برای بارگزاری نقشه ها از
          <Link href="/designs">اینجا</Link>
          اقدام کنید
        </p>

      </div>

      {data?.authenticatedItem && (
        <>
          <GanttChart />
          <Dashboard
            session={{
              itemId: data.authenticatedItem.id,
              listKey: 'users',
              data: {
                name: data.authenticatedItem.name!,
                createdAt: data.authenticatedItem.createdAt,
                role: data.authenticatedItem.role!,
              },
            }}
          />
        </>
      )}

    </PageContainer>
  )
}
