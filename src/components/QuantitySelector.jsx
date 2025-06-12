import { useContext, useId } from "react";
import { CartContext } from "../context/CartContext";

export default function QuantitySelector({ product }) {
    const { cart, handleAddProduct, handleRemoveProduct } = useContext(CartContext);
    const id = useId();

    const productInCart = cart.find((item) => String(item.id) === String(product.id));
    const quantity = productInCart?.quantity || 0;

    return (
        <ul className="cart-buttons">
            <li id={`${id}-remove-btn`}>
                <button
                    onClick={() => handleRemoveProduct(product)}
                >
                    -
                </button>
            </li>
            <li id={`${id}-quantity-display`}>{quantity}</li>
            <li id={`${id}-add-btn`}>
                <button
                    onClick={() => handleAddProduct(product)}
                >
                    +
                </button>
            </li>
        </ul>
    );
}
