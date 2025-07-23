import { useState, useEffect, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import CookieConsent, { getCookieConsentValue } from "react-cookie-consent";
import CookiesPolicy from "./pages/CookiesPolicy.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import { ProductsProvider } from "./context/ProductsContext.jsx";
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

    useEffect(() => {
        const consent = getCookieConsentValue("cookieConsent");
        if (consent === "true") {
            //  Google Analytics
            const script = document.createElement("script");
            script.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"; // <-- tu ID
            script.async = true;
            document.body.appendChild(script);

            window.dataLayer = window.dataLayer || [];
            function gtag() { window.dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
        }
    }, []);

    return (<>
        <BrowserRouter >
            <div className="layout">
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
                                    <ProductsProvider>
                                        <Products />
                                    </ProductsProvider>

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
                        <Route path="/cookies-policy" element={<CookiesPolicy />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </BrowserRouter>
        <CookieConsent
            location="bottom"
            buttonText="Accept"
            declineButtonText="Decline"
            cookieName="cookieConsent"
            className="CookieConsent"
            buttonWrapperClasses="CookieConsent__buttons"
            buttonClasses="btn btn--level1"
            declineButtonClasses="CookieConsent__decline btn btn level1"
            expires={365}
            enableDeclineButton
        >
            We use cookies to analyze traffic and improve your experience.{" "}
            <a href="/cookies-policy" className="btn--level3">
                Read more
            </a>
        </CookieConsent>

    </>);
}

export default App;
