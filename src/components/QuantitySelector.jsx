// Quantity selector component for adjusting item quantities in cart with increment/decrement and remove
import { useContext, useId, memo } from "react";
import { CartContext } from "../context/CartContext";
import { FaTrashAlt } from "react-icons/fa";
import "../styles/index.css";

function QuantitySelector({ product }) {
    const { cart, handleAddProduct, handleRemoveProduct } = useContext(CartContext);
    const id = useId();

    const productInCart = cart.find((item) => String(item.id) === String(product.id));
    const quantity = productInCart?.quantity || 0;

    const handleRemove = () => {
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

export default memo(QuantitySelector);
