export default function Option({ name, onClick, isFound, alt }) {
    return (
        <>
            {isFound ? (
                 <>
                </>
            ) : (
                <button onClick={onClick} alt={alt}>{name}</button>
            )}
        </>
    )
}
