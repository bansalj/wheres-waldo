import React, { useState, useEffect } from "react";

export default function Waldo() {

    type Character = {
        id: number,
        name: string,
        coord: number[],
        found: boolean
    }

    type CharacterData = {
        characters?: Array<Character>
    }

    const [styleTop, setStyleTop] = useState(0);
    const [styleLeft, setStyleLeft] = useState(0);
    const [visibility, setVisibility] = useState("hidden");
    const [loading, setLoading] = useState(false);
    const [character1, setCharacter1] = useState<Character | null>(null);
    const [character2, setCharacter2] = useState<Character | null>(null);
    const [character3, setCharacter3] = useState<Character | null>(null);
    const [characterData, setCharacterData] = useState<CharacterData | null>(null);
    const [selectedName, setSelectedName] = useState<string | null>(null);
    const [sendRequest, setSendRequest] = useState(0);

    useEffect(() => {
        fetch("https://localhost:7057/api/character", {
            method:"GET",
            headers: {'Content-type': 'application/json; charset=UTF-8'}
        })
        .then((Response) => Response.json())
        .then((character: any) => {
            setCharacterData(character);
            setCharacter1(character[0]);
            setCharacter2(character[1]);
            setCharacter3(character[2]);
            setSendRequest(1);
            setLoading(true);
            gameover();
        })
        .catch(error => console.error("Nerwork Error", error));
        // if (characterData) {
        //     console.log(characterData[0])
        // }
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
            case (character1?.name):
                console.log(`You found ${character1?.name}!`);
                updateCharacter(character1);
                setVisibility("hidden");
                break;
            case (character2?.name):
                console.log(`You found ${character2?.name}!`);
                updateCharacter(character2);
                setVisibility("hidden");
                break;
            case (character3?.name):
                console.log(`You found ${character3?.name}!`);
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

    const updateCharacter = async(character: Character) => {
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
        .then(() => {setSendRequest(sendRequest => sendRequest + 1)})
    }

    function gameover() {
        if(character1?.found && character2?.found && character3?.found == true) {
            alert("game over!");
            reset(character1);
            reset(character2);
            reset(character3);
        }
    }

    const reset = async(character: Character) => {
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

    if (loading == true) {
        return (
            <>
                <div className="content">
                    <div className="container">
                        <div className="image-container">
                            <img src="925902.jpg" useMap="#areamap" onClick={pointerDown} alt={character1?.name}/> 
                            {characterData.map((character, index) => 
                                <Marker
                                key={index}
                                className={"marker"}
                                name={character.name}
                                isFound={character.found}
                                img={"marker.png"}
                                style={{width:"30px", height:"30px", position:"absolute", 
                                    top: character.coord[1], left: character.coord[0] 
                                    }}
                                />
                            )}
                        </div>
                    <map name="areamap" onClick={pointerDown}>
                        <area coords={String(character1?.coord)} alt={`${character1?.name}`} href="null" />
                        <area coords={String(character2?.coord)} alt={`${character2?.name}`} href="null" />
                        <area coords={String(character3?.coord)} alt={`${character3?.name}`} href="null" />
                    </map>              
                    <div className={visibility} key={"menu"}>
                        <div className="menu" style={{top: styleTop + "px", left: styleLeft + "px"}}>
                            <Option
                            onClick={check}
                            name={character1?.name}
                            isFound={character1?.found}
                            />
                            <Option
                            onClick={check}
                            name={character2?.name}
                            isFound={character2?.found}
                            />
                            <Option
                            onClick={check}
                            name={character3?.name}
                            isFound={character3?.found}
                            />
                        </div>
                    </div>
                    </div>  
                </div>
            </>
        )
    }
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

function Marker({ className, name, isFound, img, style }) {
    return (
        <>
            {isFound ? (
                <img src={img} alt={name} style={style} className={className} />
            ) : (
                <>
                </>
            )}
        </>
    )
}