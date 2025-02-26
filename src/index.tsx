import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";



export default function Index() {

    const [visibility, setVisibility] = useState("hidden");

    function pointerDown(event: React.MouseEvent<HTMLElement>) {
        console.log(`X: ${event.screenX}, Y: ${event.screenY}`)
            setVisibility("visible");
    }

    function pointerUp(event: React.MouseEvent<HTMLElement>) {
        setVisibility("hidden");
    }

    return (
        <>
            <div className="content">
                <div className="container">
                    <img src="925901.jpg" onPointerDown={pointerDown} onPointerUp={pointerUp} style={{height:"90%", width:"100%"}}/>   
                </div>
                <div className={visibility}>
                    <Menu/>
                </div>
            </div>
        </>
    )

}

function Menu({}) {
    return (
        <>
            <label>
                Choose:
                <select name="options" id="">
                    <option value="Waldo">Waldo</option>
                    <option value="NPC1">NPC1</option>
                    <option value="NPC2">NPC2</option>
                </select>
            </label>
        </>
    )
}  