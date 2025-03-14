import React, { useState, useEffect } from "react";

export default function Index() {

    const [visibility, setVisibility] = useState("hidden");
    const [styleTop, setStyleTop] = useState(0);
    const [styleLeft, setStyleLeft] = useState(0);
    const [clicked, setClicked] = useState(false);
    const [character1, setCharater1] = useState([]);
    const [character2, setCharater2] = useState([]);
    const [character3, setCharater3] = useState([]);
 
    function pointerDown(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
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

    useEffect(() => {
        fetch("https://localhost:7057/api/character", {
            method:"GET",
            headers: {'Content-type': 'application/json; charset=UTF-8'}
        })
        .then((Response) => Response.json())
        .then((character:any) => {
            console.log(character) 
            console.log(character[0].name)
            setCharater1(character[0]);
            setCharater2(character[1]);
            setCharater3(character[2]); 
        })
        .catch(error => console.error("Nerwork Error", error));
    },[setCharater1, setCharater2, setCharater3])

    // function waldo(event: React.MouseEvent<HTMLElement>) {
    //     event.preventDefault();
    //     console.log("You found Waldo!")      
    // }

    return (
        <>
            <div className="content">
                <div className="container">
                    <img src="925902.jpg" useMap="#areamap" onClick={pointerDown}/>   
                <map name="areamap">
                    <area coords="1657,945,1618,865" alt="map" href="null" onClick={pointerDown}/>
                </map>
                <div className={visibility}>
                    <Menu
                    styleLeft={styleLeft}
                    styleTop={styleTop}
                    name1={character1.name}
                    name2={character2.name}
                    name3={character3.name}/>
                </div>
                </div>  
            </div>
        </>
    )

}

function Menu({ styleTop, styleLeft, name1, name2, name3 }) {
    return (
        <>
            <div className="menu" style={{top: styleTop + "px", left: styleLeft + "px"}}>    
                <button>{name1}</button>
                <button>{name2}</button>
                <button>{name3}</button>
            </div>
        </>
    )
}
