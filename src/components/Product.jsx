import { Link } from "react-router";
import { useContext } from "react";
import Price from "./Price.jsx";
import { CartContext } from "../context/CartContext.jsx";
import QuantitySelector from "./QuantitySelector.jsx";

export default function Product(props) {
    const { cart, handleAddProduct} = useContext(CartContext);

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
                <div className="product-price">
                    <Price
                        finalPrice={props.details.final_price}
                        originalPrice={props.details.original_price}
                    />
                </div>
            </Link>
            {productInCart ? <QuantitySelector product={props.details} />
                : (<button
                    onClick={() => handleAddProduct(props.details)}
                    className="btn">
                    ADD TO THE CART
                </button>)
            }

        </div>
    );
}
