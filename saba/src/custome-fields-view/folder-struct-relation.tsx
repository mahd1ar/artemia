import React, { useEffect } from "react";
import { type FieldProps } from "@keystone-6/core/types";
import { FieldContainer, FieldLabel, Select } from "@keystone-ui/fields";
import { CheckIcon } from "@keystone-ui/icons";
import { type controller } from "@keystone-6/core/fields/types/relationship/views";
import { Fragment, useState } from "react";
import { useQuery, useLazyQuery } from '@apollo/client'
import { gql } from '@ts-gql/tag/no-transform'
// import { useRouter } from "@keystone-6/core/dist/declarations/src/admin-ui/router";
import { useRouter } from "next/router";


type Option = {
  value: string,
  label: string
}

export const Field = ({
  field,
  value,
  onChange,
  autoFocus,
  itemValue,
  forceValidation
}: FieldProps<typeof controller>) => {


  // console.log(value)

  const router = useRouter()


  const FOLDERS = gql`
        query FOLDERS($where: CategoryWhereInput!) {
            categories(where: $where) {
              id
              title
              childrenCount
              children {
                id
                title
              }
              parent {
                id
                title
              }
            }
          }
  ` as import('../../__generated__/ts-gql/FOLDERS').type

  type category = {
    id: string,
    title: string,
    childrenCount: number,
    children: category[],
    selectedChild?: {
      value: string, label: string
    }
  }


  const [cats, setCats] = useState<category[]>([])
  const [load, { data }] = useLazyQuery(FOLDERS)

  useEffect(() => {

    if ('value' in value)
      if (value.value?.id)
        fetchParent(value.value?.id, [])

      else
        fetchChildren()

  }, [])

  async function fetchParent(id: string, arr: category[]) {

    const res = await load({
      variables: {
        where: {
          id: {
            equals: id
          }
        }
      }
    })

    const item: category = {
      id: res.data?.categories?.[0]?.id || '',
      title: res.data?.categories?.[0]?.title || '',
      childrenCount: res.data?.categories?.[0]?.childrenCount || 0,
      children: res.data?.categories?.[0]?.children?.map(i => ({ id: i.id, title: i.title || '', childrenCount: i.childrenCount || 0, children: [] })) || [],
      selectedChild: {
        value: arr.length ? arr[arr.length - 1].id : '',
        label: arr.length ? arr[arr.length - 1].title : ''
      }
    }
    arr.push(item)

    if (res.data?.categories?.[0]?.parent?.id)
      fetchParent(res.data?.categories[0].parent.id, arr)
    else {

      arr.reverse()
      setCats(arr)
      console.log(arr)
    }


  }

  async function fetchChildren(parentId = "clz5dc92k0000zjq8ifrkgrt0", level = 0, title = '') {

    const res = await load({
      variables: {
        where: {
          parent: {
            id: {
              equals: parentId
            }
          }
        }
      }
    })

    const _catss = structuredClone(cats)
    const _cats: category[] = res.data?.categories?.map(i => {
      return {
        id: i.id,
        title: i.title || '',
        childrenCount: i.childrenCount || 0,
        children: []// i.children?.map(j => ({ id: j.id, title: j.title || '', childrenCount: j.childrenCount || 0, children: [] })) || []
      }
    }) || []


    _catss[level] = {
      id: parentId,
      title: res.data?.categories?.[0]?.parent?.title || '',
      children: _cats,
      childrenCount: _cats.length
    }

    for (let i = level + 1; i < _catss.length; i++) {
      _catss[i] = {
        id: '',
        title: '',
        children: [],
        childrenCount: 0
      }
    }

    if (_cats.length === 0) {

      onChange?.({
        value: {
          id: parentId,
          label: title,
        },
        kind: 'one',
        id: value.id,
        initialValue: value.initialValue
      })

    }

    console.log(_catss)
    setCats(_catss)
  }



  return (

    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      {
        cats.map((i, index) => {

          if (!i.childrenCount) return null

          return (

            <Select
              css={{ marginTop: '0.5rem' }}
              onChange={e => {

                fetchChildren(e?.value, index + 1, i.title)
              }}
              value={i.selectedChild}
              key={index}
              options={i.children.map(j => ({ value: j.id, label: j.title }))} />

          )
        })
      }

    </FieldContainer>

  );
};
