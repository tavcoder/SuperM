import { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../context/CartContext.jsx";

export default function CartIcon() {
    const { cartCount, cartSum } = useContext(CartContext);

    return (<div className="nav-cart">

        {cartCount > 0 && (
            <span className="cart-count-badge">{cartCount}</span>
        )}

        {cartCount > 0 && (
            <span className="cart-count-total">${(cartSum / 100).toFixed(2)}</span>
        )}
        <span role="img" aria-label="cart"><FaShoppingCart /></span>
    </div>
    );
};


