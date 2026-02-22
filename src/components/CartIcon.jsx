/**
 * Displays a shopping cart icon with item count badge and total price.
 * Reads cartCount, cartSum from ProductsContext — no props required.
 * Displays in navbar, updates when cart changes.
 */
import { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { formatPrice } from "../utils/currency.js";
import { CartContext } from "../context/CartContext.jsx";

export default function CartIcon() {
    const { cartCount, cartSum } = useContext(CartContext);

    return (
        <div className="navbar__cart">
            {cartCount > 0 && (
                <span className="navbar__cart-badge" aria-label={`${cartCount} items in cart`}>
                    {cartCount}
                </span>
            )}

            {cartCount > 0 && (
                <span className="navbar__cart-total">
                    ${formatPrice(cartSum)}
                </span>
            )}

            <FaShoppingCart aria-label="Shopping cart" />
        </div>
    );
}