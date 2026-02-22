/**
 * Displays a product price, with the original price struck through if a discount applies.
 * Prices are received in cents and converted to dollars for display.
 * @param {number} finalPrice - Discounted price in cents
 * @param {number} originalPrice - Original price in cents
 */

import { memo } from 'react';
import { formatPrice } from "../utils/currency.js";

function Price({ originalPrice, finalPrice }) {
    return (
        <>
            ${formatPrice(finalPrice)}
            {finalPrice !== originalPrice ? (
                <span className="u-text-strikethrough"> 
                    ${formatPrice(originalPrice)}
                </span>
            ) : null}
        </>
    );
}

export default memo(Price);
