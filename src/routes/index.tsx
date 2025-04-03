import React, { useState } from "react";
import Gamecard from "../components/gamecard";

export default function Index() {

    const [gameStart, setGameStart] = useState(false);

    return (
        <>
            <div className="index-container">
                <Gamecard img={"925902.jpg"} title={"Wheres Waldo"} link={'/waldo'} onClick={() => setGameStart(true)}/>
            </div>
        </>
    )
}

