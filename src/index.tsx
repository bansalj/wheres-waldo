import React, { useState, useEffect } from "react";

export default function Index() {

    const [styleTop, setStyleTop] = useState(0);
    const [styleLeft, setStyleLeft] = useState(0);
    const [visibility, setVisibility] = useState("hidden");
    const [isFound1, setIsFound1] = useState(false);
    const [isFound2, setIsFound2] = useState(false);
    const [isFound3, setIsFound3] = useState(false);
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
        menuPosition(event);
    }

    function menuPosition(event: React.MouseEvent<HTMLElement>) {
        if (visibility == "hidden") {
            setVisibility("visible");
            setStyleTop(event.clientY - 20);
            setStyleLeft(event.clientX + 10);
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
                updateCharacter(character1);
                setIsFound1(true);
                setVisibility("hidden");
                break;
            case (character2.name):
                console.log(`You found ${character2.name}!`);
                updateCharacter(character2);
                setIsFound2(true);
                setVisibility("hidden");
                break;
            case (character3.name):
                console.log(`You found ${character3.name}!`);
                updateCharacter(character3);
                setIsFound3(true);
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

    const updateCharacter = async(character) => {
        console.log(character);
        const response = await fetch(`https://localhost:7057/api/character/${character.id}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                id: character.id,
                name: character.name,
                coord: character.coord,
                found: true,
              })
        })
    }

    const reset = async(character) => {

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
                    <div className="menu" style={{top: styleTop + "px", left: styleLeft + "px"}}>
                        <Option
                        onClick={check}
                        name={character1.name}
                        isFound={isFound1}
                        />
                        <Option
                        onClick={check}
                        name={character2.name}
                        isFound={isFound2}
                        />
                        <Option
                        onClick={check}
                        name={character3.name}
                        isFound={isFound3}
                        />
                    </div>
                </div>
                </div>  
            </div>
        </>
    )

}

function Option({ name, onClick, isFound }) {
    return (
        <>
            {!isFound ? (
                <button onClick={onClick}>{name}</button>
            ) : (
                <>
                </>
            )}
            
        </>
    )
}
