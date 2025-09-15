/* eslint-disable react-refresh/only-export-components */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { CartProvider } from "./context/CartContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import App from "./App.jsx";
import "./styles/index.css";
import "./styles/dark-theme.css";
import "./styles/Responsive.css";

function Fallback({ error }) {
    const message = error.message || error || 'Unknown error';
    localStorage.setItem('apiError', message);
    window.location.href = '/error';
    return null; // No renderiza nada, ya que redirige
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: (failureCount, error) => {
                // Don't retry on 4xx errors (client errors)
                if (error?.status >= 400 && error?.status < 500) {
                    return false;
                }
                // Retry up to 3 times for other errors
                return failureCount < 3;
            },
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff, max 30s
            staleTime: 1000 * 60 * 5, // 5 minutes
            gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
            refetchInterval: 10000, // Auto-refresh every 10 seconds
            refetchIntervalInBackground: false, // Only refresh when tab is active
            // Enable network mode to see actual HTTP requests
            networkMode: 'online',
            onError: (error) => {
                if (error.status === 401) {
                    window.location.href = '/login';
                } else {
                    localStorage.setItem('apiError', error.message || 'Unknown error');
                    window.location.href = '/error';
                }
            },
        },
        mutations: {
            retry: 1, // Retry mutations once on failure
            onError: (error) => {
                if (error.status === 401) {
                    window.location.href = '/login';
                } else {
                    localStorage.setItem('apiError', error.message || 'Unknown error');
                    window.location.href = '/error';
                }
            },
        },
    },
});

function AppSetup() {
    return (
        <StrictMode>
            <ErrorBoundary FallbackComponent={Fallback}>
                <QueryClientProvider client={queryClient}>
                    <ToastProvider >
                        <CartProvider>
                                <App />
                        </CartProvider>
                    </ToastProvider>
                </QueryClientProvider>
            </ErrorBoundary>
        </StrictMode>
    );
}

createRoot(document.getElementById("root")).render(<AppSetup />);
