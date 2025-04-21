export default function Timer({ seconds, minutes }) {
    return (
        <>
            <h2 className="timer" style={{overflow:"auto"}}>
                Time: {minutes}:{seconds}s
            </h2>
        </>
    )
}