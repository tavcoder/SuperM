import { useContext } from "react";
import {ProductsContext } from "../context/ProductsContext";

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
            <h2>Ordenar</h2>
            <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="sort-select"
            >
                <option value="">Selecciona una opción</option>
                <option value="best-selling">Los más vendidos</option>
                <option value="price-desc">Precio (de mayor a menor)</option>
                <option value="price-asc">Precio (de menor a mayor)</option>
                <option value="name-asc">Nombre (de la A a la Z)</option>
                <option value="name-desc">Nombre (de la Z a la A)</option>
            </select>

            <div className="filter-header">
                <h2>Filtrar</h2>
                <button className="btn-clear" onClick={resetFilters}>x</button>
            </div>

            <div className="filters">
                <label>
                    <input
                        type="checkbox"
                        checked={filters.eco}
                        onChange={(e) =>
                            setFilters({ ...filters, eco: e.target.checked })
                        }
                    />
                    Eco
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={filters.gluten}
                        onChange={(e) =>
                            setFilters({ ...filters, gluten: e.target.checked })
                        }
                    />
                    Gluten Free
                </label>
               
            </div>

            <button className="btn btn-dimmed" onClick={resetFilters}>
                Borrar filtros
            </button>
            <button className="btn btn-primary" onClick={() => { }}>
                Aplicar
            </button>
        </aside>
    );
}
