/**
 * Product card component displaying product information and add to cart functionality
 * Shows product image, name, price, and allows adding to cart
 */
import { Link } from "react-router";
import { FaCartPlus } from "react-icons/fa";
import { useContext, memo} from "react";
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
                    className="product__image"
                    loading="lazy"
                    width="272"
                    src={props.details.thumbnail}
                    alt={props.details.name}
                    onLoad={(e) => e.currentTarget.classList.add("loaded")}
                />

                <p className="product__name">{props.details.name}</p>
            </Link>
            <div className="product__price">
                <Price
                    finalPrice={props.details.final_price}
                    originalPrice={props.details.original_price}
                />
                {productInCart ? <QuantitySelector product={props.details} />
                    : (<button
                        aria-label="Add product"
                        onClick={() => handleAddProduct(props.details)}
                        className="btn--level2 product__btn">
                        <FaCartPlus />
                    </button>)
                }
            </div>
        </div>
    );
}

export default memo(Product);
