
/**
 * Displays cart items with quantity controls, unit price, total, and remove option.
 * Reads cart state directly from CartContext — no props required.
 * Displays in CheckoutPage.
 * Shows an empty state with a link to products when the cart has no items.
 */
import { useContext } from "react";
import { Link } from "react-router";
import { FaTimes } from "react-icons/fa";
import Price from "./Price.jsx";
import { calculateTotal } from "../utils/currency.js";
import QuantitySelector from "./QuantitySelector";
import { CartContext } from "../context/CartContext";
import "../styles/CheckoutPage.css";

export default function CartSummary() {
    const { cart, removeFromCart } = useContext(CartContext);

    if (cart.length === 0) {
        return (
            <div className="cart-summary cart-summary--empty">
                <h2>Your cart</h2>
                <p>
                    Your cart is empty. Add a product from the{" "}
                    <Link to="/products" className="u-link">products page</Link>.
                </p>
            </div>
        );
    }

    return (
        <div className="cart-summary">
            <h2>Shopping Cart</h2>
            <ul className="cart-summary__list">
                {cart.map((product) => (
                    <li key={product.id} className="cart-summary__item">
                        <img
                            className="cart-summary__item-img"
                            src={product.thumbnail}
                            alt={`${product.name} product image`}
                            width="120"
                            height="120"
                            loading="lazy"
                        />
                        <div className="cart-summary__item-details">
                            <h3 className="cart-summary__item-name">{product.name}</h3>
                            <p className="cart-summary__item-price">
                                Unit price:{" "}
                                <Price
                                    finalPrice={product.final_price}
                                    originalPrice={product.original_price}
                                />
                            </p>
                            <div className="cart-summary__item-footer"> {/* ✅ */}
                                <p className="cart-summary__item-total">
                                    Total: ${calculateTotal(product.final_price, product.quantity)}
                                </p>
                                <QuantitySelector product={product} />
                            </div>
                        </div>
                        <button
                            className="cart-summary__item-remove u-icon"
                            onClick={() => removeFromCart(product)}
                            aria-label={`Remove ${product.name} from cart`}
                        >
                            <FaTimes aria-hidden="true" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}