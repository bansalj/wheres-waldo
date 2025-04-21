export default function CharacterBanner({ isFound, image }) {
    return (
        <>
          {isFound ? (
                 <>
                </>
            ) : (
                <img src={image} alt={image}></img>
            )}
        </>
    )
}