/**
 * Displays products page component combining sidebar filters and product list display.
 * Fetches product data via React Query using the id from URL params.
 * Reads isSidebarOpen, closeSidebar and openSidebar from ProductsContext — no props required.
 */
import { useContext, Suspense } from "react";
import Sidebar from "../components/Sidebar";
import ProductsList from "../components/ProductsList";
import ProductsListSkeleton from "../components/ProductsListSkeleton"
import { ProductsContext } from "../context/ProductsContext";
import "../styles/ProductsPage.css";

export default function Products() {
    const { isSidebarOpen, closeSidebar, openSidebar } = useContext(ProductsContext);
    return (

        <div className="products-container">
            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
            <Suspense fallback={<ProductsListSkeleton />}>
                <ProductsList openSidebar={openSidebar} />
            </Suspense>
        </div >

    );
}
