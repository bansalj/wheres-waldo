export default function Timer({ seconds, minutes }) {
    return (
        <>
            <h1 className="timer">
                Time: {minutes}:{seconds}s
            </h1>
        </>
    )
}