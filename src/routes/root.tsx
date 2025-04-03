import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Timer from "../components/timer";

export default function Root() {

    const [seconds, setSeconds] = useState<any>();
    const [timer, setTimer] = useState<any>();

    useEffect(() => {

        const startTime: number = Date.now();

        const interval = setInterval(() => {
            const elapsedTime = Date.now() - startTime
            const time = (elapsedTime / 1000).toFixed(1);
            setTimer(time);
            if (timer > 59) {
                setSeconds
            }
        }, 100);

        return () => {clearInterval(interval)};
    
    },[])

    const { pathname } = useLocation();

    return (
        <>
            <header className="header">
                    <nav className="main-text" style={{textDecoration:'none', fontSize:'30px'}} ><Link to={'/'} style={{textDecoration:'none'}}>WHERES WALDO</Link>
                    </nav>
                    {pathname !== '/' ? (
                        <Timer timer={timer}/>
                    ) : (
                        <>
                        </>
                    )}
            </header>
            <main> 
                <Outlet/>
            </main>
            <footer>
            </footer>
        </>
    )
}


