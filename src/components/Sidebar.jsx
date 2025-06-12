import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";

export default function Sidebar() {
    const {
        sortOption,
        setSortOption,
        filters,
        setFilters,
        resetFilters,
    } = useContext(ProductsContext);

    return (
        <aside className="sidebar">
            <h3>Order</h3>
            <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="sort-select"
            >
                <option value="">Select an option</option>
                <option value="price-desc">Price (high to low)</option>
                <option value="price-asc">Price (low to high)</option>
                <option value="name-asc">Name (A to Z)</option>
                <option value="name-desc">Name (Z to A)</option>

            </select>

            <div className="filter-header">
                <h3>Filter</h3>
                <button className="btn-clear" onClick={resetFilters}>x</button>
            </div>

            <div className="filters">

                <select
                    value={filters.option}
                    onChange={(e) =>
                        setFilters({ ...filters, option: e.target.value })
                    }
                >
                    <option value=""></option>
                    <option value="eco">Eco</option>
                    <option value="gluten">Gluten Free</option>
                </select>


                {/* Filtros por categoría */}
                <div className="category-filters">
                    <h3>Category</h3>
                    <label>
                        <input
                            type="checkbox"
                            checked={filters.categories?.fruits || false}
                            onChange={(e) =>
                                setFilters({
                                    ...filters,
                                    categories: {
                                        ...filters.categories,
                                        fruits: e.target.checked,
                                    },
                                })
                            }
                        />
                        Fruits and Vegetables
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={filters.categories?.dairy || false}
                            onChange={(e) =>
                                setFilters({
                                    ...filters,
                                    categories: {
                                        ...filters.categories,
                                        dairy: e.target.checked,
                                    },
                                })
                            }
                        />
                        Dairy and Derivatives
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={filters.categories?.sweeteners || false}
                            onChange={(e) =>
                                setFilters({
                                    ...filters,
                                    categories: {
                                        ...filters.categories,
                                        sweeteners: e.target.checked,
                                    },
                                })
                            }
                        />
                        Sweeteners
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={filters.categories?.nuts || false}
                            onChange={(e) =>
                                setFilters({
                                    ...filters,
                                    categories: {
                                        ...filters.categories,
                                        nuts: e.target.checked,
                                    },
                                })
                            }
                        />
                        Nuts
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={filters.categories?.bakery || false}
                            onChange={(e) =>
                                setFilters({
                                    ...filters,
                                    categories: {
                                        ...filters.categories,
                                        bakery: e.target.checked,
                                    },
                                })
                            }
                        />
                        Bakery
                    </label>
                </div>
            </div>
        </aside>
    );
}
