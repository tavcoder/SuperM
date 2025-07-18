import { useContext, useId } from "react";
import { ProductsContext } from "../context/ProductsContext";


export default function FilterGroup() {
    const baseId = useId();
    const {
        filters,
        setFilters,
        resetFilters,
        closeSidebar,
    } = useContext(ProductsContext);

    return (
        <div className="filter-group">
            <h3>Filter Options</h3>
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
                                        className="checkbox"
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
                                    <label htmlFor={id} className="label">
                                        {optionName}
                                    </label>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))}
            <button onClick={closeSidebar} className="filter-apply-btn btn btn--level1">Apply filters</button>
            <button onClick={resetFilters} className="btn btn--level2">Remove filters</button>
        </div>
    );
}
