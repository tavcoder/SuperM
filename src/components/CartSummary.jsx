import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import QuantitySelector from "./QuantitySelector";
import "../styles/CheckoutPage.css";
import { FaTimes } from "react-icons/fa";

export default function CartSummary() {
    const { cart, cartSum, shippingCost = 0, removeFromCart } = useContext(CartContext);

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
                    <div>
                        <img className="cart-item-img" src={product.thumbnail} alt={product.name} />
                    </div>
                    <div className="cart-item-details">
                        <h3>{product.name}</h3>
                        <p>
                            Unit price: ${(product.final_price / 100).toFixed(2)}
                            <span className="text-strikethrough">
                                ${(product.original_price / 100).toFixed(2)}
                            </span>
                        </p>
                        <div className="cart-item-quantity">
                            <p>
                                Total price: ${((product.final_price * product.quantity) / 100).toFixed(2)}
                            </p>
                            <QuantitySelector product={product} />
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

        </div>
    );
}
