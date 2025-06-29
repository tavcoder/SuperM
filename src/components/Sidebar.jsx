import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
import FilterGroup from "./FilterGroup";

export default function Sidebar() {
    const {
        sortOption,
        setSortOption,
    } = useContext(ProductsContext);

    return (
        <aside className="sidebar">
            <h3>Order</h3>
            <div className="select-wrapper">
                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="select"
                >
                    <option value="">Select an option</option>
                    <option value="price-desc">Price (high to low)</option>
                    <option value="price-asc">Price (low to high)</option>
                    <option value="name-asc">Name (A to Z)</option>
                    <option value="name-desc">Name (Z to A)</option>
                </select>
            </div>
            <FilterGroup />
        </aside>
    );
}
