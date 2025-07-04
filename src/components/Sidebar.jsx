import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
import FilterGroup from "./FilterGroup";
import CustomSelect from "./CustomSelect";

export default function Sidebar() {
    const { sortOption, setSortOption } = useContext(ProductsContext);
    const OPTIONS = [
        { label: "Select an option", value: "" },
        { label: "Price (high to low)", value: "price-desc" },
        { label: "Price (low to high)", value: "price-asc" },
        { label: "Name (A to Z)", value: "name-asc" },
        { label: "Name (Z to A)", value: "name-desc" },
    ];

    return (
        <aside className="sidebar">
            <h3>Order</h3>
            <div className="select-wrapper">
                <CustomSelect value={sortOption} onChange={setSortOption} options={OPTIONS} />
            </div>
            <FilterGroup />
        </aside>
    );
}
