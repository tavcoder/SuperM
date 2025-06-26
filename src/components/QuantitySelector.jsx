import { useContext, useId, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { FaTrashAlt } from "react-icons/fa";
import "../styles/index.css";

export default function QuantitySelector({ product }) {
    const { cart, handleAddProduct, handleRemoveProduct } = useContext(CartContext);
    const id = useId();

    const productInCart = cart.find((item) => String(item.id) === String(product.id));
    const quantity = productInCart?.quantity || 0;

    const [animateTrash, setAnimateTrash] = useState(false);

    const handleRemove = () => {
        if (quantity === 1) {
            setAnimateTrash(true);
            setTimeout(() => setAnimateTrash(false), 300);
        }
        handleRemoveProduct(product);
    };

    return (
        <ul className="cart-buttons">
            <li id={`${id}-remove-btn`}>
                <button onClick={handleRemove} aria-label="Remove">
                    {quantity === 1 ? (
                        <FaTrashAlt className={`trash-icon ${animateTrash ? "animate" : ""}`} />
                    ) : (
                        "-"
                    )}
                </button>
            </li>
            <li id={`${id}-quantity-display`}>{quantity}</li>
            <li id={`${id}-add-btn`}>
                <button onClick={() => handleAddProduct(product)} aria-label="Add">+</button>
            </li>
        </ul>
    );
}
