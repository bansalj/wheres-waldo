import { useState, useEffect } from "react"
import Player from "../types/player"

export default function Leaderboard() {

    const [playerData, setPlayerData] = useState<Player | null>(null);
        
      useEffect(() => {
            fetch("https://localhost:7057/api/player", {
                method:"GET",
                headers: {'Content-type': 'application/json; charset=UTF-8'}
            })
            .then((Response) => Response.json())
            .then((player: any) => {
                setPlayerData(player);  
            })
            .catch(error => console.error("Nerwork Error", error));
        },[])

    return (
        <>
            <table>
                <tbody>
                    <tr>
                        <th>Position</th>
                        <th>Username</th>
                        <th>Time</th>
                        <th>Date</th>
                    </tr>
                    {playerData !== null ? (
                        <>
                            {playerData.map((player: Player, index: number) =>
                                <tr key={index}>
                                    <td>{player.id}</td>
                                    <td>{player.name}</td>
                                    <td>{player.time}s</td>
                                    <td>{player.date.slice(0, 10)}</td>
                                </tr> 
                            )}
                        </>
                        ) : (
                            <>
                            </>
                        )}
                </tbody>
            </table>
        </>
    )
}


