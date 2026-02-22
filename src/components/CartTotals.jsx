/**
 * Displays cart totals including subtotal, discount, shipping, and total.
 * Renders a "Pay" button on step 1 to advance the checkout flow.
 * Memoized to prevent unnecessary re-renders when parent Checkout re-renders.
 * @param {number} subtotal - Sum of original prices in cents
 * @param {number} discount - Difference between subtotal and final price in cents
 * @param {number} shippingCost - Shipping cost in cents
 * @param {number} total - Final amount to pay in cents
 * @param {Function} onNextStep - Callback to advance to the next checkout step
 * @param {number} step - Current checkout step (1 = cart, 2 = shipping, 3 = payment)
 */
import { memo } from 'react';
import { formatPrice } from "../utils/currency.js";

function CartTotals({ subtotal, discount, shippingCost, total, onNextStep, step }) {
    return (
        <div className="cart-totals">
            <div className="cart-totals__line">
                <span>Subtotal:</span>
                <span>${formatPrice(subtotal)}</span>
            </div>
            <div className="cart-totals__line">
                <span>Saved:</span>
                <span className="cart-totals__line-value cart-totals__line-value--saved">
                    -${formatPrice(discount)}
                </span>
            </div>
            <div className="cart-totals__line">
                <span>Shipping:</span>
                <span>${formatPrice(shippingCost)}</span>
            </div>
            <div className="cart-totals__line cart-totals__line--total">
                <strong>Total:</strong>
                <strong>${formatPrice(total)}</strong>
            </div>
            {step === 1 && (
                <button className="u-btn u-btn--primary" onClick={onNextStep}>
                    Pay
                </button>
            )}
        </div>
    );
}

export default memo(CartTotals);