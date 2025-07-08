import { useId, useContext } from "react";
import { Link } from "react-router";
import { CartContext } from "../context/CartContext.jsx";
import QuantitySelector from "../components/QuantitySelector.jsx";
import "../styles/CartPage.css"; // nuevo archivo para estilos

export default function Cart({ user }) {
    const emailId = useId();
    const { cart, cartSum } = useContext(CartContext);

    if (cart.length === 0) {
        return (
            <div className="cart-wrapper">
                <h1>Your cart</h1>
                <title>Cart | SuperM</title>
                <p>
                    Your cart is empty. Add a product from the{" "}
                    <Link to="/products">products</Link> page.
                </p>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <div className="cart-left">
                <h2 className="section-title">Shopping Card</h2>

                {cart.map((product) => (
                    <div key={product.id} className="cart-item">
                        <img
                            src={product.thumbnail}
                            alt={product.name}
                            className="cart-product-img"
                        />

                        <div className="cart-product-info">
                            <p className="product-name">{product.name}</p>
                            <p className="unit-price">Unit price: ${(product.final_price / 100).toFixed(2)}</p>
                        </div>

                        <QuantitySelector product={product} />

                        <div className="product-subtotal">
                            <p>${((product.final_price * product.quantity) / 100).toFixed(2)}</p>
                        </div>
                    </div>
                ))}

                <div className="subtotal">
                    <span>Subtotal:</span>
                    <span>${(cartSum / 100).toFixed(2)}</span>
                </div>
            </div>

            <div className="cart-right">
                <div className="card-preview">
                    <p className="card-title">Lorem Ipsum</p>
                    <p>**** **** **** 1234</p>
                    <p>12/30</p>
                    <p className="card-holder">Diana Smith</p>
                    <p className="card-brand">VISA</p>
                </div>

                <form className="payment-form" onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor={emailId}>Email:</label>
                    <input
                        id={emailId}
                        type="email"
                        className="input"
                        placeholder="Enter your email"
                        defaultValue={user ? user.email : ""}
                    />

                    <label>Card Number:</label>
                    <input type="text" value="**** **** **** 5432" readOnly />

                    <label>Expiration Date:</label>
                    <div className="expiry">
                        <input type="text" placeholder="MM" />
                        <input type="text" placeholder="YYYY" />
                    </div>

                    <label>CVV:</label>
                    <input type="text" placeholder="***" />

                    <button type="submit" className="checkout-btn">Check Out</button>
                </form>
            </div>
        </div>
    );
}
