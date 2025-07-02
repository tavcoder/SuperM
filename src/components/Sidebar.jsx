import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
import FilterGroup from "./FilterGroup";
import CustomSelect from "./CustomSelect";

export default function Sidebar() {
    const { sortOption, setSortOption } = useContext(ProductsContext);

    return (
        <aside className="sidebar">
            <h3>Order</h3>
            <div className="select-wrapper">
                <CustomSelect value={sortOption} onChange={setSortOption} />
            </div>
            <FilterGroup />
        </aside>
    );
}
