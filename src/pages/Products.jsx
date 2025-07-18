import { useContext } from "react";
import Sidebar from "../components/Sidebar";
import ProductsList from "../components/ProductsList";
import { ProductsContext } from "../context/ProductsContext";
import "../styles/ProductsPage.css";

export default function Products() {
    const { isSidebarOpen, closeSidebar, openSidebar } = useContext(ProductsContext);
    return (
        
            <div className="products-container">
                <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
                <ProductsList openSidebar={openSidebar} />
            </div>
        
    );
}
