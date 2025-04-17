import { useState, useEffect } from "react";
import { Link, Outlet, useOutletContext, useLocation } from "react-router-dom";
import Timer from "../components/timer";

export default function Root() {

    const [seconds, setSeconds] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [timer, setTimer] = useState<number>(0);
    const [stopTimer, setStopTimer] = useState(timer);
    const { pathname } = useLocation();
    // const [characterData, setCharacterData] = useState<CharacterData | null>(null);
    const [sendRequest, setSendRequest] = useState(0);
    const [loading, setLoading] = useState(false);
    

    // useEffect(() => {
    //         fetch("https://localhost:7057/api/character", {
    //             method:"GET",
    //             headers: {'Content-type': 'application/json; charset=UTF-8'}
    //         })
    //         .then((Response) => Response.json())
    //         .then((character: any) => {
    //             setCharacterData(character);
    //             setSendRequest(1);
    //             setLoading(true);
    //             // if (characterData != null) {
    //             //     gameover();    
    //             // }
                
    //         })
    //         .catch(error => console.error("Nerwork Error", error));
    //     },[sendRequest])

    useEffect(() => {

        const startTime: number = Date.now();

            const interval = setInterval(() => {
                const elapsedTime = Date.now() - startTime
                const time = (Math.floor(elapsedTime / 1000));
                setSeconds(time);
                if (time == 60) {
                    setSeconds(0);
                    setMinutes(minutes => minutes + 1);
                }
            }, 1000);
    
            return () => {clearInterval(interval)};

    },[pathname, minutes])


    return (
        <>
            <header className="header">
                    <nav className="main-text" style={{textDecoration:'none', fontSize:'30px'}} ><Link to={'/'} style={{textDecoration:'none', color:'white'}}>WHERES WALDO</Link>
                    </nav>
                    {pathname !== '/' ? (
                        <Timer minutes={minutes} seconds={seconds}/>
                    ) : (
                        <>
                        </>
                    )}
            </header>
            <main> 
                <Outlet context={{loading, sendRequest, setSendRequest, seconds, minutes}}/>
            </main>
            <footer>
            </footer>
        </>
    )
}


