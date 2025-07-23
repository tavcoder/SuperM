import { useContext } from "react";
import { Link } from "react-router";
import Price from "./Price.jsx";
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
                <p>
                    Your cart is empty. Add a product from the{" "}
                    <Link to="/products" className="link">products page</Link>.
                </p>
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
                        <p> Unit price:
                            <Price
                                finalPrice={product.final_price}
                                originalPrice={product.original_price}
                            />
                        </p>
                        <div className="cart-item-quantity">
                            <p>
                                Total price: ${((product.final_price * product.quantity) / 100).toFixed(2)}
                            </p>
                            <QuantitySelector product={product} />
                        </div>
                    </div>

                    <button
                        className="cart-item-remove icon"
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
