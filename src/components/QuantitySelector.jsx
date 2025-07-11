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
        <ul
            className="quantity-buttons"
            role="group"
            aria-label={`Quantity controls for ${product.name}`}
        >
            <li id={`${id}-remove-btn`}>
                <button className="icon"
                    onClick={handleRemove}
                    aria-label={
                        quantity === 1
                            ? `Remove ${product.name}`
                            : `Decrease quantity of ${product.name}`
                    }
                >
                    {quantity === 1 ? (
                        <FaTrashAlt />
                    ) : (
                        "-"
                    )}
                </button>
            </li>
            <li id={`${id}-quantity-display`} aria-live="polite" aria-atomic="true">
                {quantity}
            </li>
            <li id={`${id}-add-btn`}>
                <button
                className="quantity-buttons-add"
                    onClick={() => handleAddProduct(product)}
                    aria-label={`Increase quantity of ${product.name}`}
                >
                 +
                </button>
            </li>
        </ul>


    );
}
