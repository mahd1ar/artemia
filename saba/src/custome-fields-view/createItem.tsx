import type { controller } from '@keystone-6/core/fields/types/relationship/views'
import type { CellComponent, FieldProps } from '@keystone-6/core/types'
import type { DialogProps } from '@mui/material'
import type { ReactNode } from 'react'
import { useLazyQuery, useMutation } from '@keystone-6/core/admin-ui/apollo'
import { CellContainer, CellLink, GraphQLErrorNotice } from '@keystone-6/core/admin-ui/components'
import { useKeystone, useList } from '@keystone-6/core/admin-ui/context'
import { Fields } from '@keystone-6/core/admin-ui/utils'
import { Button as KsBtn } from '@keystone-ui/button'
import { Box, Link, Stack, Text } from '@keystone-ui/core'
import { Checkbox, FieldContainer, FieldDescription, FieldLabel, FieldLegend, TextInput } from '@keystone-ui/fields'
import { LoadingDots } from '@keystone-ui/loading'
import { AlertDialog } from '@keystone-ui/modals'
import { useToasts } from '@keystone-ui/toast'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider, Typography } from '@mui/material'
import { gql } from '@ts-gql/tag/no-transform'
import React, { Fragment, useEffect } from 'react'
import { theme } from '../../data/utils'
import { useCreateItem } from './useCreateItem'

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
     title
     description
     title
      constractor {
        id
        name
      }
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

  const CREATE_AUTO_PAYMENT = gql`
mutation CREATE_AUTO_PAYMENT($data: PaymentCreateInput!) {
 createPayment(data: $data) {
  id
 }
}
` as import('../../__generated__/ts-gql/CREATE_AUTO_PAYMENT').type

  const GET_ROWS = gql`
query GET_ROWS($where: RowWhereInput!) {
  rows(where: $where) {
    total
  }
}` as import('../../__generated__/ts-gql/CREATE_ROWS').type

  const HEADERS = ['title', 'price', 'dateOfPayment', 'attachment']

  const [scroll, _setScroll] = React.useState<DialogProps['scroll']>('paper')
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [check, setCheck] = React.useState<boolean>(!!value.value)
  const [mode, setMode] = React.useState<'auto' | 'manual'>('auto')
  const [fileList, setFileList] = React.useState<FileList | null>(null)
  // TODO remove this : this is the same thing as linkedItem
  const newItemIsCreated = React.useRef<boolean>(!!value.value)
  const { createViewFieldModes } = useKeystone()
  const list = useList(field.refListKey)
  const paymentitemList = useList('PaymentItem')
  const createItemState = useCreateItem(list)
  const [newItemTitle, setNewItemTitle] = React.useState('')
  const refFieldKey = field.refFieldKey as 'invoice' | 'statement'
  const [loading, setLoading] = React.useState(false)
  const [disableAutoMode, setDisableAutoMode] = React.useState(false)
  const [createPaymentItem] = useMutation(CREATE_AUTO_PAYMENT)
  const [getRows] = useLazyQuery(GET_ROWS)

  const ItemId = React.useMemo(() => value.value?.id || '', [value])
  const { addToast } = useToasts()
  const descriptionElementRef = React.useRef<HTMLElement>(null)

  const fromItemValue = React.useRef({
    price: '',
    dateOfPayment: 0,
    constractorId: '',
  })

  React.useEffect(() => {
    if (isOpen) {
      const { current: descriptionElement } = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }

      (async () => {
        if (refFieldKey !== 'invoice') {
          setDisableAutoMode(true)
          setMode('manual')
          return
        }

        try {
          // this is for invoice only
          const parentTitle = itemValue?.title?.value?.inner?.value || ''
          const dateOfPayment: null | number = itemValue?.dateOfStatement?.value as number || null
          const rowsIds: null | Set<string> = itemValue?.rows?.value?.currentIds as Set<string> || null
          const constractorId = itemValue?.contractor?.value?.value?.id || ''

          if (parentTitle)
            setNewItemTitle(`پرداخت ${parentTitle}`)

          setLoading(true)
          if (!dateOfPayment) {
            throw new Error('date of payment canont be empty')
          }

          if (!constractorId)
            throw new Error('constractor canont be empty')

          if (!rowsIds)
            throw new Error('rows canont be empty')

          const { data } = await getRows({
            variables: {
              where: {
                id: {
                  in: Array.from(rowsIds),
                },
              },
            },
          })

          if (!data)
            throw new Error('rows canont be empty')

          const total = data.rows?.reduce((acc, curr) => acc + BigInt(curr.total), 0n)

          if (!total)
            throw new Error('rows canont be empty')

          fromItemValue.current = {
            price: String(total),
            dateOfPayment,
            constractorId,
          }
        }
        catch (error) {
          addToast({ title: String(error), tone: 'negative' })
          console.error(error)
          setIsOpen(false)
          setDisableAutoMode(true)
          // setMode('manual')
        }
        setLoading(false)
      })()
    }

    // if (isOpen) {
    // if (!newItemIsCreated.current) {
    // let parentTitle = ''
    // const constractor: null | { id: string, label: string } = null

    // if (refFieldKey === 'invoice') {
    //   if (itemValue?.title?.value?.inner?.value) {
    //     parentTitle = itemValue.title.value.inner.value
    //   }
    // }

    // if (parentTitle) {
    //   setNewItemTitle(parentTitle)
    // }

    // if (createItemState?.props?.value?.constractor && createItemState.props.value.constractor.kind === 'value') {
    //   createItemState.props.value.constractor.value.value
    //      = { id: 'clzjryc6800088pbn0f4aaokz', label: 'عبدالکریم sd طبس' }
    // }

    // if (createItemState?.props?.value?.paymentItems && createItemState.props.value.paymentItems.kind === 'value') {
    //   createItemState.props.value.paymentItems.value
    // }
    //   }
    // }
  }, [isOpen])

  useEffect(() => {
    if (mode === 'manual') {
      if (refFieldKey === 'invoice') {
        if (createItemState?.props?.value?.title && !createItemState.props.value.title?.value?.inner?.value) {
          createItemState.props.value.title = {
            kind: 'value',
            value: {
              inner: {
                kind: 'value',
                value: newItemTitle,
              },
            },
          }
        }

        if (createItemState.props.value.constractor.kind === 'value') {
          createItemState.props.value.constractor.value = { ...itemValue.contractor.value }
        }
      }
    }
  }, [mode])

  function closeDialog() {
    setCheck(false)
    setIsOpen(false)
    setMode('auto')
    setDisableAutoMode(false)
  }

  async function confirmCreate() {
    if (mode === 'auto') {
      // validate and create the item
      if (!newItemTitle.trim()) {
        return addToast({
          title: 'title cannot be empty',
          tone: 'negative',
        })
      }
      try {
        const { data } = await createPaymentItem({
          variables: {
            data: {
              title: newItemTitle,
              paymentItems: {
                create: {
                  attachment: !fileList || fileList.length === 0
                    ? undefined
                    : {
                        upload: fileList.item(0),
                      },
                  price: fromItemValue.current.price,
                  dateOfPayment: fromItemValue.current.dateOfPayment,
                },
              },
              constractor: {
                connect: {
                  id: fromItemValue.current.constractorId,
                },
              },
            },
          },
        })
        if (!data?.createPayment)
          throw new Error('error 500 . cannot create payment')
        setLoading(false)
        onChange?.({
          ...value,
          value: { id: data.createPayment.id!, label: data.createPayment.id },
        })
        closeDialog()
        setCheck(true)
        addToast({
          title: 'created',
          tone: 'positive',
        })
      }
      catch (error) {
        addToast({
          title: String(error),
          tone: 'negative',
        })
      }
      setLoading(true)
    }
    else {
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

      {ItemId
        ? (
            <KsBtn
              style={{ marginTop: '10px', marginBottom: '10px' }}
              tone="active"
              onClick={() => {
                window.open(`/payments/${ItemId}`)
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>

                مشاهده پرداخت
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M22 3h7v7m-1.5-5.5L20 12m-3-7H8a3 3 0 0 0-3 3v16a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3v-9" /></svg>
              </div>
            </KsBtn>
          )
        : (
            <Checkbox
              checked={check}
              onChange={() => {
                setIsOpen(true)
              }}
            >
              نشان به عنوان پرداخت
              شده
            </Checkbox>
          )}
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
            {loading && <LoadingDots label="loading" />}
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >

              <Accordion
                dir="rtl"
                defaultExpanded
                disabled={disableAutoMode}
                expanded={mode === 'auto'}
                onChange={() => setMode('auto')}
              >
                <AccordionSummary
                  dir="rtl"
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography component="span">
                    اضافه کردن
                    اطلاعات
                    پرداخت
                    از  فاکتور
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>

                  <Box paddingY="xlarge">
                    <Stack gap="medium">
                      <FieldLabel>
                        عنوان
                      </FieldLabel>
                      <TextInput
                        value={newItemTitle}
                        onChange={(event) => {
                          setNewItemTitle(event.target.value)
                        }}
                      />

                      <FieldLabel>
                        فیش واریز
                      </FieldLabel>
                      <input
                        type="file"
                        onChange={({ target: { validity, files } }) => {
                          if (validity.valid)
                            setFileList(files)
                        }}
                      />
                    </Stack>
                  </Box>

                </AccordionDetails>

                <AccordionActions>
                  <Button onClick={confirmCreate} color="success" variant="contained" disableElevation>
                    اضافه کردن سند پرداخت
                  </Button>
                </AccordionActions>

              </Accordion>

              <Accordion
                dir="rtl"
                expanded={mode === 'manual'}
                onChange={() => setMode('manual')}

              >
                <AccordionSummary
                  dir="rtl"
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                >
                  <Typography component="span">
                    اضافه کردن دستی
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>

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

                  <Box paddingY="xlarge">
                    <Fields {...createItemState.props} />
                  </Box>
                </AccordionDetails>
                <AccordionActions>

                </AccordionActions>
              </Accordion>

            </DialogContentText>
          </DialogContent>
          <DialogActions dir="rtl">
            {
              mode === 'manual' && (
                <Button onClick={confirmCreate} color="success" variant="text" disableElevation>
                  اضافه کردن سند پرداخت
                </Button>
              )

            }
            <Button onClick={confirmCancel}>بستن</Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>

    </FieldContainer>

  )
}

export const Cell: CellComponent<typeof controller> = ({ field, item }) => {
  const list = useList(field.refListKey)
  const data = item[field.path]
  const items = (Array.isArray(data) ? data : [data]).filter(Boolean)
  const displayItems = items.length < 3 ? items : items.slice(0, 2)
  const overflow = items.length < 3 ? 0 : items.length - 2

  return (
    <Text>
      {displayItems.map((item, index) => (
        <Fragment key={item.id}>
          {index ? ', ' : ''}
          <Link href={`/${list.path}/${item.id}`}>
            {/* {item.label || item.id} */}
            پرداخت شده ✅
          </Link>
        </Fragment>
      ))}
      {overflow ? `, and ${overflow} more` : null}
    </Text>
  )
}
