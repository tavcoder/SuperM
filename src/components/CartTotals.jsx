// Component for displaying cart totals including subtotal, discount, shipping, and total
import { memo } from 'react';

function CartTotals({ subtotal, discount, shippingCost, total, onNextStep, step }) {
    return (
        <div className="cart-totals">
            <div className="cart-totals-line">
                <span>Subtotal:</span>
                <span>${(subtotal / 100).toFixed(2)}</span>
            </div>
            <div className="cart-totals-line">
                <span>Saved:</span>
                <span className="cart-totals-saved">-${(discount / 100).toFixed(2)}</span>
            </div>
            <div className="cart-totals-line">
                <span>Shipping:</span>
                <span>${(shippingCost / 100).toFixed(2)}</span>
            </div>
            <div className="cart-totals-total">
                <strong>Total:</strong>
                <strong>${(total / 100).toFixed(2)}</strong>
            </div>
            {step === 1 && (
                <button className="btn btn--level1" onClick={onNextStep}>
                    Pay
                </button>
            )}
        </div>
    );
}

export default memo(CartTotals);
