import type { controller } from '@keystone-6/core/fields/types/virtual/views'
import type { CardValueComponent, CellComponent, FieldProps } from '@keystone-6/core/types'
import { useLazyQuery } from '@apollo/client'
import { CellContainer, CellLink } from '@keystone-6/core/admin-ui/components'
import { FieldContainer, FieldLabel } from '@keystone-ui/fields'
import { gql } from '@ts-gql/tag/no-transform'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { NumUtils } from '../../data/utils'

export function Field({
  field,
  value,
}: FieldProps<typeof controller>) {
  const router = useRouter()

  const [link, setLink] = useState('#')

  const GETCORESPONDINGSTATEMENTS = gql`
    query GETCORESPONDINGSTATEMENTS($id: ID!){
      contract(where: {id: $id}){
        id
        statements { id }
      }
    }
  ` as import('../../__generated__/ts-gql/GETCORESPONDINGSTATEMENTS').type

  const [load] = useLazyQuery(GETCORESPONDINGSTATEMENTS)

  useEffect(() => {
    (async () => {
      if (router.pathname !== '/contracts/[id]') {
        return
      }
      const id = router.query.id as string
      if (!id)
        return
      const res = await load({ variables: { id } })

      if (!res.data?.contract?.statements?.length)
        return

      const statements = res.data.contract.statements.map(i => i.id).join(',')

      setLink(
        `/payments?!statement_matches="${statements}"`,
      )
    })()
  }, [])

  return (
    <>
      <FieldContainer>
        <FieldLabel>{field.label}</FieldLabel>
        {value
          ? (
              <Link
                href={link}
                style={{
                // backgroundColor: '#02c948',
                  borderRadius: 4,
                  color: '#02c948',
                  padding: '1px 4px',
                  display: 'inline-flex',
                  fontWeight: 500,
                  gap: '4px',
                  flexDirection: 'row',
                  flexWrap: 'nowrap',
                  justifyContent: 'flex-start',
                }}
              >
                <span style={{ fontSize: '17px' }}>

                  {typeof value !== 'symbol' ? Intl.NumberFormat('us-en').format(value) : '0'}
                  { ' '}
                  IRR
                </span>
              </Link>
            )
          : <div> - </div>}
      </FieldContainer>

    </>
  )
}

export const Cell: CellComponent = ({ item, field, linkTo }) => {
  const value = String(item[field.path])
  return linkTo
    ? <CellLink {...linkTo}>{value}</CellLink>
    : (
        <CellContainer>
          {
            value !== 'null' && !!+value
              ? (
                  <span style={{
                    backgroundColor: '#02c948',
                    borderRadius: 4,
                    color: '#edffea',
                    padding: '1px 4px',
                  }}
                  >
                    {' '}
                    {NumUtils.format(+(value))}
                    {' IRR '}
                  </span>
                )
              : '0'
          }
        </CellContainer>
      )
}
Cell.supportsLinkTo = true

export const CardValue: CardValueComponent = ({ item, field }) => {
  let str = '-'

  try {
    str = Intl.NumberFormat('us-en').format(item[field.path])

    str = `${str} ریال `
  }
  catch (error) {
    console.error(error)
  }

  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      <div>
        {str}
      </div>
    </FieldContainer>
  )
}
