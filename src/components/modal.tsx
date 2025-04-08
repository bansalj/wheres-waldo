import { Link } from "react-router-dom"

export default function Modal({ time, link, onClick, onSubmit }) {
    return (
        <>
            <div className="modal">
                <div className="modal-content">
                    <h1 className="modal-time">You finished in {time}s!</h1>
                    <h3>Submit your score to the leaderboard</h3>
                    <form onSubmit={onSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input type="text" placeholder="Enter a Username" name="username" required maxLength={15}/>
                        <button className="modal-button" onClick={onClick}>Submit</button>
                        {/* <Link to={link} className="game-card-button" onClick={onClick}>Submit</Link> */}
                    </form>
                </div>
            </div>
        </>
    )
}