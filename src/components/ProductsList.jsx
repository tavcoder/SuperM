/**
 * Displays the product grid with search, filtering, and sorting.
 * Fetches products via React Query and reads filter state from ProductsContext.
 * Shows a counter when results are filtered and an empty state when no products match.
 * @param {Function} openSidebar - Callback to open the filter/sort sidebar
 */

import { useContext, useMemo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { FaSearch } from "react-icons/fa";
import ProductCard from "./ProductCard.jsx";
import { get } from "../services/fetcher.js";
import { ProductsContext } from "../context/ProductsContext.jsx";
import { getVisibleProducts } from "../utils/filters.js";

export default function ProductsList({ openSidebar }) {
    const { data: products } = useSuspenseQuery({
        queryKey: ["products-list"],
        queryFn: () => get("products", "products"),
        staleTime: 1000 * 60 * 5,
    });

    const {
        query,
        setQuery,
        sortOption,
        filters,
        handleSearchChange,
    } = useContext(ProductsContext);

    // Memoize filtered products to avoid recalculation on unrelated re-renders
    const filteredProducts = useMemo(() => {
        return getVisibleProducts(products, filters, sortOption, query);
    }, [products, filters, sortOption, query]);

    const totalProducts = products.length;
    const visibleProducts = filteredProducts.length;
    const showCounter = visibleProducts !== totalProducts || query.trim() !== "";

    return (
        <main className="products-list">
            <div className="products-list__header">
                <div className="products-list__title-row">
                    <h1 className="products-list__title">Products</h1>
                    <button
                        className="products-list__btn u-btn u-btn--tertiary"
                        onClick={openSidebar}
                    >
                        FILTER AND SORT
                    </button>
                </div>
                <div className="products-list__search">
                    <FaSearch className="products-list__search-icon" />
                    <input
                        type="search"
                        className="products-list__search-input"
                        value={query}
                        placeholder="Search products"
                        onChange={handleSearchChange}
                    />
                </div>
            </div>

            {showCounter && (
                <p className="u-info">
                    Showing <strong>{visibleProducts}</strong> out of{" "}
                    <strong>{totalProducts}</strong> products
                </p>
            )}

            {filteredProducts.length === 0 && query.trim() !== "" ? (
                <div className="products-list__empty">
                    <div>
                        <h2>No products found!</h2>
                        <p>
                            Your search &quot;<strong>{query}</strong>&quot; was not
                            found in our store.
                        </p>
                        <button
                            className="u-btn u-btn--tertiary"
                            type="button"
                            onClick={() => setQuery("")}
                        >
                            Reset search
                        </button>
                    </div>
                </div>
            ) : (
                <div className="products-list__grid">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} details={product} />
                    ))}
                </div>
            )}
        </main>
    );
}