import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import QuantitySelector from "./QuantitySelector";
import "../styles/CheckoutPage.css";
import { FaTimes } from "react-icons/fa"; // Icono ❌

export default function CartSummary() {
    const { cart, cartSum, removeFromCart } = useContext(CartContext);

    if (cart.length === 0) {
        return (
            <div className="cart-wrapper">
                <h1>Your cart</h1>
                <p>Your cart is empty. Add a product from the products page.</p>
            </div>
        );
    }

    return (
        <div className="cart-summary">
            <h2>Shopping Cart</h2>
            {cart.map((product) => (
                <div key={product.id} className="cart-item">
                    <img className="cart-product-img" src={product.thumbnail} alt={product.name} />
                    <div>
                        <p>{product.name}</p>
                        <p>Unit price: ${(product.final_price / 100).toFixed(2)}</p>
                    </div>
                    <QuantitySelector product={product} />
                    <p>${((product.final_price * product.quantity) / 100).toFixed(2)}</p>
                    <button
                        className="btn"
                        onClick={() => removeFromCart(product.id)}
                        aria-label={`Remove ${product.name}`}
                    >
                        <FaTimes />
                    </button>

                </div>
            ))}
            <div className="subtotal">
                <span>Subtotal:</span>
                <span>${(cartSum / 100).toFixed(2)}</span>
            </div>
        </div>
    );
}
