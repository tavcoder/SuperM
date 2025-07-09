import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext.jsx";
import { validateField } from "../utils/validation";
import "../styles/CheckoutPage.css";

export default function PaymentForm({ user, onBack }) {
    const { clearCart } = useContext(CartContext);
    const [isProcessing, setIsProcessing] = useState(false);
    const [method, setMethod] = useState("card");

    const [form, setForm] = useState({
        cardName: user?.name || "",
        cardNumber: "",
        expiry: "",
        cvv: ""
    });

    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({});

    const formatCardNumber = (val) => {
        const digits = val.replace(/\D/g, "").slice(0, 16);
        return digits.replace(/(.{4})/g, "$1 ").trim();
    };

    const formatExpiry = (val) => {
        const digits = val.replace(/\D/g, "").slice(0, 4);
        if (digits.length < 3) return digits;
        return digits.replace(/(\d{2})(\d{1,2})/, "$1/$2");
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleChange = (e) => {
        let { name, value } = e.target;

        if (name === "cardNumber") value = formatCardNumber(value);
        if (name === "expiry") value = formatExpiry(value);

        setForm(prev => ({ ...prev, [name]: value }));

        if (touched[name]) {
            const error = validateField(name, value);
            setErrors(prev => ({ ...prev, [name]: error }));
        }
    };

    const isFormValid = () => {
        const newErrors = {};
        for (const key in form) {
            const error = validateField(key, form[key]);
            if (error) newErrors[key] = error;
        }
        setErrors(newErrors);
        setTouched(Object.keys(form).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isFormValid()) return;

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

    const isInputValid = () => {
        return Object.keys(form).every((key) => validateField(key, form[key]) === "");
    };

    return (
        <div className="payment-form-container">
            <button className="btn btn--level3" onClick={onBack}>← BACK TO SHIPPING</button>
            <h2>Payment method</h2>

            <div className="payment-methods">
                <label>
                    <input type="radio" name="method" value="card" checked={method === "card"} onChange={() => setMethod("card")} />
                    CARD
                </label>
                <label>
                    <input type="radio" name="method" value="paypal" checked={method === "paypal"} onChange={() => setMethod("paypal")} />
                    PAYPAL
                </label>
            </div>

            {method === "card" && (
                <form className="card-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Name on card</label>
                        <input
                            name="cardName"
                            type="text"
                            value={form.cardName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.cardName && errors.cardName && <span className="error">{errors.cardName}</span>}
                    </div>

                    <div className="input-group">
                        <label>Card number</label>
                        <input
                            name="cardNumber"
                            type="text"
                            value={form.cardNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            maxLength="19"
                        />
                        {touched.cardNumber && errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
                    </div>

                    <div className="row">
                        <div className="input-group">
                            <label>Expiry date</label>
                            <input
                                name="expiry"
                                type="text"
                                value={form.expiry}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="MM/YY"
                                maxLength="5"
                            />
                            {touched.expiry && errors.expiry && <span className="error">{errors.expiry}</span>}
                        </div>

                        <div className="input-group">
                            <label>CVC</label>
                            <input
                                name="cvv"
                                type="text"
                                value={form.cvv}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                maxLength="4"
                            />
                            {touched.cvv && errors.cvv && <span className="error">{errors.cvv}</span>}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={`btn btn--level2 ${!isInputValid() || isProcessing ? "disabled" : ""}`}
                        disabled={!isInputValid() || isProcessing}
                    >
                        {isProcessing ? "Processing..." : "COMPLETE PURCHASE"}
                    </button>
                </form>
            )}
        </div>
    );
}
