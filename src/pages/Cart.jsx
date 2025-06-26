import { useId, useContext, useState } from "react";
import { Link } from "react-router";
import { CartContext } from "../context/CartContext.jsx";
import QuantitySelector from "../components/QuantitySelector.jsx";
import ProcessingModal from "../components/ProcessingModal.jsx";
import "../styles/CartPage.css";

import {
    validateEmail,
    validateCardNumber,
    validateExpiryMonth,
    validateExpiryYear,
    validateCvv,
} from "../utils/validation.js";

export default function Cart({ user }) {
    const emailId = useId();
    const { cart, cartSum, clearCart } = useContext(CartContext);
    const [isProcessing, setIsProcessing] = useState(false);

    const [email, setEmail] = useState(user ? user.email : "");
    const [cardNumber, setCardNumber] = useState("");
    const [expiryMonth, setExpiryMonth] = useState("");
    const [expiryYear, setExpiryYear] = useState("");
    const [cvv, setCvv] = useState("");

    const isEmailValid = validateEmail(email);
    const isCardValid = validateCardNumber(cardNumber);
    const isMonthValid = validateExpiryMonth(expiryMonth);
    const isYearValid = validateExpiryYear(expiryYear);
    const isCvvValid = validateCvv(cvv);

    const isFormValid =
        isEmailValid && isCardValid && isMonthValid && isYearValid && isCvvValid;

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
        <>
            {isProcessing && <ProcessingModal />}
            <div className="cart-container">
                <div className="cart-left">
                    <h2 className="section-title">Shopping Cart</h2>

                    {cart.map((product) => (
                        <div key={product.id} className="cart-item">
                            <img
                                src={product.thumbnail}
                                alt={product.name}
                                className="cart-product-img"
                            />

                            <div className="cart-product-info">
                                <p className="product-name">{product.name}</p>
                                <p className="unit-price">
                                    Unit price: ${(product.final_price / 100).toFixed(2)}
                                </p>
                            </div>

                            <QuantitySelector product={product} />

                            <div className="product-subtotal">
                                <p>
                                    ${((product.final_price * product.quantity) / 100).toFixed(2)}
                                </p>
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

                    <form
                        className="payment-form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (!isFormValid) return;

                            setIsProcessing(true);

                            const isSuccess = Math.random() > 0.2;

                            setTimeout(() => {
                                setIsProcessing(false);
                                if (isSuccess) {
                                    clearCart();
                                    window.location.href = "/payment-success";
                                } else {
                                    window.location.href = "/payment-failure";
                                }
                            }, 2000);
                        }}
                    >
                        <label htmlFor={emailId}>Email:</label>
                        <input
                            id={emailId}
                            type="email"
                            className="input"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {!isEmailValid && email.length > 0 && (
                            <p className="error">Please enter a valid email.</p>
                        )}

                        <label>Card Number:</label>
                        <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            maxLength={19}
                        />
                        {!isCardValid && cardNumber.length > 0 && (
                            <p className="error">Please enter a valid 16-digit card number.</p>
                        )}

                        <label>Expiration Date:</label>
                        <div className="expiry">
                            <input
                                type="text"
                                placeholder="MM"
                                value={expiryMonth}
                                onChange={(e) => setExpiryMonth(e.target.value)}
                                maxLength={2}
                            />
                            <input
                                type="text"
                                placeholder="YYYY"
                                value={expiryYear}
                                onChange={(e) => setExpiryYear(e.target.value)}
                                maxLength={4}
                            />
                        </div>
                        {(!isMonthValid || !isYearValid) &&
                            (expiryMonth.length > 0 || expiryYear.length > 0) && (
                                <p className="error">Please enter a valid expiration date.</p>
                            )}

                        <label>CVV:</label>
                        <input
                            type="text"
                            placeholder="***"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            maxLength={4}
                        />
                        {!isCvvValid && cvv.length > 0 && (
                            <p className="error">Please enter a valid CVV.</p>
                        )}

                        <button
                            type="submit"
                            className={`checkout-btn ${!isFormValid ? "disabled" : ""}`}
                            disabled={!isFormValid}
                            title={!isFormValid ? "Complete all fields correctly" : ""}
                        >
                            Check Out
                        </button>

                    </form>
                </div>
            </div>
        </>
    );
}
