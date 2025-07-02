import { useState, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "./components/Navbar.jsx";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import Products from "./pages/Products.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Checkout from "./pages/Checkout.jsx";
import PaymentFailure from "./pages/PaymentFailure.jsx";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";


function App() {
    const [user, setUser] = useState(null);

    function handleUserLogin(newUser) {
        setUser(newUser);
    }

    function handleUserLogout() {
        setUser(null);
    }

    return (<>
        <BrowserRouter>
            <div className="wrapper-gray">
                <div className="container">
                    <Navbar user={user} />
                </div>
            </div>
            <div className="container page-wrapper">
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route
                        path="/login"
                        element={<Login onUserLogin={handleUserLogin} />}
                    />
                    <Route
                        path="/profile"
                        element={
                            <Profile
                                user={user}
                                onUserLogout={handleUserLogout}
                            />
                        }
                    />
                    <Route
                        path="/products"
                        element={
                            <Suspense
                                fallback={<p className="loading">Loading...</p>}
                            >
                                <Products />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/products/:id"
                        element={
                            <Suspense
                                fallback={<p className="loading">Loading...</p>}
                            >
                                <ProductDetails />
                            </Suspense>
                        }
                    />
                    <Route path="/checkout" element={<Checkout user={user} />} />
                    <Route path="/payment-failure" element={<PaymentFailure />} />
                    <Route path="/payment-success" element={<PaymentSuccess />} />
                    <Route path="*" element={<h1>Page not found</h1>} />
                </Routes>
            </div>
        </BrowserRouter>
    </>);
}

export default App;
