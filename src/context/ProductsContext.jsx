/**
 * Context for managing products state, filters, and search functionality
 * Handles product filtering, sorting, and sidebar state
 */
import { createContext, useState, useTransition } from "react";

export const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
    const [, startTransition] = useTransition();
    const [query, setQuery] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [filters, setFilters] = useState({
        characteristics: {
            eco: false,
            gluten: false,
        },
        categories: {
            fruits: false,
            dairy: false,
            sweeteners: false,
            nuts: false,
            bakery: false,
        },
    });
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const openSidebar = () => setIsSidebarOpen(true);
    const closeSidebar = () => setIsSidebarOpen(false);

    function resetFilters() {
        setFilters({
            characteristics: { eco: false, gluten: false },
            categories: {
                fruits: false,
                dairy: false,
                sweeteners: false,
                nuts: false,
                bakery: false,
            }
        });
    }


    function handleSearchChange(event) {
        startTransition(() => {
            setQuery(event.target.value.trim().toLowerCase());
        });
    }

    return (
        <ProductsContext value={{
            query,
            setQuery,
            sortOption,
            setSortOption,
            filters,
            setFilters,
            resetFilters,
            isSidebarOpen,
            openSidebar,
            closeSidebar,
            handleSearchChange,
        }}>
            {children}
        </ProductsContext>
    );
}


