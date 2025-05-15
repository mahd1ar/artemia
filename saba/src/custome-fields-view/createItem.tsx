import type { controller } from '@keystone-6/core/fields/types/relationship/views'
import type { FieldProps } from '@keystone-6/core/types'
import type { DialogProps } from '@mui/material'
import type { ReactNode } from 'react'
import { useLazyQuery } from '@apollo/client'
import { GraphQLErrorNotice } from '@keystone-6/core/admin-ui/components'
import { useKeystone, useList } from '@keystone-6/core/admin-ui/context'
import { Fields } from '@keystone-6/core/admin-ui/utils'
import { Box } from '@keystone-ui/core'
import { Checkbox, FieldContainer, FieldDescription, FieldLabel } from '@keystone-ui/fields'
import { LoadingDots } from '@keystone-ui/loading'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider } from '@mui/material'
import { gql } from '@ts-gql/tag/no-transform'
import React, { useEffect } from 'react'
import { theme } from '../../data/utils'
import { useCreateItem } from './useCreateItem'

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein }
}

function Condition(props: { iff: boolean, children: ReactNode }) {
  return props.iff ? props.children : null
}

export function Field({
  field,
  value,
  onChange,
  itemValue,
}: FieldProps<typeof controller> & { itemValue?: any }) {
  // this view is only for the one relation
  // if you want to use it for many relation, you need to change the code
  if (value.kind !== 'one')
    return null

  const CURR_PAYMENT = gql`
  query CURR_PAYMENT ($id : ID!){
   payment (where: {id: $id}){
     id
     price
     title
     description
     paymentItems {
      id
      title
      price
      dateOfPayment
      attachment {
        url
      }
     }
   }
 }
` as import('../../__generated__/ts-gql/CURR_PAYMENT').type

  const HEADERS = ['title', 'price', 'dateOfPayment', 'attachment']

  const [scroll, _setScroll] = React.useState<DialogProps['scroll']>('paper')
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [check, setCheck] = React.useState<boolean>(!!value.value)
  const newItemIsCreated = React.useRef<boolean>(!!value.value)
  const { createViewFieldModes } = useKeystone()
  const list = useList(field.refListKey)
  const paymentitemList = useList('PaymentItem')
  const createItemState = useCreateItem(list)
  const [loadItem, { loading, error, data }] = useLazyQuery(CURR_PAYMENT, {
    variables: {
      id: value.value?.id || '',
    },
  })

  const descriptionElementRef = React.useRef<HTMLElement>(null)

  React.useEffect(() => {
    if (isOpen) {
      const { current: descriptionElement } = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [isOpen])

  useEffect(() => {
    console.log(paymentitemList)
    console.log(value)
    console.log(itemValue)
    console.log(createItemState)
    // return

    if (!newItemIsCreated.current) {
      const parrentTitle = itemValue?.title?.value?.inner?.value || ''
      if (parrentTitle) {
        createItemState.props.value.title = {
          kind: 'value',
          value: {
            inner: {
              kind: 'value',
              value: ` پرداخت ${parrentTitle} `,
            },
          },
        }
      }

      return
    }
    (async () => {
      await loadItem()
    })()
  }, [])

  function closeDialog() {
    if (!newItemIsCreated.current) {
      setCheck(false)
    }
    setIsOpen(false)
  }

  async function confirmCreate() {
    const item = await createItemState.create()
    if (item) {
      newItemIsCreated.current = true
      // onCreate({ id: item.id, label: item.label || item.id })
      // onChange?.({
      //   kind: 'one',
      //   id: value.id,
      //   initialValue: value.initialValue,
      //   value: { id: item.id, label: item.label || item.id },
      // })
      onChange?.({
        ...value,
        value: { id: item.id, label: item.label || item.id },
      })
      setCheck(true)
    }
    closeDialog()
  }

  function confirmCancel() {
    if (
      !createItemState.shouldPreventNavigation
      // eslint-disable-next-line no-alert
      || window.confirm('There are unsaved changes, are you sure you want to exit?')
    ) {
      closeDialog()
    }
  }

  return (

    <FieldContainer>

      <FieldLabel as="legend">{field.label}</FieldLabel>
      <FieldDescription id={`${field.path}-description`}>
        {field.description}
      </FieldDescription>

      <Checkbox
        checked={check}
        onChange={() => {
          setIsOpen(true)
        }}
      >
        نشان به عنوان پرداخت
        شده
      </Checkbox>

      <ThemeProvider theme={theme}>
        <Dialog
          open={isOpen}
          onClose={close}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          fullWidth
        >
          <DialogTitle dir="rtl" id="scroll-dialog-title">{field.label}</DialogTitle>
          <DialogContent dividers={scroll === 'paper'}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              {createViewFieldModes.state === 'error' && (
                <GraphQLErrorNotice
                  networkError={
                    createViewFieldModes.error instanceof Error ? createViewFieldModes.error : undefined
                  }
                  errors={
                    createViewFieldModes.error instanceof Error ? undefined : createViewFieldModes.error
                  }
                />
              )}
              {createViewFieldModes.state === 'loading' && <LoadingDots label="Loading create form" />}
              {createItemState.error && (
                <GraphQLErrorNotice
                  networkError={createItemState.error?.networkError}
                  errors={createItemState.error?.graphQLErrors}
                />
              )}
              <Condition iff={!!data?.payment?.paymentItems}>

                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        {
                          HEADERS.map(h => (
                            <TableCell align="right" key={h}>
                              { paymentitemList.fields[h].label }
                            </TableCell>
                          ))
                        }

                        {/* <TableCell align="right">Calories</TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data?.payment?.paymentItems?.map((pi) => {
                        return (
                          <TableRow
                            key={pi.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell align="right">{pi.title}</TableCell>
                            <TableCell align="right">{pi.price}</TableCell>
                            <TableCell align="right">{pi.dateOfPayment ? new Date(+pi.dateOfPayment * 1000).toLocaleDateString('fa') : null}</TableCell>
                            <TableCell align="right">{pi.attachment?.url ? <img src={pi.attachment.url} /> : '-'}</TableCell>

                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Condition>

              <Box paddingY="xlarge">
                <Fields {...createItemState.props} />
              </Box>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={confirmCancel}>Cancel</Button>
            <Button onClick={confirmCreate}>Subscribe</Button>
            {
              newItemIsCreated.current
              && <Button color="error">delete</Button>
            }
          </DialogActions>
        </Dialog>
      </ThemeProvider>

    </FieldContainer>

  )
}
