import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Player from "../types/player";

export default function Modal({ minutes, seconds }) {

    const [username, setUsername] = useState<string>();

    const navigate: any = useNavigate();

    const submitUsername = async(event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        const date = new Date();
        const response =  await fetch(`https://localhost:7057/api/Player`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                // id: player.id,
                name: username,
                time: `${minutes}:${seconds}`,
                date: date
              })
        }).then(navigate('/'));  
    }

    return (
        <>
            <div className="modal">
                <div className="modal-content">
                    <h1 className="modal-time">You finished in {minutes}:{seconds}s!</h1>
                    <h3>Submit your score to the leaderboard</h3>
                    <form onSubmit={submitUsername}>
                        <label htmlFor="username">Username:</label>
                        <input type="text" placeholder="Enter a Username" name="username" onChange={(e) => setUsername(e.target.value)}  maxLength={15}/>
                        <button className="modal-button">Submit</button>
                        {/* <Link to={link} className="game-card-button" onClick={onClick}>Submit</Link> */}
                    </form>
                </div>
            </div>  
        </>
    )
}