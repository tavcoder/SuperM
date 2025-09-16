// Product details page displaying individual product information and add to cart
import { useContext } from "react";
import { Link, useParams } from "react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CartContext } from "../context/CartContext.jsx";
import { get } from "../services/fetcher.jsx";
import Price from "../components/Price.jsx";
import QuantitySelector from "../components/QuantitySelector.jsx";
import "../styles/ProductDetailsPage.css";

export default function ProductDetails() {
    const { id } = useParams();
    const {cart, handleAddProduct } = useContext(CartContext);

    const { data } = useSuspenseQuery({
        queryKey: ["products/details", id],
        queryFn: () => get("products", `products?id=eq.${id}`),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
    const details = data[0];
    const productInCart = cart.find(item => String(item.id) === String(details.id));

    return (
        <>
            <Link to="/products" className="btn btn--level3">
                &lsaquo; Back to products
            </Link>
            <title>{`${details.name} | SuperM`}</title>
            <div className="details">
                <div>
                    <img
                        src={details.thumbnail}
                        alt={details.name}
                        width="612"
                        height="408"
                        className="details-image"
                    />

                    <h2>Product details</h2>
                    <table className="nutrition">
                        <thead>
                            <tr>
                                <th>Nutrient</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Protein</td>
                                <td>{details.nutrition.protein} g</td>
                            </tr>
                            <tr>
                                <td>Carbohydrates</td>
                                <td>{details.nutrition.carbs} g</td>
                            </tr>
                            <tr>
                                <td>Fat</td>
                                <td>{details.nutrition.fat} g</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <h1 className="details-name">{details.name}</h1>
                    <p className="details-price">
                        <Price
                            finalPrice={details.final_price}
                            originalPrice={details.original_price}
                        />
                    </p>
                    <p
                        className="text-dimmed"
                        dangerouslySetInnerHTML={{
                            __html: details.description,
                        }}
                    ></p>
                    <div className="details-btn">
                        {productInCart ? <QuantitySelector product={details} className="details-selector" />
                            : (<button
                                aria-label="Add product"
                                onClick={() => handleAddProduct(details)}
                                className="btn btn--level1">
                                Add Product
                            </button>)
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
