export default function CartTotals({ subtotal, discount, shippingCost, total }) {
    return (
        <div className="cart-totals">
            <div className="cart-totals-line">
                <span>Subtotal:</span>
                <span>${(subtotal / 100).toFixed(2)}</span>
            </div>
            <div className="cart-totals-line">
                <span>Saved:</span>
                <span>-${(discount / 100).toFixed(2)}</span>
            </div>
            <div className="cart-totals-line">
                <span>Shipping:</span>
                <span>${(shippingCost / 100).toFixed(2)}</span>
            </div>
            <div className="cart-totals-total">
                <strong>Total:</strong>
                <strong>${(total / 100).toFixed(2)}</strong>
            </div>
            <button className="btn btn--level1 ">Pay</button>
        </div>
    );
}
