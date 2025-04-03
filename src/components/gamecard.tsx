import { Link } from "react-router-dom";

export default function Gamecard({ img, title, onClick, link }) {
    return (
        <>
            <div className="game-card">
                <img className="game-card-image" src={img} alt={title} />
                <h1 className="game-card-title">{title}</h1>
                <Link to={link} className="game-card-button" onClick={onClick}>Start Game</Link>
            </div>
        </>
    )
}