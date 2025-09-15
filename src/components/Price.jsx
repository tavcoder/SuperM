// Component for displaying product prices with discount formatting
import { memo } from 'react';

function Price({originalPrice, finalPrice}) {
    return (
        <>
            ${(finalPrice / 100).toFixed(2)}
            {finalPrice !== originalPrice ? (
                <span className="text-strikethroug">${(originalPrice / 100).toFixed(2)}</span>
            ) : null}
        </>
    );
}

export default memo(Price);
