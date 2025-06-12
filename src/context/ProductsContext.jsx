import { createContext, useContext, useState, useTransition } from "react";

export const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
    const [, startTransition] = useTransition();
    const [query, setQuery] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [filters, setFilters] = useState({
        eco: false,
        gluten: false,
        categories: {
            fruits: false,
            dairy: false,
            sweeteners: false,
            nuts: false,
            bakery: false,
        },
    });


    function handleSearchChange(event) {
        startTransition(() => {
            setQuery(event.target.value.trim().toLowerCase());
        });
    }

    function resetFilters() {
        setFilters({ eco: false, gluten: false });
    }

    return (
        <ProductsContext value={{
            query,
            setQuery,
            sortOption,
            setSortOption,
            filters,
            setFilters,
            handleSearchChange,
            resetFilters,
        }}>
            {children}
        </ProductsContext>
    );
}


