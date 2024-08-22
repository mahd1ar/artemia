import { useLazyQuery, useMutation } from '@apollo/client';
import { type controller } from "@keystone-6/core/fields/types/relationship/views";
import { type FieldProps } from "@keystone-6/core/types";
import { FieldContainer, FieldLabel, TextInput, Select } from "@keystone-ui/fields";
import { gql } from '@ts-gql/tag/no-transform';
import React, { useEffect, useMemo, useState } from "react";
import { useKeystone } from "@keystone-6/core/admin-ui/context";
import { Button } from "@keystone-ui/button";
import { Stack, useTheme } from "@keystone-ui/core";
import { AlertDialog } from "@keystone-ui/modals";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider } from "@mui/material";
import { Roles } from "../../../data/types";
import { theme } from "../../../data/utils";
import TreeCategories from "./TreeCategories";


export const Field = ({
  field,
  value,
  onChange,
  autoFocus,
  itemValue,
  forceValidation
}: FieldProps<typeof controller>) => {

  // use keystone provider
  // console.log(React.useContext(KeystoneProvider(useKeystone())))
  // console.log(useKeystone())

  if (value.kind !== 'cards-view')
    return <div>cant</div>



  const keystone = useKeystone()
  const unitOptions = useMemo(() => {
    return keystone.adminMeta.lists.Row.fields.unit.controller.options as { label: string, value: string }[]
  }, [keystone.adminMeta.lists.Row.fields.unit])

  const ROWS_ITEM = gql`
  query ROWS_ITEM($where: RowWhereInput!) {
  rows(where: $where) {
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
    invoice {
      id
    }
    statement {
      id
    }
  }      
}`  as import('../../../__generated__/ts-gql/ROWS_ITEM').type

  const ROW_CREATE = gql`
  mutation ROW_CREATE($data: RowCreateInput!) {
    createRow(data: $data) {
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
  }` as import('../../../__generated__/ts-gql/ROW_CREATE').type


  const [load, { data: persistedData, loading: loadingData, refetch }] = useLazyQuery(ROWS_ITEM, {
    nextFetchPolicy: 'network-only',
    variables: {
      where: {
        invoice: { // TODO <-  you can change this to a dynamic value based on url!!
          id: {
            equals: value.id
          }
        }
      }
    }
  })

  const [createRow] = useMutation(ROW_CREATE)


  type Data = Omit<NonNullable<NonNullable<typeof persistedData>['rows']>, '__typename'>



  const [isOpen, setIsOpen] = useState(false)
  const [treeIsOpen, settreeIsOpen] = useState(false)
  const [modelData, setModelData] = useState({
    commodityId: '',
    commodityLabel: '',
    quantity: '0',
    unitPrice: '0',
    percentageOfWorkDone: '100',
    unit: '',
  })
  const [mode, setMode] = useState<'create' | 'update'>('create')
  const [data, setData] = useState<Data>([])
  const [candidateNoteId, setCandidateNoteId] = useState<string | undefined>(undefined)

  function resetModelData() {
    setModelData({
      commodityId: '',
      commodityLabel: '',
      quantity: '0',
      unitPrice: '0',
      percentageOfWorkDone: '100',
      unit: '',
    })
  }

  // const [createNote, { loading: loadingCreate }] = useMutation(NOTES_CREATE)

  // const [updateNote, { loading: loadingUpdate }] = useMutation(NOTE_UPDATE)

  useEffect(() => {
    console.info('getting data...')
    load().then((res) => {

      setData(res.data?.rows ? structuredClone(res.data.rows) : [])


    })

  }, [])

  const headers = useMemo(() => {
    return value.displayOptions.cardFields
  }, [persistedData?.rows])


  async function tryCreate() {

    try {

      const res = await createRow({
        variables: {
          data: {
            commodity: {
              connect: {
                id: modelData.commodityId
              }
            },
            // description: modelData.description,
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


      }

    } catch (error) {
      console.error(error)
      alert("error! " + String(error))
    }

    setIsOpen(false)



  }

  async function tryUpdate() {

    try {

      const res = await updateNote({
        variables: {
          where: {
            id: candidateNoteId!
          },
          data: {
            message: message
          }
        }
      })

      if (res.errors?.length)
        throw new Error(res.errors[0].message)

      const updatedNote = res.data?.updateNote

      if (!updatedNote) throw new Error('no note created')

      if (value.kind !== 'many')
        return

      setData([
        ...data.map(i => i.id === candidateNoteId ? { id: i.id, message: message || '', userName: i.userName, userId: i.userId, userRole: i.userRole, date: i.date } : i)
      ])



    } catch (error) {
      console.error(error)
      alert("error! " + String(error))
    }

    setIsOpen(false)



  }

  return (


    <FieldContainer>

      <FieldLabel>{field.label}</FieldLabel>


      <ThemeProvider theme={theme}>



        <AlertDialog isOpen={isOpen} title="update or create" tone={'active'} actions={{
          confirm: {
            label: mode === 'create' ? 'اضافه کردن  ' : 'ویرایش ',
            action: async () => {

              if (mode === 'create') {
                tryCreate()
              } else {
                tryUpdate()
              }

            },
            // TODO
            // loading: loadingCreate || loadingUpdate 
          },
          cancel: {
            label: 'لغو',
            action() {
              setIsOpen(false)
              resetModelData()
            },
          }
        }} >
          <Stack gap="small" >

            <FieldLabel  >commodityId</FieldLabel>
            <AlertDialog isOpen={treeIsOpen} title="انتخاب دسته بندی کالا و خدمات" tone={'active'} actions={{
              confirm: {
                label: 'انتخاب  ',
                action: async () => {

                  settreeIsOpen(false)
                },
                // TODO loading: loadingCreate || loadingUpdate 
              },
              cancel: {
                label: 'لغو',
                action() {
                  settreeIsOpen(false)
                },
              }
            }} >

              <Box sx={{ minHeight: 352, minWidth: 250 }}>

                <TreeCategories rootCode='78' onSelect={(i) => {
                  settreeIsOpen(false)
                  setModelData({ ...modelData, commodityId: i.id, commodityLabel: i.title + ' - ' + i.code })
                }} />

              </Box>
            </AlertDialog>

            <TextInput value={modelData.commodityLabel} onClick={() => settreeIsOpen(true)} />
            <FieldLabel  >unit</FieldLabel>
            <Select options={unitOptions} value={unitOptions.find(i => i.value === modelData.unit) || null}
              onChange={
                (e) => {
                  setModelData({ ...modelData, unit: e ? e.value : '' })
                }
              } />

            <FieldLabel  >unitPrice</FieldLabel>
            <TextInput value={modelData.unitPrice} onChange={(e) => setModelData({ ...modelData, unitPrice: e.target.value })} />

            <FieldLabel  >quantity</FieldLabel>
            <TextInput value={modelData.quantity} onChange={(e) => setModelData({ ...modelData, quantity: e.target.value })} />

            <FieldLabel  >percentageOfWorkDone</FieldLabel>
            <TextInput value={modelData.percentageOfWorkDone} onChange={(e) => setModelData({ ...modelData, percentageOfWorkDone: e.target.value })} />
          </Stack>
        </AlertDialog>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {
                  headers.map((i, index) => <TableCell key={index}>{i}</TableCell>)
                }

              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {
                    headers.map((h, inx) => <TableCell key={inx} component={inx === 0 ? 'th' : undefined} scope={inx === 0 ? 'row' : undefined} align="right">{
                      // @ts-ignore
                      h in row ? typeof row[h] === "object" ? `${row[h].code} - ${row[h].title} ` : row[h] : '-'
                    }</TableCell>)
                  }
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ThemeProvider>

      <Button style={{ marginTop: "20px" }} tone="positive" onClick={() => {

        setIsOpen(true)
        setMode('create')


      }} > add  </Button>

      {/* <pre style={{ fontSize: '10px' }} >
        {JSON.stringify(value, null, 2)}
      </pre> */}
    </FieldContainer>


  );
};
