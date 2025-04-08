import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Timer from "../components/timer";
import Modal from "../components/modal";

export default function Root() {

    const [seconds, setSeconds] = useState<any>();
    const [timer, setTimer] = useState<any>();
    const [stopTimer, setStopTimer] = useState(timer);
    const { pathname } = useLocation();

    useEffect(() => {

        const startTime: number = Date.now();

            const interval = setInterval(() => {
                const elapsedTime = Date.now() - startTime
                const time = (elapsedTime / 1000).toFixed(1);
                setTimer(time);
                // if (timer > 59) {
                //     setSeconds
                // }
            }, 100);
    
            return () => {clearInterval(interval)};

    },[pathname, stopTimer])
    

    function submit() {
        setStopTimer(timer);
        console.log(stopTimer)
    }

    const submitUsername = async(e) => {
        const response =  await fetch(`https://localhost:7057/api/player`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                name: e.username
                
              })
        })
    }

    return (
        <>
            <header className="header">
                    <nav className="main-text" style={{textDecoration:'none', fontSize:'30px'}} ><Link to={'/'} style={{textDecoration:'none', color:'white'}}>WHERES WALDO</Link>
                    </nav>
                    {pathname !== '/' ? (
                        <Timer timer={timer}/>
                    ) : (
                        <>
                        </>
                    )}
            </header>
            <main> 
                <Modal time={stopTimer} link={'/'} onClick={submit} onSubmit={submitUsername}/>
                <Outlet/>
            </main>
            <footer>
            </footer>
        </>
    )
}


