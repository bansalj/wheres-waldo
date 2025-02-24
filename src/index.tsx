import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface IProp {
    onClick: () => void;
}

interface event extends Event {
    clientX: string,
    clientY: string
}

let mouse: event

export default function Index() {

    return (
        <>
            <div className="content">
                <div className="container">
                    <img src="925901.jpg" onClick={(event: React.MouseEvent<HTMLElement>) => {
                        console.log({X: event.clientX, Y: event.clientY})
                        }} alt="" style={{width:"90%"}}/>
                </div>
                <div><code>: <span style={{color:"white"}}>n/a</span></code></div>
            </div>
        </>
    )

}