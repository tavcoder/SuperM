import { useContext } from "react";
import { CartContext } from "../context/CartContext.jsx";

export default function CartIcon() {
    const { cartCount, cartSum } = useContext(CartContext);

    return (<div className="nav-cart">
        <div className="cart-icon-wrapper">
            <span role="img" aria-label="cart" className="cart-icon">🛒</span>
            {cartCount > 0 && (
                <span className="cart-count-badge">{cartCount}</span>
            )}
        </div>
        {cartCount > 0 && (
            <span className="cart-total">${(cartSum / 100).toFixed(2)}</span>
        )}
    </div>
    );
};


