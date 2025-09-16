// Product card component displaying item details, price, and add to cart functionality
/**
 * Product card component displaying product information and add to cart functionality
 * Shows product image, name, price, and allows adding to cart
 */
import { Link } from "react-router";
import { FaCartPlus } from "react-icons/fa";
import { useContext, memo } from "react";
import Price from "./Price.jsx";
import { CartContext } from "../context/CartContext.jsx";
import QuantitySelector from "./QuantitySelector.jsx";

function Product(props) {
    const { cart, handleAddProduct } = useContext(CartContext);

    const productInCart = cart.find(item => String(item.id) === String(props.details.id));

    return (
        <div className="product">
            <Link to={`/products/${props.details.id}`}>
                <img
                    className="product-image"
                    width="272"
                    height="300"
                    src={props.details.thumbnail}
                    alt={props.details.name}
                />
                <p className="product-name">{props.details.name}</p>
            </Link>
            <div className="product-price">
                <Price
                    finalPrice={props.details.final_price}
                    originalPrice={props.details.original_price}
                />
                {productInCart ? <QuantitySelector product={props.details} />
                    : (<button
                        aria-label="Add product"
                        onClick={() => handleAddProduct(props.details)}
                        className="btn--level2 product-btn">
                        <FaCartPlus />
                    </button>)
                }
            </div>
        </div>
    );
}

export default memo(Product);
