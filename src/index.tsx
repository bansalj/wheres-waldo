import React, { useState, useEffect } from "react";

export default function Index() {

    const [styleTop, setStyleTop] = useState(0);
    const [styleLeft, setStyleLeft] = useState(0);
    // const [clicked, setClicked] = useState(false);
    const [visibility, setVisibility] = useState("hidden");
    const [character1, setCharater1] = useState<any[]>([]);
    const [character2, setCharater2] = useState<any[]>([]);
    const [character3, setCharater3] = useState<any[]>([]);
    const [selectedName, setSelectedName] = useState<string>();

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
 
    function pointerDown(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        setSelectedName(event.target.alt);
        // setClicked(true);
        menuPosition(event);
    }

    function menuPosition(event: React.MouseEvent<HTMLElement>) {
        if (visibility == "hidden") {
            setVisibility("visible");
            setStyleTop(event.clientY - 20);
            setStyleLeft(event.clientX + 10);
            // setClicked(false);
        } else {
            setVisibility("hidden");
        }
    }

    function check(event: React.MouseEvent<HTMLElement>) {
       let name: string = event.target.innerText;
       if (name == selectedName) {
        switch(name) {
            case (character1.name):
                console.log(`You found ${character1.name}!`);
                setVisibility("hidden");
                break;
            case (character2.name):
                console.log(`You found ${character2.name}!`);
                setVisibility("hidden");
                break;
            case (character3.name):
                console.log(`You found ${character3.name}!`);
                setVisibility("hidden");
                break;
            default:
                console.log("Sorry, try again!");
        }
       } else {
        console.log("Sorry! Try again!");
        setVisibility("hidden");
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
                <map name="areamap" onClick={pointerDown}>
                    <area coords={String(character1.coord)} alt={`${character1.name}`} href="null" />
                    <area coords={String(character2.coord)} alt={`${character2.name}`} href="null" />
                    <area coords={String(character3.coord)} alt={`${character3.name}`} href="null" />
                </map>
                <div className={visibility}>
                    <Menu
                    styleLeft={styleLeft}
                    styleTop={styleTop}
                    name1={character1.name}
                    name2={character2.name}
                    name3={character3.name}
                    onClick={check}/>
                </div>
                </div>  
            </div>
        </>
    )

}

function Menu({ styleTop, styleLeft, name1, name2, name3, onClick }) {
    return (
        <>
            <div className="menu" style={{top: styleTop + "px", left: styleLeft + "px"}}>    
                <button onClick={onClick}>{name1}</button>
                <button onClick={onClick}>{name2}</button>
                <button onClick={onClick}>{name3}</button>
            </div>
        </>
    )
}
