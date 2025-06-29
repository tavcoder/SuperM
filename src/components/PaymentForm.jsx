import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext.jsx";
import "../styles/PaymentForm.css";

export default function PaymentForm({ user, onBack }) {
    const { clearCart } = useContext(CartContext);
    const [isProcessing, setIsProcessing] = useState(false);

    const [method, setMethod] = useState("card");

    const [cardName, setCardName] = useState(user?.name || "");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");

    const isFormValid =
        cardName.trim().length > 0 &&
        cardNumber.replace(/\s/g, "").length === 16 &&
        expiry.length >= 5 &&
        cvv.length >= 3;

    const handleSubmit = (e) => {
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
    };

    return (
        <div className="payment-form-container">
            <h2>Payment method</h2>

            <div className="payment-methods">
                <label>
                    <input
                        type="radio"
                        name="method"
                        value="card"
                        checked={method === "card"}
                        onChange={() => setMethod("card")}
                    />
                    CARD
                </label>
                <label>
                    <input
                        type="radio"
                        name="method"
                        value="paypal"
                        checked={method === "paypal"}
                        onChange={() => setMethod("paypal")}
                    />
                    PAYPAL
                </label>
            </div>

            {method === "card" && (
                <form className="card-form" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="input-group">
                            <label>Name on card</label>
                            <input
                                type="text"
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value)}
                                placeholder=""
                            />
                        </div>
                        <div className="input-group">
                            <label>Card number</label>
                            <input
                                type="text"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                placeholder=""
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-group">
                            <label>Expiry date</label>
                            <input
                                type="text"
                                value={expiry}
                                onChange={(e) => setExpiry(e.target.value)}
                                placeholder="MM/YY"
                            />
                        </div>
                        <div className="input-group">
                            <label>CVC</label>
                            <input
                                type="text"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                placeholder=""
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={`purchase-btn ${!isFormValid ? "disabled" : ""}`}
                        disabled={!isFormValid}
                    >
                        COMPLETE PURCHASE
                    </button>
                </form>
            )}

            <button className="back-link" onClick={onBack}>
                ← BACK TO SHIPPING
            </button>
        </div>
    );
}
