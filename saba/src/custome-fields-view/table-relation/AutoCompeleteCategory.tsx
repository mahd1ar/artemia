import React, { useState, useEffect } from "react";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
import {

    TextInput,
    Select,
} from "@keystone-ui/fields";
import { gql } from "@ts-gql/tag/no-transform";
import { useLazyQuery } from "@apollo/client";
import { useDebouncedValue } from "../../../data/utils";

type Option = {
    value: string
    label: string
} | null
const AutoCompeleteCategory: React.FC<{ value: string | null, rootCode: string, onChange: (value: Option) => void }> = (props) => {


    const CATEGORIES = gql`
    query CATEGORIES($where: CategoryWhereInput!) {
            categories(where: $where) {
                id
                code
                title  
            }
        }
    ` as import("../../../__generated__/ts-gql/CATEGORIES").type

    const [load, { loading, data }] = useLazyQuery(CATEGORIES)

    const [value, setValue] = useState<Option>(null)
    const [query, setQuery] = useState("")

    const debouncedQuery = useDebouncedValue(query, 500)

    useEffect(() => {
        if (!debouncedQuery) return
        load({ variables: { where: { parent: { code: { startsWith: props.rootCode } }, OR: [{ code: { contains: debouncedQuery } }, { title: { contains: debouncedQuery } }] } } })
    }, [debouncedQuery])

    useEffect(() => {

        if (!props.rootCode || !props.value) return
        if (props.value === value?.value) return

        // load category from api
        load({ variables: { where: { id: { equals: props.value } } } })
            .then(res => {
                const cat = res.data?.categories?.at(0)
                if (!cat) {
                    setValue(null)
                    console.error("FATAL ERROR - category not found")
                    return
                }

                setValue({ label: cat.title + ' - ' + cat.code, value: cat.id })
            })
    }, [props.rootCode, props.value])

    return (

        <Select
            isLoading={loading}
            value={value}
            options={data?.categories?.map(i => ({ label: i.title + ' - ' + i.code, value: i.id })) || []}
            onChange={e => {
                console.log("on change")
                console.log({ e })


                props.onChange(e)
                setValue(e)
            }}
            onInputChange={e => {
                if (!e) return
                setQuery(e)
            }}
        />
    );
}


export default AutoCompeleteCategory