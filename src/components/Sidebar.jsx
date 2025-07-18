import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
import FilterGroup from "./FilterGroup";
import CustomSelect from "./CustomSelect";

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
        <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
            <div className="sidebar-open-top">
                <h2>FILTER AND SORT</h2>
                <button className="icon" onClick={handleClose}>X</button>
            </div>
            <h3>Order</h3>
            <div className="select-wrapper">
                <CustomSelect value={sortOption} onChange={setSortOption} options={OPTIONS} />
            </div>
            <FilterGroup />
        </aside>
    );
}
