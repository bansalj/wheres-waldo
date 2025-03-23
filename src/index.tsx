import React, { useState, useEffect } from "react";

export default function Index() {

    const [styleTop, setStyleTop] = useState(0);
    const [styleLeft, setStyleLeft] = useState(0);
    const [visibility, setVisibility] = useState("hidden");
    const [character1, setCharacter1] = useState<any[]>([]);
    const [character2, setCharacter2] = useState<any[]>([]);
    const [character3, setCharacter3] = useState<any[]>([]);
    const [selectedName, setSelectedName] = useState<string>();
    const [sendRequest, SetSendRequest] = useState(0);

    useEffect(() => {
        fetch("https://localhost:7057/api/character", {
            method:"GET",
            headers: {'Content-type': 'application/json; charset=UTF-8'}
        })
        .then((Response) => Response.json())
        .then((character:any) => {
            setCharacter1(character[0]);
            setCharacter2(character[1]);
            setCharacter3(character[2]);
        })
        .catch(error => console.error("Nerwork Error", error));
    },[sendRequest])
 
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
                setVisibility("hidden");
                break;
            case (character2.name):
                console.log(`You found ${character2.name}!`);
                updateCharacter(character2);
                setVisibility("hidden");
                break;
            case (character3.name):
                console.log(`You found ${character3.name}!`);
                updateCharacter(character3);
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
        .then(() => {SetSendRequest(sendRequest => sendRequest + 1)})
    }

    const reset = async(character) => {
        const response1 =  await fetch(`https://localhost:7057/api/character/${character.id}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                id: character.id,
                name: character.name,
                coord: character.coord,
                found: false,
              })
        })
    }

    return (
        <>
            <div className="content">
                <div className="container">
                    <img src="925902.jpg" useMap="#areamap" onClick={pointerDown}/>   
                <map name="areamap" onClick={pointerDown}>
                    <area className="area1" coords={String(character1.coord)} alt={`${character1.name}`} href="null" />
                    <area className="area2" coords={String(character2.coord)} alt={`${character2.name}`} href="null" />
                    <area className="area3" coords={String(character3.coord)} alt={`${character3.name}`} href="null" />
                </map>
                <div className={visibility}>
                    <div className="menu" style={{top: styleTop + "px", left: styleLeft + "px"}}>
                        <Option
                        onClick={check}
                        name={character1.name}
                        isFound={character1.found}
                        />
                        <Option
                        onClick={check}
                        name={character2.name}
                        isFound={character2.found}
                        />
                        <Option
                        onClick={check}
                        name={character3.name}
                        isFound={character3.found}
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
