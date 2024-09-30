import { useLazyQuery, useMutation } from '@apollo/client';
import { useKeystone, useList } from "@keystone-6/core/admin-ui/context";
import { type controller } from "@keystone-6/core/fields/types/relationship/views";
import { type FieldProps } from "@keystone-6/core/types";
import { Button } from "@keystone-ui/button";
import { Stack } from "@keystone-ui/core";
import { FieldContainer, FieldLabel, Select, TextInput, TextArea } from "@keystone-ui/fields";
import { AlertDialog } from "@keystone-ui/modals";
import { Box, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, ThemeProvider } from "@mui/material";
import { green } from '@mui/material/colors';
import { gql } from '@ts-gql/tag/no-transform';
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { theme } from "../../../data/utils";
import AutoCompeleteCategory from "./AutoCompeleteCategory";
import TreeCategories from "./TreeCategories";


const StyledPaper = styled(Paper)(({ theme }) => ({
  boxShadow: theme.shadows[0],
  border: '1px solid',
  borderColor: theme.palette.divider,
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.primary.main,
    backgroundColor: green['A700'],
    color: theme.palette.common.white,
    fontWeight: 600,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    cursor: "pointer"
  },
  [`& p`]: {
    color: theme.palette.grey[600]
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const Field = ({
  field,
  value,
  onChange,
  autoFocus,
  itemValue,
  forceValidation
}: FieldProps<typeof controller>) => {

  if (value.kind !== 'cards-view')
    return <div>cant</div>

  const router = useRouter()

  const param = router.asPath.split('/').filter(Boolean).at(0)
  const resource = param === 'invoices' ? 'invoice' : param === 'statements' ? 'statement' : null

  if (!resource) return <div>cant</div>

  const RowList = useList('Row')
  // @ts-ignore
  const unitOptions = RowList.fields.unit.controller.options as { label: string, value: string }[]


  const ROWS_ITEM = gql`
  query ROWS_ITEM($where: RowWhereInput!) {
  rows(where: $where) {
    id  
    unit
    unitPrice
    total
    description
    commodity {
      code
      id
      title
    }
    description
    quantity
    percentageOfWorkDone
  }
  setting {
    rootCategoryOfGoodsAndServices
  }
}`  as import('../../../__generated__/ts-gql/ROWS_ITEM').type

  const ROW_CREATE = gql`
  mutation ROW_CREATE($data: RowCreateInput!) {
    createRow(data: $data) {
      id  
      unit
      unitPrice
      total
      description
      commodity {
        code
        id
        title
      }
      description
      quantity
      percentageOfWorkDone
    }
  }` as import('../../../__generated__/ts-gql/ROW_CREATE').type

  const updateRow = gql`
  mutation ROW_UPDATE($where: RowWhereUniqueInput!,$data: RowUpdateInput!) {
    updateRow(data: $data, where: $where) {
      id  
      unit
      unitPrice
      total
      commodity {
        code
        id
        title
      }
      description
      quantity
      percentageOfWorkDone
    }
  }` as import('../../../__generated__/ts-gql/ROW_UPDATE').type

  const [load, { data: persistedData, loading: loadingData, refetch }] = useLazyQuery(ROWS_ITEM, {
    nextFetchPolicy: 'network-only',
    variables: {
      where: {
        [resource]: {
          id: {
            equals: value.id
          }
        }
      }
    }
  })

  const [createRow, { loading: loadingCreate }] = useMutation(ROW_CREATE)
  const [updateRowData, { loading: loadingUpdate }] = useMutation(updateRow)

  type Data = Omit<NonNullable<NonNullable<typeof persistedData>['rows']>, '__typename'>[0]


  const [isOpen, setIsOpen] = useState(false)
  const [treeIsOpen, settreeIsOpen] = useState(false)
  const [modelData, setModelData] = useState({
    id: '',
    commodityId: '',
    description: '',
    commodity: '',
    quantity: '0',
    unitPrice: '0',
    percentageOfWorkDone: '100',
    unit: '',
    total: ""
  })
  const [data, setData] = useState<Array<typeof modelData>>([])
  const [candidateCommodity, setCandidateCommodity] = useState<{ id: string, title: string, code: string } | null>(null)

  function resetModelData() {
    setModelData({
      id: '',
      commodityId: '',
      description: '',
      commodity: '',
      quantity: '0',
      unitPrice: '0',
      percentageOfWorkDone: '100',
      unit: '',
      total: ""
    })
  }

  function setDateFromApi(ds: Data[] | Data) {

    function prepareData(serverData: Data) {
      return {
        id: serverData?.id || '',
        commodityId: serverData?.commodity?.id || '',
        commodity: serverData.commodity?.title || '',
        percentageOfWorkDone: String(serverData.percentageOfWorkDone || 0),
        description: serverData?.description || '',
        quantity: String(serverData.quantity || 0),
        unitPrice: Intl.NumberFormat().format(serverData.unitPrice || 0),
        unit: serverData.unit || '',
        total: Intl.NumberFormat().format(serverData.total || 0)
      }
    }

    if (Array.isArray(ds)) {
      setData(ds.map(i => ({
        ...prepareData(i),
      })))

    } else {
      const preparedData = prepareData(ds)

      // find and replace or add:

      const index = data.findIndex(i => i.id === preparedData.id)

      if (index > -1) {
        setData([...data.slice(0, index), preparedData, ...data.slice(index + 1)])
      } else

        setData([...data, {
          ...preparedData,
        }])
    }
  }

  function setModelDataFromRow(row: typeof modelData | undefined) {

    setIsOpen(true)

    if (typeof row === 'undefined') return resetModelData()

    function stripUselessChars(str: string) {
      return str.replace(/[,.\s]/g, '')
    }

    setModelData({
      id: row.id,
      commodityId: row.commodityId,
      commodity: row.commodity,
      quantity: row.quantity,
      description: row.description,
      unitPrice: stripUselessChars(row.unitPrice),
      percentageOfWorkDone: row.percentageOfWorkDone,
      unit: row.unit,
      total: row.total
    })
  }


  useEffect(() => {
    console.info('getting data...')
    load().then((res) => {

      // @ts-ignore
      setDateFromApi(res.data?.rows ?? [])

    })

  }, [])

  const headers = useMemo(() => {

    return value.displayOptions.cardFields.map(i => ({ label: RowList.fields[i].label, value: i }))
  }, [persistedData?.rows])

  const computedFinalPrice = useMemo(() => {
    const quantity = +modelData.quantity || 0
    const unitPrice = +modelData.unitPrice || 0
    let percentageOfWorkDone = +modelData.percentageOfWorkDone || 0

    if (percentageOfWorkDone > 100) percentageOfWorkDone = 100

    return Intl.NumberFormat().format((Number(quantity) * Number(unitPrice)) * Number(percentageOfWorkDone) / 100)

  }, [modelData.quantity, modelData.unitPrice, modelData.percentageOfWorkDone])


  const totalPrice = useMemo(() => {
    return data.reduce((acc, i) => {
      console.log()
      return acc + +i.total.replace(/[,.\s-]/g, '')
    }, 0)
  }, [data])


  function validateModelData() {
    if (!modelData.commodityId ||
      !modelData.unit ||
      !modelData.quantity)
      return false
    else
      return true
  }

  async function tryCreate() {

    if (!validateModelData())
      return alert("مقادیر وارد شده صحیح نیست!. لطفا ورودی ها را بررسی کنید")

    try {

      const res = await createRow({
        variables: {
          data: {
            commodity: {
              connect: {
                id: modelData.commodityId
              }
            },
            description: modelData.description,
            unit: modelData.unit,
            unitPrice: parseInt(modelData.unitPrice),
            quantity: parseFloat(modelData.quantity),
            percentageOfWorkDone: parseInt(modelData.percentageOfWorkDone)
          }
        }
      })

      if (res.errors?.length)
        throw new Error(res.errors[0].message)

      const createdRow = res.data?.createRow

      if (!createdRow) throw new Error('no note created')

      if (value.kind !== 'cards-view')
        return

      if (onChange) {

        onChange({
          ...value,
          currentIds: field.many ? new Set([...value.currentIds, createdRow.id]) : new Set([createdRow.id]),
        })
        // refetch

        setDateFromApi(createdRow)


      }

    } catch (error) {
      console.error(error)
      alert("error! " + String(error))
    }

    setIsOpen(false)



  }

  async function tryUpdate() {

    if (!validateModelData())
      return alert("مقادیر وارد شده صحیح نیست!. لطفا ورودی ها را بررسی کنید")

    try {

      const res = await updateRowData({
        variables: {
          where: {
            id: modelData.id
          },
          data: {
            commodity: {
              connect: {
                id: modelData.commodityId
              }
            },
            percentageOfWorkDone: parseInt(modelData.percentageOfWorkDone),
            unitPrice: parseInt(modelData.unitPrice),
            quantity: parseFloat(modelData.quantity),
            unit: modelData.unit,
            description: modelData.description,
          }
        }
      })

      if (res.errors?.length)
        throw new Error(res.errors[0].message)

      const updatedRow = res.data?.updateRow

      if (!updatedRow) throw new Error('no note created')


      setDateFromApi(updatedRow)


    } catch (error) {
      console.error(error)
      alert("error! " + String(error))
    }

    setIsOpen(false)



  }

  if (loadingData) return <div>loading...</div>


  return (


    <FieldContainer>

      <FieldLabel>{field.label}


      </FieldLabel>
      <Button style={{ marginTop: "10px", marginBottom: "10px" }}
        tone="positive"
        onClick={() => { setModelDataFromRow(undefined) }} >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }} >

          اضافه کردن ایتم جدید
          {/* plus icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeDasharray={16} strokeDashoffset={16} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path d="M5 12h14"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="16;0"></animate></path><path d="M12 5v14"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.4s" values="16;0"></animate></path></g></svg>
        </div>
      </Button>


      <ThemeProvider theme={theme}>

        <AlertDialog isOpen={isOpen} title="update or create" tone={'active'} actions={{
          confirm: {
            label: modelData.id === '' ? 'اضافه کردن  ' : 'ویرایش ',
            action: async () => {

              if (modelData.id) tryUpdate()
              else tryCreate()
            },
            loading: loadingCreate || loadingUpdate
          },
          cancel: {
            label: 'لغو',
            action() {
              setIsOpen(false)
              resetModelData()
            },
          }
        }} >
          <fieldset disabled={!onChange} style={{ height: ' calc( 96dvh - 143px)', overflow: 'auto' }} >
            <Stack gap="small" >

              <FieldLabel  > کالا </FieldLabel>

              <AutoCompeleteCategory
                rootCode={persistedData?.setting?.rootCategoryOfGoodsAndServices || '8'}
                value={modelData.commodityId}
                onChange={(i) => {
                  if (i)
                    setModelData({ ...modelData, commodityId: i.value, commodity: i.label })
                }}
              />
              <AlertDialog isOpen={treeIsOpen} title="انتخاب دسته بندی کالا و خدمات" tone={'active'} actions={{
                confirm: {
                  label: 'انتخاب  ',
                  action: async () => {
                    settreeIsOpen(false)
                    if (candidateCommodity) {

                      setModelData({ ...modelData, commodityId: candidateCommodity.id, commodity: candidateCommodity.title + ' - ' + candidateCommodity.code })
                      setCandidateCommodity(null)
                    }
                  },
                  // TODO loading: loadingCreate || loadingUpdate 
                },
                cancel: {
                  label: 'لغو',
                  action() {
                    setCandidateCommodity(null)
                    settreeIsOpen(false)
                  },
                }
              }} >

                <Box sx={{ minHeight: 352, minWidth: 250, maxHeight: 'calc(98dvh - 148px)', overflow: 'auto' }}>

                  <TreeCategories
                    rootCode={persistedData?.setting?.rootCategoryOfGoodsAndServices || '78'}
                    onSelect={(i) => {
                      settreeIsOpen(false)
                      setModelData({ ...modelData, commodityId: i.id, commodity: i.title + ' - ' + i.code })
                    }}
                    onClicked={(i) => {
                      console.log(i)
                      setCandidateCommodity(i)
                    }}
                  />

                </Box>
              </AlertDialog>
              <Button onClick={() => settreeIsOpen(true)} >انتخاب دسته بندی کالا و خدمات</Button>
              <FieldLabel  > واحد </FieldLabel>
              <Select options={unitOptions} value={unitOptions.find(i => i.value === modelData.unit) || null}
                onChange={
                  (e) => {
                    setModelData({ ...modelData, unit: e ? e.value : '' })
                  }
                } />


              <FieldLabel  > توضیحات </FieldLabel>
              <TextArea value={modelData.description} onChange={(e) => setModelData({ ...modelData, description: e.target.value })} />

              <FieldLabel  > قیمت واحد </FieldLabel>
              <TextInput value={modelData.unitPrice} onChange={(e) => setModelData({ ...modelData, unitPrice: e.target.value })} />

              <FieldLabel  >مقدار</FieldLabel>
              <TextInput value={modelData.quantity} onChange={(e) => setModelData({ ...modelData, quantity: e.target.value })} />

              <FieldLabel  >درصد انجام کار</FieldLabel>
              <TextInput
                value={modelData.percentageOfWorkDone} onChange={(e) => setModelData({ ...modelData, percentageOfWorkDone: e.target.value })} />

              <FieldLabel  >جمع </FieldLabel>


              <TextInput disabled value={computedFinalPrice}
                onChange={(e) => setModelData({ ...modelData, percentageOfWorkDone: e.target.value })} />

            </Stack>
          </fieldset>
        </AlertDialog>
        <TableContainer component={StyledPaper}>
          <Table aria-label="simple table">
            <TableHead sx={{ color: 'red !important' }} >
              <TableRow>
                {
                  headers.map((i, index) => <StyledTableCell key={index} align={index === 0 ? 'left' : 'right'} >{i.label}</StyledTableCell>)
                }

              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <StyledTableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  onClick={() => {
                    setModelDataFromRow(row);
                  }}
                >
                  {
                    headers.map(({ value: h }, inx) => <StyledTableCell key={inx} component={inx === 0 ? 'th' : undefined} scope={inx === 0 ? 'row' : undefined} align="right">{
                      // @ts-ignore
                      h in row ? typeof row[h] === "object" ? `${row[h].code} - ${row[h].title} ` : row[h] : '-'
                    }</StyledTableCell>)
                  }
                </StyledTableRow>

              ))}
              {
                data.length ?
                  <TableRow>
                    <StyledTableCell colSpan={headers.length - 2} />
                    <StyledTableCell >Subtotal</StyledTableCell>
                    <StyledTableCell align="right" sx={{ fontWeight: 'bold' }} >
                      {Intl.NumberFormat().format(totalPrice)}

                    </StyledTableCell>
                  </TableRow> :
                  <TableRow>
                    <StyledTableCell colSpan={headers.length} align='center' >
                      <p>هیچ رکوردی برای نمایش وجود ندارد</p>
                    </StyledTableCell>
                  </TableRow>
              }
            </TableBody>
          </Table>
        </TableContainer>
      </ThemeProvider>


      {/* <pre style={{ fontSize: '10px' }} >
        {JSON.stringify(value, null, 2)}
      </pre> */}
    </FieldContainer>


  );
};
