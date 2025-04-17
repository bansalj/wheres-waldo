export default function Marker({ className, name, isFound, img, style }) {
    return (
        <>
            {isFound ? (
                <img src={img} alt={name} style={style} className={className} />
            ) : (
                <>
                </>
            )}
        </>
    )
}