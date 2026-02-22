/**
 * Displays increment/decrement controls for a cart item.
 * Shows a trash icon when quantity is 1 to indicate the item will be removed.
 * Reads cart state directly from CartContext — no cart props required.
 * @param {Object} product - Product to control
 * @param {string|number} product.id - Used to find the item in the cart
 * @param {string} product.name - Used in aria-labels for accessibility
 */

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
            className="quantity-selector"
            role="group"
            aria-label={`Quantity controls for ${product.name}`}
        >
            <li className="quantity-selector__item" id={`${id}-decrease`}>
                <button className="quantity-selector__btn"
                    onClick={handleRemove}
                    aria-label={
                        quantity === 1
                            ? `Remove ${product.name}`
                            : `Decrease quantity of ${product.name}`
                    }
                >
                    {quantity === 1 ? (
                        <FaTrashAlt className="u-icon" />
                    ) : (
                        "-"
                    )}
                </button>
            </li>
            <li className="quantity-selector__count" id={`${id}-quantity-display`} aria-live="polite" aria-atomic="true">
                {quantity}
            </li>
            <li className="quantity-selector__item" id={`${id}-increase`}>
                <button
                    className="quantity-selector__btn"
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
