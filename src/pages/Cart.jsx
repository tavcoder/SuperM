import { useId, useContext } from "react";
import { Link } from "react-router";
import { CartContext } from "../context/CartContext.jsx";
import QuantitySelector from "../components/QuantitySelector.jsx";

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
        <div className="cart-wrapper">
            <h1>Your cart</h1>
            <title>Cart | SuperM</title>
            {cart.map((product) => (
                console.log(product),
                <div key={product.id} className="cart-product">
                    <img
                        src={product.thumbnail}
                        alt={product.name}
                        className="cart-product-img"
                        width="126"
                        height="84"
                    />

                    <div className="cart-product-details">
                        <div className="product-header">
                            <p className="product-name">{product.name}</p>
                        </div>

                        <p className="unit-price">Unit price: ${(product.final_price / 100).toFixed(2)}</p>
                        <QuantitySelector product={product} />
                    </div>

                    <div className="cart-product-subtotal">
                        <p className="total-label">Subtotal</p>
                        <p className="total-price">${((product.final_price * product.quantity) / 100).toFixed(2)}</p>
                    </div>
                </div>

            ))}

            <div className="cart-total">
                <h2>Your total price</h2>
                <p className="cart-total-value">
                    ${(cartSum / 100).toFixed(2)}
                </p>
            </div>
            <form onSubmit={(event) => event.preventDefault()}>
                <label className="label" htmlFor={emailId}>
                    Email<span className="required">*</span>:
                </label>
                <input
                    id={emailId}
                    type="email"
                    className="input"
                    placeholder="Enter your email"
                    defaultValue={user ? user.email : ""}
                />
                <p className="text-dimmed cart-notice">
                    Enter your email and then click on pay and your products
                    will be delivered to you the same day!
                </p>
                <p className="cart-notice cart-warning">
                    This is a demo, so the form does not submit any data.
                </p>
                <div className="cart-button-wrapper">
                    <input type="submit" value="Pay" className="btn" />
                </div>
            </form>
        </div>
    );
}
