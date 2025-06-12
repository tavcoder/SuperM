import { useContext } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ProductsContext } from "../context/ProductsContext.jsx";
import Product from "./Product.jsx";
import { get } from "../services/fetcher.jsx";

export default function ProductsList() {
    const { data: products } = useSuspenseQuery({
        queryKey: ["products-list"],
        queryFn: () => get("products"),
        staleTime: 1000 * 60 * 5,
    });

    const {
        query,
        setQuery,
        sortOption,
        filters,
        handleSearchChange,
    } = useContext(ProductsContext);

    function applySort(products) {
        switch (sortOption) {
            case "best-selling": return [...products];
            case "price-desc": return [...products].sort((a, b) => b.final_price - a.final_price);
            case "price-asc": return [...products].sort((a, b) => a.final_price - b.final_price);
            case "name-asc": return [...products].sort((a, b) => a.name.localeCompare(b.name));
            case "name-desc": return [...products].sort((a, b) => b.name.localeCompare(a.name));
            default: return products;
        }
    }

    function applyFilters(products) {
        return products.filter(product => {
            if (filters.eco && product.nutrition.eco !== true) {
                return false;
            }
            if (filters.gluten === true && product.nutrition.gluten !== false) {
                return false;
            }
            return true;
        });
    }



    const filteredProducts = applySort(applyFilters(products));

    return (
        <main className="products-main">
            <div className="products-title">
                <h1>Products</h1>
                <title>Products | SuperM</title>
                <input
                    type="search"
                    className="search"
                    value={query}
                    placeholder="Search products"
                    onChange={handleSearchChange}
                />
            </div>

            {filteredProducts.length === 0 && query.trim() !== "" ? (
                <div className="products-not-found">
                    <div>
                        <h2>No products found!</h2>
                        <p>
                            Your search &quot;<strong>{query}</strong>&quot; was
                            not found in our store.
                        </p>
                        <button
                            className="btn btn-dimmed"
                            type="button"
                            onClick={() => setQuery("")}
                        >
                            Reset search
                        </button>
                    </div>
                </div>
            ) : (
                <div className="products-grid">
                    {filteredProducts.map((product) => (
                        <Product key={product.id} details={product} />
                    ))}
                </div>
            )}

        </main>
    );
}
