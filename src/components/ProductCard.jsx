/**
 * Shows a product card component with image, price, and add to cart
 * Memoized to prevent unnecessary re-renders in product lists
 * @param {Object} props.details - Product data object
 */
import { Link } from "react-router";
import { FaCartPlus } from "react-icons/fa";
import { useContext, memo } from "react";
import Price from "./Price.jsx";
import QuantitySelector from "./QuantitySelector.jsx";
import { CartContext } from "../context/CartContext.jsx";

function Product({ details }) {
    const { cart, handleAddProduct } = useContext(CartContext);

    // Compare IDs as strings to handle type inconsistency from API
    const productInCart = cart.find(item => String(item.id) === String(details.id));

    return (
        <article className="product">
            <Link to={`/products/${details.id}`}>
                <img
                    className="product__image"
                    loading="lazy"
                    width="272"
                    src={details.thumbnail}
                    alt={`${details.name} - ${details.category}`}
                    onLoad={(e) => e.currentTarget.classList.add("loaded")}
                />
                <p className="product__name">{details.name}</p>
            </Link>

            <div className="product__price">
                <Price
                    finalPrice={details.final_price}
                    originalPrice={details.original_price}
                />
                {productInCart ? (
                    <QuantitySelector product={details} />
                ) : (
                    <button
                        aria-label={`Add ${details.name} to cart`}
                        onClick={() => handleAddProduct(details)}
                        className="product__btn u-btn--secondary"
                    >
                        <FaCartPlus />
                    </button>
                )}
            </div>
        </article>
    );
}

export default memo(Product);