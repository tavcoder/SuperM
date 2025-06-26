import { useContext, useId } from "react";
import { ProductsContext } from "../context/ProductsContext";
import "../styles/FilterGroup.css";


export default function FilterGroup() {
    const baseId = useId();
    const {
        filters,
        setFilters,
        resetFilters,
    } = useContext(ProductsContext);

    return (
        <div className="filter-group">
            <h2>Filter Options</h2>
            {Object.entries(filters).map(([sectionName, sectionOptions]) => (
                <div key={sectionName} className="filter-subgroup">
                    <h3 className="filter-title">By {sectionName}</h3>
                    <ul className="filter-list">
                        {Object.entries(sectionOptions).map(([optionName, isChecked], index) => {
                            const id = `${baseId}-${sectionName}-${index}`;
                            return (
                                <li key={id} className="filter-item">
                                    <input
                                        type="checkbox"
                                        id={id}
                                        name={optionName}
                                        checked={isChecked}
                                        className="filter-checkbox"
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
                                    <label htmlFor={id} className="filter-label">
                                        {optionName}
                                    </label>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))}
            <button onClick={resetFilters} className="filter-btn">Remove filters</button>
        </div>
    );
}
