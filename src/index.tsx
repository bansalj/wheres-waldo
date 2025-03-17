import React, { useState, useEffect, AreaHTMLAttributes } from "react";

export default function Index() {

    const [visibility, setVisibility] = useState("hidden");
    const [styleTop, setStyleTop] = useState(0);
    const [styleLeft, setStyleLeft] = useState(0);
    const [clicked, setClicked] = useState(false);
    const [character1, setCharater1] = useState<any[]>([]);
    const [character2, setCharater2] = useState<any[]>([]);
    const [character3, setCharater3] = useState<any[]>([]);
 
    function pointerDown(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        setClicked(true);
        if (clicked) {
            menuPosition(event);
            if(event.target.coords) {
                check(event.target.coords);
            }
            
            setClicked(false);
        } else {
            setVisibility("hidden");
        }       
    }

    function menuPosition(event: React.MouseEvent<HTMLElement>) {
        console.log(`X: ${event.pageX}, Y: ${event.pageY}`)
        setVisibility("visible");
        setStyleTop(event.clientY - 20);
        setStyleLeft(event.clientX + 10);
    }

    useEffect(() => {
        fetch("https://localhost:7057/api/character", {
            method:"GET",
            headers: {'Content-type': 'application/json; charset=UTF-8'}
        })
        .then((Response) => Response.json())
        .then((character:any) => {
            setCharater1(character[0]);
            setCharater2(character[1]);
            setCharater3(character[2]); 
        })
        .catch(error => console.error("Nerwork Error", error));
    },[setCharater1, setCharater2, setCharater3])


    function check(event:any) {
        switch(event) {
            case `${character1.coord}`:
                console.log(`You found ${character1.name}!`);
                break;
            case `${character2.coord}`:
                console.log(`You found ${character2.name}!`);
                break;
            case `${character3.coord}`:
                console.log(`You found ${character3.name}!`);
                break;
        }
    }

    const validate = async(event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
    }

    return (
        <>
            <div className="content">
                <div className="container">
                    <img src="925902.jpg" useMap="#areamap" onClick={pointerDown}/>   
                <map name="areamap">
                    <area coords={String(character1.coord)} alt="Waldo" href="null" onClick={pointerDown}/>
                    <area coords={String(character2.coord)} alt="map2" href="null" onClick={pointerDown}/>
                    <area coords={String(character3.coord)} alt="map3" href="null" onClick={pointerDown}/>
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
