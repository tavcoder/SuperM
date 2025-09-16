/**
 * Context for managing toast notifications
 * Provides functions to add and remove toast messages with different types
 */
import { createContext, useState, useCallback } from "react";

export const ToastContext = createContext(null);

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = "info", duration = 2000) => {
        const id = Date.now();
        const newToast = { id, message, type };
        setToasts(prev => [...prev, newToast]);

        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, duration);
    }, []);

    return (
        <ToastContext value={{ addToast }}>
            {children}
            <div className="toast-container">
                {toasts.map(toast => (
                    <div key={toast.id} className={`toast ${toast.type}`}>
                        {toast.message}
                    </div>
                ))}
            </div>
        </ToastContext>
    );
}


