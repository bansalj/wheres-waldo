import React, { useState, useEffect } from "react";

export default function Index() {

    const [visibility, setVisibility] = useState("hidden");
    const [styleTop, setStyleTop] = useState(0);
    const [styleLeft, setStyleLeft] = useState(0);
    const [clicked, setClicked] = useState(false);
 
    function pointerDown(event: React.MouseEvent<HTMLElement>) {
        setClicked(true);
        if (clicked) {
            console.log(`X: ${event.pageX}, Y: ${event.pageY}`)
            setVisibility("visible");
            setStyleTop(event.clientY - 20);
            setStyleLeft(event.clientX + 10);
            setClicked(false);
        } else {
            setVisibility("hidden");
        }       
    }

    function validate(event: React.MouseEvent<Event>) {

    }

    function waldo(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        console.log("You found Waldo!")      
    }

    return (
        <>
            <div className="content">
                <div className="container">
                    <img src="925902.jpg" useMap="#areamap" onClick={pointerDown}/>   
                <map name="areamap">
                    <area coords="1657,945,1618,865" alt="map" href="null" onClick={waldo}/>
                </map>
                <div className={visibility}>
                    <Menu
                    styleLeft={styleLeft}
                    styleTop={styleTop}/>
                </div>
                </div>  
            </div>
        </>
    )

}

function Menu({ styleTop, styleLeft }) {
    return (
        <>
            <div className="menu" style={{top: styleTop + "px", left: styleLeft + "px"}}>    
                <button>Waldo</button>
                <button>NPC1</button>
                <button>NPC2</button>
            </div>
        </>
    )
}
