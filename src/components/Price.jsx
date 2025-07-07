export default function Price({originalPrice, finalPrice}) {
    return (
        <>
            ${(finalPrice / 100).toFixed(2)}
            {finalPrice !== originalPrice ? (
                <span className="text-strikethroug">${(originalPrice / 100).toFixed(2)}</span>
            ) : null}
        </>
    );
}
