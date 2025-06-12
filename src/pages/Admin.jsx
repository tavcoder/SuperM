import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { get, callApi } from "../services/fetcher.jsx";
import { useState } from "react";

export default function AdminDashboard() {
    const { data: products } = useSuspenseQuery({
        queryKey: ["products"],
        queryFn: () => get("products"),
    });

    const queryClient = useQueryClient();
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        image: "",
        is_ecologic: false,
        has_gluten: false,
    });

    const createProduct = useMutation({
        mutationFn: () => callApi("POST", "products", newProduct),
        onSuccess: () => {
            queryClient.invalidateQueries(["products"]);
            setNewProduct({ name: "", description: "", image: "", is_ecologic: false, has_gluten: false });
        },
    });

    const updateProduct = (id, field, value) =>
        callApi("PATCH", `products?id=eq.${id}`, { [field]: value }).then(() =>
            queryClient.invalidateQueries(["products"])
        );

    const deleteProduct = (id) =>
        callApi("DELETE", `products?id=eq.${id}`).then(() =>
            queryClient.invalidateQueries(["products"])
        );

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>

            <h2>Create new product</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    createProduct.mutate();
                }}
            >
                <input
                    type="text"
                    placeholder="Name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                />
                <label>
                    <input
                        type="checkbox"
                        checked={newProduct.is_ecologic}
                        onChange={(e) => setNewProduct({ ...newProduct, is_ecologic: e.target.checked })}
                    />
                    Ecológico
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={newProduct.has_gluten}
                        onChange={(e) => setNewProduct({ ...newProduct, has_gluten: e.target.checked })}
                    />
                    Contiene gluten
                </label>
                <button type="submit">Crear producto</button>
            </form>

            <h2>Editar / Eliminar productos</h2>
            {products.map((product) => (
                <div key={product.id}>
                    <strong>{product.name}</strong>
                    <label>
                        Ecológico:
                        <input
                            type="checkbox"
                            checked={product.is_ecologic}
                            onChange={(e) => updateProduct(product.id, "is_ecologic", e.target.checked)}
                        />
                    </label>
                    <label>
                        Contiene gluten:
                        <input
                            type="checkbox"
                            checked={product.has_gluten}
                            onChange={(e) => updateProduct(product.id, "has_gluten", e.target.checked)}
                        />
                    </label>
                    <button onClick={() => deleteProduct(product.id)}>Eliminar</button>
                </div>
            ))}
        </div>
    );
}
