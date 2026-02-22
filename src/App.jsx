/**
 * Root component that sets up routing, layout, and global state.
 * Manages authenticated user state and passes it down to pages that require it.
 * Loads Google Analytics on mount if cookie consent was previously accepted.
 */

import { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import CookieConsent, { getCookieConsentValue } from "react-cookie-consent";
import Spinner from "./components/Spinner.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ProductsPage from './pages/ProductsPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import { ProductsProvider } from "./context/ProductsContext.jsx";

const lazyPages = {
    CookiesPolicyPage: lazy(() => import('./pages/CookiesPolicyPage.jsx')),
    PrivacyPolicyPage: lazy(() => import('./pages/PrivacyPolicyPage.jsx')),
    LandingPage: lazy(() => import('./pages/LandingPage.jsx')),
    ProfilePage: lazy(() => import('./pages/ProfilePage.jsx')),
    ProductDetailsPage: lazy(() => import('./pages/ProductDetailsPage.jsx')),
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
            const script = document.createElement("script");
            script.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX";
            script.async = true;
            document.body.appendChild(script);

            window.dataLayer = window.dataLayer || [];
            function gtag() { window.dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
        }
    }, []);

    return (
        <>
            <BrowserRouter>
                <div className="layout">
                    <header className="site-header">
                        <div className="u-container">
                            <Navbar user={user} />
                        </div>
                    </header>

                    <div className="layout__content u-container">
                        <Suspense fallback={<Spinner />}>
                            <Routes>
                                <Route path="/" element={<lazyPages.LandingPage />} />
                                <Route
                                    path="/login"
                                    element={<LoginPage onUserLogin={handleUserLogin} />}
                                />
                                <Route
                                    path="/profile"
                                    element={
                                        <lazyPages.ProfilePage
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
                                            <ProductsPage />
                                        </ProductsProvider>
                                    }
                                />
                                <Route
                                    path="/products/:id"
                                    element={<lazyPages.ProductDetailsPage />}
                                />
                                <Route
                                    path="/checkout"
                                    element={<CheckoutPage user={user} />}
                                />
                                <Route path="/error" element={<lazyPages.StatusPage type="error" />} />
                                <Route path="/payment-success" element={<lazyPages.StatusPage type="success" />} />
                                <Route
                                    path="/profile-success"
                                    element={
                                        <lazyPages.StatusPage
                                            type="success"
                                            title="Profile Updated!"
                                            message="Your profile has been successfully updated."
                                            buttons={[{ text: 'Back to Profile', to: '/profile', className: 'u-btn u-btn--primary' }]}
                                        />
                                    }
                                />
                                <Route path="/cookies-policy" element={<lazyPages.CookiesPolicyPage />} />
                                <Route path="/privacy-policy" element={<lazyPages.PrivacyPolicyPage />} />
                                <Route path="*" element={<h1>Page not found</h1>} />
                            </Routes>
                        </Suspense>
                    </div>

                    <footer className="site-footer">
                        <div className="u-container">
                            <Footer />
                        </div>
                    </footer>
                </div>
            </BrowserRouter>

            <CookieConsent
                location="bottom"
                buttonText="Accept"
                declineButtonText="Decline"
                cookieName="cookieConsent"
                className="CookieConsent"
                buttonWrapperClasses="CookieConsent__buttons"
                buttonClasses="u-btn u-btn--primary"
                declineButtonClasses="u-btn u-btn--tertiary"
                expires={365}
                enableDeclineButton
            >
                We use cookies to analyze traffic and improve your experience.{" "}
                <a href="/cookies-policy" className="u-btn--tertiary">Read more</a>
            </CookieConsent>
        </>
    );
}

export default App;