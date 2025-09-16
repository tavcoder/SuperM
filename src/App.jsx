import { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import CookieConsent, { getCookieConsentValue } from "react-cookie-consent";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { ProductsProvider } from "./context/ProductsContext.jsx";

const lazyPages = {
    CookiesPolicy: lazy(() => import('./pages/CookiesPolicy.jsx')),
    PrivacyPolicy: lazy(() => import('./pages/PrivacyPolicy.jsx')),
    Landing: lazy(() => import('./pages/Landing.jsx')),
    Login: lazy(() => import('./pages/Login.jsx')),
    Profile: lazy(() => import('./pages/Profile.jsx')),
    Products: lazy(() => import('./pages/Products.jsx')),
    ProductDetails: lazy(() => import('./pages/ProductDetails.jsx')),
    Checkout: lazy(() => import('./pages/Checkout.jsx')),
    StatusPage: lazy(() => import('./pages/StatusPage.jsx')),
};


function App() {
    const [user, setUser] = useState(null);

    function handleUserLogin(newUser) {
        const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
        setUser({ ...newUser, profile });
    }

    function handleUserLogout() {
        setUser(null);
    }

    function handleUpdateProfile(newProfile) {
        setUser(prev => ({ ...prev, profile: newProfile }));
        localStorage.setItem('userProfile', JSON.stringify(newProfile));
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
                    <Suspense fallback={<p className="loading">Loading...</p>}>
                        <Routes>
                            <Route path="/" element={<lazyPages.Landing />} />
                            <Route
                                path="/login"
                                element={<lazyPages.Login onUserLogin={handleUserLogin} />}
                            />
                            <Route
                                path="/profile"
                                element={
                                    <lazyPages.Profile
                                        user={user}
                                        onUserLogout={handleUserLogout}
                                        onUpdateProfile={handleUpdateProfile}
                                    />
                                }
                            />
                            <Route
                                path="/products"
                                element={
                                    <ProductsProvider>
                                        <lazyPages.Products />
                                    </ProductsProvider>
                                }
                            />
                            <Route
                                path="/products/:id"
                                element={<lazyPages.ProductDetails />}
                            />
                             <Route path="/checkout" element={<lazyPages.Checkout user={user} />} />
                             <Route path="/error" element={<lazyPages.StatusPage type="error" />} />
                             <Route path="/payment-success" element={<lazyPages.StatusPage type="success" />} />
                             <Route path="/profile-success" element={<lazyPages.StatusPage type="success" title="Profile Updated!" message="Your profile has been successfully updated." buttons={[{ text: 'Back to Profile', to: '/profile', className: 'btn--level1' }]} />} />
                            <Route path="*" element={<h1>Page not found</h1>} />
                            <Route path="/cookies-policy" element={<lazyPages.CookiesPolicy />} />
                            <Route path="/privacy-policy" element={<lazyPages.PrivacyPolicy />} />
                        </Routes>
                    </Suspense>
                </div>
                <div className="wrapper-gray">
                    <div className="container">
                        <Footer />
                    </div>
                </div>
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
