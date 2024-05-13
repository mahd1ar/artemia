import React from "react"
import { PageContainer } from '@keystone-6/core/admin-ui/components';
import axios from "axios";


export default function ChangeLog() {

    const [innerhtml, setInnerhtml] = React.useState('')


    React.useEffect(() => {

        axios('/api/v1/changelog')
            .then(i => {

                setInnerhtml(i.data)
            })

    }, [])


    return (


        <div dangerouslySetInnerHTML={{ __html: innerhtml }} ></div>


    )
}