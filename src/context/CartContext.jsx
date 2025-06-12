import { useState, useEffect,useContext, createContext } from "react";
import { ToastContext } from './ToastContext';

export const CartContext = createContext(null);

export function CartProvider({ children }) {
    const { addToast } = useContext(ToastContext);
    const [cart, setCart] = useState(() => {
        const stored = localStorage.getItem('cart');
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);


    const cartCount = cart.reduce(
        (total, product) => total + product.quantity,
        0
    );
    const cartSum = cart.reduce(
        (total, product) => total + product.final_price * product.quantity,
        0
    );

    function handleAddProduct(newProduct) {
        const found = cart.find(product => String(product.id) === String(newProduct.id));

        if (found) {
            const updatedCart = cart.map(product =>
                String(product.id) === String(newProduct.id)
                    ? { ...product, quantity: product.quantity + 1 }
                    : product
            );
            setCart(updatedCart);
            addToast(`"${newProduct.name}" added to cart`, "success");
        } else {
            setCart([...cart, { ...newProduct, quantity: 1 }]);
            addToast(`"${newProduct.name}" added to cart`, "success"); 
        }
    }


    function handleRemoveProduct(product) {
        const cartProduct = cart.find(p => String(p.id) === String(product.id));

        if (!cartProduct) return;

        if (cartProduct.quantity > 1) {
            const updatedCart = cart.map((p) => {
                if (String(p.id) === String(product.id)) {
                    return { ...p, quantity: p.quantity - 1 };
                }
                return p;
            });
            setCart(updatedCart);
            addToast(`"${product.name}" removed from cart`, "warn");
        } else {
            const updatedCart = cart.filter(p => String(p.id) !== String(product.id));
            setCart(updatedCart);
            addToast(`"${product.name}" removed from cart`, "warn");
        }
    }



    return (
        <CartContext
            value={{
                cart,
                cartCount,
                cartSum,
                handleAddProduct,
                handleRemoveProduct,
            }}
        >
            {children}
        </CartContext>
    );
}
