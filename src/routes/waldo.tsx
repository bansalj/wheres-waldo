import React, { useState, useEffect } from "react";
import Marker from "../components/marker";
import Option from "../components/option";
import Character from "../types/character";
import Player from "../types/player";
import CharacterData from "../types/characterData";
import { useOutletContext } from "react-router-dom";
import Modal from "../components/modal";

export default function Waldo() {

    const [styleTop, setStyleTop] = useState<number>(0);
    const [styleLeft, setStyleLeft] = useState<number>(0);
    const [seconds, setSeconds] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [visibility, setVisibility] = useState("hidden");
    const [loading, setLoading] = useState<boolean>(false);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [characterData, setCharacterData] = useState<CharacterData | null>(null);
    const [selectedName, setSelectedName] = useState<string | null>(null);
    const [sendRequest, setSendRequest] = useState(0);

    const context: any = useOutletContext();

    useEffect(() => {
        fetch("https://localhost:7057/api/character", {
            method:"GET",
            headers: {'Content-type': 'application/json; charset=UTF-8'}
        })
        .then((Response) => Response.json())
        .then((character: any) => {
            setCharacterData(character);
            setSendRequest(1);
            setLoading(true);
            if (characterData != null) {
                gameover();    
            }
            
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
            case (characterData[0].name):
                console.log(`You found ${characterData[0].name}!`);
                setVisibility("hidden");
                updateCharacter(characterData[0]);
                break;
            case (characterData[1].name):
                console.log(`You found ${characterData[1].name}!`);
                setVisibility("hidden");
                updateCharacter(characterData[1]);
                break;
            case (characterData[2].name):
                console.log(`You found ${characterData[2].name}!`);
                setVisibility("hidden");
                updateCharacter(characterData[2]);
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
        let i: number;
        if (characterData[0]?.found && characterData[1]?.found && characterData[2]?.found == true) {
            for (i = 0; i < characterData.length; i++) {
                    reset(characterData[i]);
                }
            setGameOver(true);
            setSeconds(context.seconds);
            setMinutes(context.minutes);
        }
    }
    
    const reset = async(character: Character) => {
        setGameOver(false);
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
                    {gameOver ? (
                        <Modal minutes={minutes} seconds={seconds} />
                    ) : (
                        <>
                        </>
                    )}
                        <div className="image-container">
                            <img src="925902.jpg" useMap="#areamap" onClick={pointerDown} alt={null}/> 
                            {characterData.map((character: Character, index: number) => 
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
                            {characterData.map((character: Character, index: number) => 
                                <area key={index} coords={String(character.coord)} 
                                alt={`${character.name}`} 
                                href="null" 
                                />
                            )}
                    </map>              
                    <div className={visibility}>
                        <div className="menu" style={{top: styleTop + "px", left: styleLeft + "px"}}>
                            {characterData.map((character: Character, index: number) => 
                                <Option 
                                key={index}
                                alt={null}
                                onClick={check}
                                name={character.name}
                                isFound={character.found}/>
                            )}
                        </div>
                    </div>
                    </div>  
                </div>
            </>
        )
    }
}


