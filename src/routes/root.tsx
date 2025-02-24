import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

export default function Root() {

    return (
        <>
            <div className="header" style={{marginBottom: '100px'}}>
                <div className="main-text" style={{textDecoration: 'none', fontSize: '30px'}} ><b>WHERES WALDO?</b>
                </div>
            </div>
            <main>
                <Outlet/>
            </main>
            <footer>
            </footer>
        </>
    )
}
