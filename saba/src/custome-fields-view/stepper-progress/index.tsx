import React from "react";
import './main.scss'

export default function (props: { dataItems: { dataDesc: string, isDone: boolean, isCurrent: boolean }[] }) {


    return (
        <div dir="ltr" id="steps">
            {
                props.dataItems.map((i, index) => <div
                    key={index}
                    className={
                        Object.entries({ done: i.isDone, step: true, active: i.isCurrent })
                            .map(j => j[1] ? j[0] : '')
                            .join(' ')
                    }
                    data-desc={i.dataDesc} >
                    <span style={{ position: 'relative', top: '-5px' }} >
                        {index + 1}
                    </span>
                </div>)

            }

            {/* <div className=" done step" data-desc="Listing information">1</div>
            <div className=" done step" data-desc="Photos & Details">2</div>
            <div className=" done step active" data-desc="Review & Post">3</div>
            <div className="step " data-desc="Your order">4</div> */}
        </div>
    )
}