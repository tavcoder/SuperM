// Component for displaying a list of products with search, filtering, and sorting
import { useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ProductsContext } from "../context/ProductsContext.jsx";
import Product from "./Product.jsx";
import { get } from "../services/fetcher.jsx";
import { getVisibleProducts } from "../utils/filters.js";

export default function ProductsList({ openSidebar }) {
    console.log("openSidebar is", openSidebar);

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

    const filteredProducts = getVisibleProducts(products, filters, sortOption, query);
    const totalProducts = products.length;
    const visibleProducts = filteredProducts.length;

    const showCounter = visibleProducts !== totalProducts || query.trim() !== "";

    return (
        <main className="products-main">
            <div className="products-title">
                <div className="products-filter-container">
                    <h1>Products</h1>
                    <title>Products | SuperM</title>
                    <button
                        className="products-filter-btn btn btn--level3"
                        onClick={openSidebar}
                    >
                        FILTER AND SORT
                    </button>
                </div>
                <div className="search-wrapper">
                    <FaSearch className="search-icon" />
                    <input
                        type="search"
                        className="search"
                        value={query}
                        placeholder="Search products"
                        onChange={handleSearchChange}
                    />
                </div>
            </div>

            {showCounter && (
                <div className="info">
                    Showing <strong>{visibleProducts}</strong> out of <strong>{totalProducts}</strong> products
                </div>
            )}
            {console.log("query:", query)}
            {filteredProducts.length === 0 && query.trim() !== "" ? (

                <div className="info">
                    <div>
                        <h2>No products found!</h2>
                        <p>
                            Your search &quot;<strong>{query}</strong>&quot; was not found in our store.
                        </p>
                        <button
                            className="btn btn--level3 "
                            type="button"
                            onClick={() => setQuery("")}
                        >
                            Reset search
                        </button>
                    </div>
                </div>
            ) : (
                <div className="products-grid">
                    {filteredProducts.map(product => (
                        <Product key={product.id} details={product} />
                    ))}
                </div>
            )}
        </main>
    );
}
