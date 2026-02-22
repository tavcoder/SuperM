/**
 * Renders dynamic filter checkboxes grouped by category from ProductsContext.
 * Reads filters, setFilters, resetFilters and closeSidebar from ProductsContext — no props required.
 */

import { useContext, useId } from "react";
import { ProductsContext } from "../context/ProductsContext";

export default function FilterGroup() {
    const baseId = useId();
    const { filters, setFilters, resetFilters, closeSidebar } = useContext(ProductsContext);

    return (
        <div className="filter-group">
            <h3>Filter Options</h3>
            {Object.entries(filters).map(([sectionName, sectionOptions]) => (
                <div key={sectionName} className="filter-group__subgroup"> 
                    <h3 className="filter-group__title">By {sectionName}</h3>
                    <ul className="filter-group__list">
                        {Object.entries(sectionOptions).map(([optionName, isChecked], index) => {
                            const id = `${baseId}-${sectionName}-${index}`;
                            return (
                                <li key={id} className="filter-group__item">
                                    <input
                                        type="checkbox"
                                        id={id}
                                        name={optionName}
                                        checked={isChecked}
                                        onChange={(e) =>
                                            setFilters({
                                                ...filters,
                                                [sectionName]: {
                                                    ...filters[sectionName],
                                                    [optionName]: e.target.checked,
                                                },
                                            })
                                        }
                                    />
                                    <label htmlFor={id} className="u-label">
                                        {optionName}
                                    </label>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))}
            <button onClick={closeSidebar} className="filter-apply-btn u-btn u-btn--primary">
                Apply filters
            </button>
            <button onClick={resetFilters} className="u-btn u-btn--secondary">
                Remove filters
            </button>
        </div>
    );
}