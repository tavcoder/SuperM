import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import CartSummary from "../components/CartSummary";
import ShippingForm from "../components/ShippingForm";
import PaymentForm from "../components/PaymentForm";
import CartTotals from "../components/CartTotals";
import "../styles/CheckoutPage.css";

export default function Checkout({ user }) {
    const [step, setStep] = useState(1); // 1 = Cart, 2 = Shipping, 3 = Payment
    const { cart, cartSum, shippingCost = 300 } = useContext(CartContext);

    const subtotal = cart.reduce(
        (acc, product) => acc + product.original_price * product.quantity,
        0
    );
    const discount = subtotal - cartSum;
    const total = cartSum + shippingCost;

    const goToStep2 = () => {
        if (step === 1) setStep(2);
    };

    return (
        <div className="checkout-container">
            <div className="checkout-left">
                {step === 1 ? (
                    <CartSummary />
                ) : step === 2 ? (
                    <ShippingForm onNext={() => setStep(3)} />
                ) : (
                    <PaymentForm user={user} onBack={() => setStep(2)} />
                )}
            </div>
            <div className="checkout-right">
                {cart.length > 0 && (
                    <CartTotals
                        subtotal={subtotal}
                        discount={discount}
                        shippingCost={shippingCost}
                        total={total}
                        onNextStep={goToStep2}
                        step={step}
                    />
                )}
            </div>
        </div>
    );
}
