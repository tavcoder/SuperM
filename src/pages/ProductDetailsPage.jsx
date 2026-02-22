/**
 * Displays individual product information including image, nutrition, price, and description.
 * Fetches product data via React Query using the id from URL params.
 * Reads cart and handleAddProduct from CartContext — no props required.
 */

import { useContext } from "react";
import { Link, useParams } from "react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { get } from "../services/fetcher.js";
import Price from "../components/Price.jsx";
import QuantitySelector from "../components/QuantitySelector.jsx";
import { CartContext } from "../context/CartContext.jsx";
import "../styles/ProductDetailsPage.css";

export default function ProductDetails() {
    const { id } = useParams();
    const { cart, handleAddProduct } = useContext(CartContext);

    const { data } = useSuspenseQuery({
        queryKey: ["products/details", id],
        queryFn: () => get("products", `products?id=eq.${id}`),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
    const details = data[0];
    const productInCart = cart.find(item => String(item.id) === String(details.id));

    return (
        <>
            <Link to="/products" className="u-btn u-btn--tertiary">
                &lsaquo; Back to products
            </Link>
            <title>{`${details.name} | SuperM`}</title>
            <div className="details">
                <div>
                    <img
                        src={details.thumbnail}
                        alt={`${details.name} product image`}
                        width="612"
                        height="408"
                        className="details__image"
                    />

                    <h2>Product details</h2>
                    <table className="details__nutrition">
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
                    <h1 className="details__name">{details.name}</h1>
                    <p className="details__price">
                        <Price
                            finalPrice={details.final_price}
                            originalPrice={details.original_price}
                        />
                    </p>
                    <p
                        className="u-text-dimmed"
                        dangerouslySetInnerHTML={{
                            __html: details.description,
                        }}
                    ></p>
                    <div className="details__actions">
                        {productInCart ? <QuantitySelector product={details} className="details-selector" />
                            : (<button
                                aria-label={`Add ${details.name} to cart`}
                                onClick={() => handleAddProduct(details)}
                                className="u-btn u-btn--primary">
                                Add Product
                            </button>)
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
