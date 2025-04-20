import React, { useState } from "react";
import Gamecard from "../components/gamecard";
import Leaderboard from "../components/leaderboard";

export default function Index() {

    const [gameStart, setGameStart] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);

    return (
        <>
            <div className="index-container">
                <Gamecard img={"925902.jpg"} title={"Wheres Waldo"} link={'/waldo'} onClick={() => setGameStart(true)}/>
                <button onClick={() => setShow(true)} style={{color: "white"}}>Leaderboard</button>
                {!setShow ? (
                        <div>
                            <Leaderboard />
                        </div>
                        ) : (
                            <>
                            </>
                        )}
                
            </div>
            
        </>
    )
}

