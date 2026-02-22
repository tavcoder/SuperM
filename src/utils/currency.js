/**
 * Format price from cents to dollars
 * @param {number} cents - Price in cents
 * @returns {string} Formatted price (e.g., "15.99")
 */
export function formatPrice(cents) {
    return (cents / 100).toFixed(2);
}

/**
 * Calculate total price for cart item
 * @param {number} price - Unit price in cents
 * @param {number} quantity - Item quantity
 * @returns {string} Total formatted (e.g., "47.97")
 */
export function calculateTotal(price, quantity) {
    return formatPrice(price * quantity);
}