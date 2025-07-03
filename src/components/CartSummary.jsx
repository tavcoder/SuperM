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

                    <img className="cart-item-img" src={product.thumbnail} alt={product.name} />
                    <div className="cart-item-details">
                        <h3>{product.name}</h3>
                        <p>Unit price: ${(product.final_price / 100).toFixed(2)}</p>
                        <div className="cart-item-quantity">
                            <QuantitySelector product={product} />
                            <p>Price: ${((product.final_price * product.quantity) / 100).toFixed(2)}</p>
                        </div>
                    </div>


                    <button
                        className="icon"
                        onClick={() => removeFromCart(product)}
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
