import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";



export default function Index() {

    const [visibility, setVisibility] = useState("hidden");
    const [styleTop, setStyleTop] = useState(0);
    const [styleLeft, setStyleLeft] = useState(0);
 
    function pointerDown(event: React.MouseEvent<HTMLElement>) {
        console.log(`X: ${event.clientX}, Y: ${event.clientY}`)
            setVisibility("visible");
            setStyleTop(event.clientY - 20);
            setStyleLeft(event.clientX - 50);

    }

    function pointerUp(event: React.MouseEvent<HTMLElement>) {
        setVisibility("hidden");
    }

    return (
        <>
            <div className="content">
                <div className="container">
                    <img src="925901.jpg" onPointerDown={pointerDown}  style={{height:"90%", width:"100%"}}/>   
                </div>
                <div className={visibility}  >
                    <Menu 
                    styleLeft={styleLeft}
                    styleTop={styleTop}/>
                </div>
            </div>
        </>
    )

}

function Menu({ styleTop, styleLeft }) {
    return (
        <>
            <label>
                Choose:
                <select name="options" id="" className="menu" style={{top: styleTop + "px", left: styleLeft + "px"}}>
                    <option value="Waldo">Waldo</option>
                    <option value="NPC1">NPC1</option>
                    <option value="NPC2">NPC2</option>
                </select>
            </label>
        </>
    )
}  