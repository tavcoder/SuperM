import { useState } from "react";
import ShippingForm from "../components/ShippingForm";
import PaymentForm from "../components/PaymentForm";
import CartSummary from "../components/CartSummary";
import "../styles/CheckoutPage.css";

export default function Checkout({ user }) {
    const [step, setStep] = useState(1); // 1 = Shipping, 2 = Payment

    return (
        <div className="checkout-container">
            <div className="checkout-left">
                <CartSummary />
            </div>
            <div className="checkout-right">
                {step === 1 ? (
                    <ShippingForm onNext={() => setStep(2)} />
                ) : (
                    <PaymentForm user={user} />
                )}
            </div>
        </div>
    );
}
