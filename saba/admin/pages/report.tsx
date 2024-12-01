import {
  useLazyQuery,
  useQuery,
} from '@apollo/client'
import { PageContainer } from '@keystone-6/core/admin-ui/components'
import { Button, Checkbox, FormControlLabel, FormGroup, Menu, MenuItem, type MenuProps, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'
import { gql } from '@ts-gql/tag/no-transform'
import React, { useMemo, useState } from 'react'

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    'borderRadius': 6,
    'marginTop': theme.spacing(1),
    'minWidth': 180,
    'color': 'rgb(55, 65, 81)',
    'boxShadow':
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
    ...theme.applyStyles('dark', {
      color: theme.palette.grey[300],
    }),
  },
}))

type Select = 'type' | 'title' | 'totalPayable' | 'rows'

export default function CustomPage() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [from, setFrom] = useState('withInvoceAndStatement')
  const [select, setSelect] = useState<{ isSelected: boolean, id: Select, label: string }[]>([
    { isSelected: true, id: 'type', label: 'نوع' },
    { isSelected: true, id: 'title', label: 'تیتر' },
    { isSelected: true, id: 'totalPayable', label: 'قابل پرداخت' },
    { isSelected: true, id: 'rows', label: 'احجام' },
  ])
  const [whereConstractor, setWhereConstractor] = useState<string | null>(null)

  const isOpenSelectMenu = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const REPORT = gql`
    query REPORT($withInvoce: Boolean!, $withStatement: Boolean!, $contractorId: ID) {
      invoices(where: {contractor: {id: {equals: $contractorId }} }) @include(if: $withInvoce) {
        id
        totalPayable
        title
        rows {
          total
          tax
          quantity
          commodity {
            title
            code
          }
        }
      }
      statements(where: { contract: {contractor: {id : {equals : $contractorId}}} } ) @include(if: $withStatement) {
        id
        totalPayable
        title
        rows {
          total
          tax
          quantity
          commodity {
            title
            code
          }
        }
      }
    }
  ` as import('../../__generated__/ts-gql/REPORT').type

  const CONSTRACTORS = gql`
    query CONSTRACTORS {
  constractors {
  name
  id  
  }
}
  ` as import('../../__generated__/ts-gql/CONSTRACTORS').type

  const [load, { data, loading }] = useLazyQuery(REPORT, { variables: {
    withInvoce: false,
    withStatement: false,
    contractorId: undefined,
  }, fetchPolicy: 'no-cache' })

  const { data: constractors } = useQuery(CONSTRACTORS)

  const fHeaders = useMemo(() => {
    return select.filter(s => s.isSelected)
  }, [select])

  const fData = useMemo(() => {
    const d: Record< Select, any>[] = []

    if (data) {
      data.invoices?.forEach((invoice) => {
        d.push({
          type: 'invoice',
          title: invoice.title || '',
          totalPayable: invoice.totalPayable,
          rows: invoice.rows?.map(r => ({
            total: r.total,
            tax: r.tax,
            quantity: r.quantity,
            commodity: r.commodity,
          })) || [],
        })
      })

      data.statements?.forEach((statement) => {
        d.push({
          type: 'statement',
          title: statement.title || '',
          totalPayable: statement.totalPayable,
          rows: statement.rows?.map(r => ({
            total: r.total,
            tax: r.tax,
            quantity: r.quantity,
            commodity: r.commodity,
          })) || [],
        })
      })
    }

    select.forEach((s) => {
      if (!s.isSelected) {
        d.forEach((d) => {
          delete d[s.id]
        })
      }
    })

    return d
  }, [data, select])

  function apply() {
    load({
      variables: {
        withInvoce: from === 'withInvoce' || from === 'withInvoceAndStatement',
        withStatement: from === 'withStatement' || from === 'withInvoceAndStatement',
        contractorId: whereConstractor,
      },
    })
  }

  return (
    <PageContainer header="Dashboard">
      <div dir="rtl">
        <h2>گزارش گیری</h2>
        <select onChange={e => setFrom(e.target.value)}>
          <option value="withInvoceAndStatement">Invoce & Statement</option>
          <option value="withStatement">statement</option>
          <option value="withInvoce">invoce</option>
        </select>

        <Button
          id="demo-customized-button"
          aria-controls={isOpenSelectMenu ? 'demo-customized-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={isOpenSelectMenu ? 'true' : undefined}
          variant="contained"
          disableElevation
          onClick={handleClick}
          // endIcon={<KeyboardArrowDownIcon />}
        >
          Options
        </Button>
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
          }}
          anchorEl={anchorEl}
          open={isOpenSelectMenu}
          onClose={handleClose}
        >
          <FormGroup>
            {select.map(option => (
              <MenuItem key={option.id} disableRipple selected={option.isSelected}>
                {/* onClick={handleClose} */}

                <FormControlLabel
                  control={(
                    <Checkbox
                      defaultChecked={option.isSelected}
                      value={option.isSelected}
                      onChange={() => setSelect(options => options.map(o => o.id === option.id ? { ...o, isSelected: !o.isSelected } : o))}
                    />
                  )}
                  label={option.label}
                />

              </MenuItem>
            ))}
          </FormGroup>

        </StyledMenu>
        <select onChange={e => setWhereConstractor(e.target.value || null)} name="" id="">
          <option
            value=""

          >
            همه
          </option>
          {constractors?.constractors?.map(c => (
            <option
              key={c.id}
              value={c.id}

            >
              {c.name}
            </option>
          )) }
        </select>

        <button type="button" onClick={apply}>اعمال</button>
        (
        {fData.length}
        )
      </div>

      <br />

      {loading && <div>Loading...</div>}

      <Paper sx={{ width: '100%' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={2}>
                  Country
                </TableCell>
                <TableCell align="center" colSpan={3}>
                  Details
                </TableCell>
              </TableRow>
              <TableRow>
                {fHeaders.map(column => (
                  <TableCell
                    key={column.id}
                    // align={column.align}
                    // style={{ top: 57, minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              { fData
              && fData.map((d, indexd) => {
                if (d === null || d === undefined)
                  return null

                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={indexd}>
                    { (Object.keys(d) as Array<keyof typeof d>).map((key) => {
                      const value = d[key]
                      if (typeof value === 'object')
                        return <TableCell key={key}>{JSON.stringify(value)}</TableCell>

                      return (
                        <TableCell key={key}>
                          {value}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Paper>

    </PageContainer>
  )
}
