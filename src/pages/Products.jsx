import Sidebar from "../components/Sidebar";
import ProductsList from "../components/ProductsList";
import { ProductsProvider } from "../context/ProductsContext";
import "../styles/ProductsPage.css";

export default function Products() {
    return (
        <ProductsProvider>
            <div className="products-container">
                <Sidebar />
                <ProductsList />
            </div>
        </ProductsProvider>
    );
}
