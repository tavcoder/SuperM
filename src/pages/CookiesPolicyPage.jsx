import "../styles/CookiesPolicyPage.css";

// Cookies policy page explaining cookie usage and consent management

function CookiesPolicyPage() {
    return (
        <div className="policy">
            <div className="policy__container">
                <header className="policy__header">
                    <h1 className="policy__title">Cookies Policy</h1>
                    <p className="policy__meta">Last updated: July 21, 2025</p>
                </header>

                <div className="policy__content">
                    <p className="policy__intro">
                        This website uses cookies to enhance your browsing experience, analyze site
                        traffic, and offer personalized content. By continuing to use this website, you
                        consent to the use of cookies in accordance with this policy.
                    </p>

                    <section className="policy__section">
                        <h2 className="policy__section-title">1. What are cookies?</h2>
                        <p>
                            Cookies are small text files that are stored on your device when you visit a
                            website. They help us remember your preferences, understand how you interact
                            with our content, and improve your user experience.
                        </p>
                    </section>

                    <section className="policy__section">
                        <h2 className="policy__section-title">2. Types of cookies we use</h2>
                        <ul className="policy__list">
                            <li className="policy__list-item">
                                <strong>Essential cookies:</strong> Necessary for the website to function
                                properly. They enable basic features like navigation and secure areas.
                            </li>
                            <li className="policy__list-item">
                                <strong>Analytics cookies:</strong> Help us understand how visitors use the
                                site, which allows us to improve performance and usability.
                            </li>
                            <li className="policy__list-item">
                                <strong>Marketing cookies:</strong> May be set by third parties (e.g., Google
                                Analytics) to deliver relevant ads and measure their effectiveness.
                            </li>
                        </ul>
                    </section>

                    <section className="policy__section">
                        <h2 className="policy__section-title">3. Third-party cookies</h2>
                        <p>
                            We use trusted third-party services such as Google Analytics to collect
                            aggregated data on user engagement. These services may set their own cookies in
                            your browser.
                        </p>
                    </section>

                    <section className="policy__section">
                        <h2 className="policy__section-title">4. How you can control cookies</h2>
                        <p>
                            You can accept or decline cookies through our cookie banner. You can also
                            change or withdraw your consent anytime by clicking "Change cookie preferences"
                            in the footer of this site.
                        </p>
                        <p>
                            Additionally, most browsers allow you to manage cookies via browser settings.
                            Note that disabling some cookies may affect your site experience.
                        </p>
                    </section>

                    <section className="policy__section">
                        <h2 className="policy__section-title">5. Contact us</h2>
                        <p>
                            If you have any questions about this cookie policy, please contact us at{" "}
                            <a
                                href="mailto:superm@example.com"
                                className="link"
                                aria-label="Send email to superm@example.com"
                            >
                                superm@example.com
                            </a>.
                        </p>
                    </section>
                </div>

                <footer className="policy__footer">
                    <a href="/" className="btn btn--level2">
                        Back to Home
                    </a>
                </footer>
            </div>
        </div>
    );
}

export default CookiesPolicyPage;