import { useLazyQuery } from '@apollo/client';
import { type controller } from "@keystone-6/core/fields/types/relationship/views";
import { type FieldProps } from "@keystone-6/core/types";
import { FieldContainer, FieldLabel, TextInput } from "@keystone-ui/fields";
import { gql } from '@ts-gql/tag/no-transform';
import React, { useEffect, useMemo, useState } from "react";
// import { useRouter } from "@keystone-6/core/dist/declarations/src/admin-ui/router";
import { useKeystone } from "@keystone-6/core/admin-ui/context";
import { Button } from "@keystone-ui/button";
import { Stack, useTheme } from "@keystone-ui/core";
import { AlertDialog } from "@keystone-ui/modals";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider } from "@mui/material";
import { useRouter } from "next/router";
import { Roles } from "../../data/types";
import { theme } from "../../data/utils";
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

type GeneralTreeItem = {
  label: string,
  nodes: GeneralTreeItem[],
  children?: ChildNode[],
}
function RecursiveTreeItem({ item }: { item: GeneralTreeItem }) {
  return (
    <TreeItem itemId={item.label} label={item.label}>
      {item.nodes.map((node) => (
        <RecursiveTreeItem key={node.label} item={node} />
      ))}
    </TreeItem>
  );
}

function FirstComponent() {
  const treeData: GeneralTreeItem = {
    label: 'Components',
    nodes: [
      {
        label: 'Data Grid',
        nodes: [
          { label: '@mui/x-data-grid', nodes: [] },
          { label: '@mui/x-data-grid-pro', nodes: [] },
          { label: '@mui/x-data-grid-pro', nodes: [] },
        ],
      },
      {
        label: 'Date and Time Pickers',
        nodes: [
          { label: '@mui/x-date-pickers', nodes: [] },
          { label: '@mui/x-date-pickers-pro', nodes: [] },
          {
            label: 'Charts2',
            nodes: [{ label: '@mui/x-charts2', nodes: [] }],
          },
        ],
      },
      { label: 'Charts', nodes: [{ label: '@mui/x-charts', nodes: [] }] },
      { label: 'Tree View', nodes: [{ label: '@mui/x-tree-view', nodes: [] }] },
    ],
  };

  return (
    <Box sx={{ minHeight: 352, minWidth: 250 }}>
      <SimpleTreeView>
        <RecursiveTreeItem item={treeData} />
      </SimpleTreeView>
    </Box>
  );
}

export const Field = ({
  field,
  value,
  onChange,
  autoFocus,
  itemValue,
  forceValidation
}: FieldProps<typeof controller>) => {

  // console.log(useKeystone())
  // use keystone provider
  // console.log(React.useContext(KeystoneProvider(useKeystone())))
  console.log(useKeystone())

  if (value.kind !== 'cards-view')
    return <div>cant</div>


  console.log(value)

  const router = useRouter()

  const { colors: ksColors } = useTheme()


  function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
  ) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];



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
}`  as import('../../__generated__/ts-gql/ROWS_ITEM').type




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



  type Data = Omit<NonNullable<NonNullable<typeof persistedData>['rows']>, '__typename'>



  const [isOpen, setIsOpen] = useState(false)
  const [modelData, setModelData] = useState({
    commodityId: '',
    quantity: '0',
    unitPrice: '0',
    percentageOfWorkDone: '0',
    unit: '',
  })
  const [mode, setMode] = useState<'create' | 'update'>('create')
  const [data, setData] = useState<Data>([])
  const [candidateNoteId, setCandidateNoteId] = useState<string | undefined>(undefined)

  function resetModelData() {
    setModelData({
      commodityId: '',
      quantity: '0',
      unitPrice: '0',
      percentageOfWorkDone: '0',
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

      const res = await createNote({
        variables: {
          data: {
            message
          }
        }
      })

      if (res.errors?.length)
        throw new Error(res.errors[0].message)

      const createdNote = res.data?.createNote

      if (!createdNote) throw new Error('no note created')

      if (value.kind !== 'many')
        return

      if (onChange) {

        onChange({
          initialValue: value.initialValue,
          kind: 'many',
          id: value.id,
          value: [
            ...value.value,
            { id: createdNote.id, label: createdNote.id }
          ]
        })

        setData([
          ...data,
          {
            id: createdNote.id,
            message: createdNote.message || '',
            userName: createdNote.createdBy?.fullname || '',
            userId: createdNote.createdBy?.id || '',
            date: createdNote.createdAt,
            userRole: createdNote.createdBy?.role || Roles.guest
          }
        ])

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

      <FirstComponent />
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
          <TextInput value={modelData.commodityId} onChange={(e) => setModelData({ ...modelData, commodityId: e.target.value })} />
          <FieldLabel  >percentageOfWorkDone</FieldLabel>
          <TextInput value={modelData.percentageOfWorkDone} onChange={(e) => setModelData({ ...modelData, percentageOfWorkDone: e.target.value })} />
          <FieldLabel  >quantity</FieldLabel>
          <TextInput value={modelData.quantity} onChange={(e) => setModelData({ ...modelData, quantity: e.target.value })} />
          <FieldLabel  >unit</FieldLabel>
          <TextInput value={modelData.unit} onChange={(e) => setModelData({ ...modelData, unit: e.target.value })} />
          <FieldLabel  >unitPrice</FieldLabel>
          <TextInput value={modelData.unitPrice} onChange={(e) => setModelData({ ...modelData, unitPrice: e.target.value })} />
        </Stack>
      </AlertDialog>

      <ThemeProvider theme={theme}>
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

      <pre style={{ fontSize: '10px' }} >
        {JSON.stringify(value, null, 2)}
      </pre>
    </FieldContainer>


  );
};
