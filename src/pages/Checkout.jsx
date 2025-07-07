import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import CartSummary from "../components/CartSummary";
import ShippingForm from "../components/ShippingForm";
import PaymentForm from "../components/PaymentForm";
import CartTotals from "../components/CartTotals";
import "../styles/CheckoutPage.css";

export default function Checkout({ user }) {
    const [step, setStep] = useState(1); // 1 = Cart, 2 = Shipping, 3 = Payment
    const { cart, cartSum, shippingCost = 0 } = useContext(CartContext);

    const subtotal = cart.reduce(
        (acc, product) => acc + product.original_price * product.quantity,
        0
    );
    const discount = subtotal - cartSum;
    const total = cartSum + shippingCost;

    return (
        <div className="checkout-container">
            <div className="checkout-left">
                {step === 1 ? (
                    <CartSummary onNext={() => setStep(2)} />
                ) : step === 2 ? (
                    <ShippingForm onNext={() => setStep(3)} />
                ) : (
                    <PaymentForm user={user} />
                )}
            </div>
            <div className="checkout-right">
                <CartTotals
                    subtotal={subtotal}
                    discount={discount}
                    shippingCost={shippingCost}
                    total={total}
                />
            </div>
        </div>
    );
}
