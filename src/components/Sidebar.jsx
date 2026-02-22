/**
 * Renders product filtering and sorting options in a collapsible sidebar.
 * Reads sortOption, setSortOption, resetFilters, isSidebarOpen and closeSidebar from ProductsContext — no props required.
 */

import { useContext } from "react";
import FilterGroup from "./FilterGroup";
import CustomSelect from "./CustomSelect";
import { ProductsContext } from "../context/ProductsContext";

export default function Sidebar() {
    const { sortOption, setSortOption, resetFilters, isSidebarOpen, closeSidebar } = useContext(ProductsContext);
    const OPTIONS = [
        { label: "Select an option", value: "" },
        { label: "Price (high to low)", value: "price-desc" },
        { label: "Price (low to high)", value: "price-asc" },
        { label: "Name (A to Z)", value: "name-asc" },
        { label: "Name (Z to A)", value: "name-desc" },
    ];
    const handleClose = () => {
        resetFilters();
        closeSidebar();
    };
    return (
        <aside className={`sidebar ${isSidebarOpen ? "sidebar--open" : ""}`}>
            <div className="sidebar__header">
                <h2>FILTER AND SORT</h2>
                <button className="u-icon" onClick={handleClose}>X</button>
            </div>
            <h3 className="sidebar__section-title">Order</h3>
            <div className="sidebar__select">
                <CustomSelect aria-label="Select order" value={sortOption} onChange={setSortOption} options={OPTIONS} />
            </div>
            <FilterGroup />
        </aside>
    );
}
