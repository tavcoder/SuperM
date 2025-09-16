import { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import CookieConsent, { getCookieConsentValue } from "react-cookie-consent";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { ProductsProvider } from "./context/ProductsContext.jsx";

const lazyPages = {
    CookiesPolicyPage: lazy(() => import('./pages/CookiesPolicyPage.jsx')),
    PrivacyPolicyPage: lazy(() => import('./pages/PrivacyPolicyPage.jsx')),
    LandingPage: lazy(() => import('./pages/LandingPage.jsx')),
    LoginPage: lazy(() => import('./pages/LoginPage.jsx')),
    ProfilePage: lazy(() => import('./pages/ProfilePage.jsx')),
    ProductsPage: lazy(() => import('./pages/ProductsPage.jsx')),
    ProductDetailsPage: lazy(() => import('./pages/ProductDetailsPage.jsx')),
    CheckoutPage: lazy(() => import('./pages/CheckoutPage.jsx')),
    StatusPage: lazy(() => import('./pages/StatusPage.jsx')),
};


function App() {
    const [user, setUser] = useState(null);

    /**
     * Handles user login by setting the user state with profile data from localStorage
     * @param {Object} newUser - The user object from authentication
     * @param {string} newUser.username - User's username
     * @param {string} newUser.email - User's email
     */
    function handleUserLogin(newUser) {
        const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
        setUser({ ...newUser, profile });
    }

    /**
     * Handles user logout by clearing the user state
     */
    function handleUserLogout() {
        setUser(null);
    }

    /**
     * Updates the user's profile information in state and localStorage
     * @param {Object} newProfile - The updated profile data
     * @param {string} newProfile.firstName - User's first name
     * @param {string} newProfile.lastName - User's last name
     * @param {string} newProfile.address - User's address
     */
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
                             <Route path="/" element={<lazyPages.LandingPage />} />
                             <Route
                                 path="/login"
                                 element={<lazyPages.LoginPage onUserLogin={handleUserLogin} />}
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
                                         <lazyPages.ProductsPage />
                                     </ProductsProvider>
                                 }
                             />
                             <Route
                                 path="/products/:id"
                                 element={<lazyPages.ProductDetailsPage />}
                             />
                             <Route path="/checkout" element={<lazyPages.CheckoutPage user={user} />} />
                             <Route path="/error" element={<lazyPages.StatusPage type="error" />} />
                             <Route path="/payment-success" element={<lazyPages.StatusPage type="success" />} />
                             <Route path="/profile-success" element={<lazyPages.StatusPage type="success" title="Profile Updated!" message="Your profile has been successfully updated." buttons={[{ text: 'Back to Profile', to: '/profile', className: 'btn--level1' }]} />} />
                             <Route path="*" element={<h1>Page not found</h1>} />
                             <Route path="/cookies-policy" element={<lazyPages.CookiesPolicyPage />} />
                             <Route path="/privacy-policy" element={<lazyPages.PrivacyPolicyPage />} />
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
