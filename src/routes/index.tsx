import React, { useState } from "react";
import Gamecard from "../components/gamecard";
import Leaderboard from "../components/leaderboard";

export default function Index() {

    const [gameStart, setGameStart] = useState<boolean>(false);
    const [hide, setHide] = useState<boolean>(false);

    const show = () => {
        setHide(!hide);
    }

    return (
        <>
            <div className="index-container">
                <Gamecard img={"925902.jpg"} title={"Wheres Waldo"} link={'/waldo'} onClick={() => setGameStart(true)}/>
                <button onClick={show} style={{color: "white"}}>Leaderboard</button>
                {hide ? (
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

