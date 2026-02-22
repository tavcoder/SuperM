/**
 * Static page outlining data collection and user rights.
 */
import "../styles/CookiesPolicyPage.css";
function PrivacyPolicyPage() {
    return (
        <div className="policy">
            <div className="policy__container">
                <header className="policy__header">
                    <h1 className="policy__title">Privacy Policy</h1>
                    <p className="policy__meta">Last updated: July 21, 2025</p>
                </header>

                <div className="policy__content">
                    <p className="policy__intro">
                        This Privacy Policy describes how we collect, use, and protect your personal
                        data when you visit our website. By using this site, you agree to the terms of
                        this policy.
                    </p>

                    <section className="policy__section">
                        <h2 className="policy__section-title">1. Information we collect</h2>
                        <p>We may collect the following types of data:</p>
                        <ul className="policy__list">
                            <li className="policy__list-item">
                                Personal information you provide (e.g., name, email address, shipping details)
                            </li>
                            <li className="policy__list-item">
                                Order and payment information (if applicable)
                            </li>
                            <li className="policy__list-item">
                                Browsing data (through cookies and analytics tools)
                            </li>
                        </ul>
                    </section>

                    <section className="policy__section">
                        <h2 className="policy__section-title">2. How we use your information</h2>
                        <p>We may use your data to:</p>
                        <ul className="policy__list">
                            <li className="policy__list-item">
                                Process orders and provide services
                            </li>
                            <li className="policy__list-item">
                                Respond to inquiries or support requests
                            </li>
                            <li className="policy__list-item">
                                Improve the website and user experience
                            </li>
                            <li className="policy__list-item">
                                Send updates or marketing emails (only with your consent)
                            </li>
                        </ul>
                    </section>

                    <section className="policy__section">
                        <h2 className="policy__section-title">3. Cookies</h2>
                        <p>
                            Our website uses cookies to analyze traffic and enhance your browsing
                            experience. You can manage your cookie preferences at any time via our cookie
                            banner or browser settings. For more details, see our{" "}
                            <a href="/cookies-policy" className="link">
                                Cookies Policy
                            </a>.
                        </p>
                    </section>

                    <section className="policy__section">
                        <h2 className="policy__section-title">4. Third-party services</h2>
                        <p>
                            We may use third-party tools like Google Analytics to understand user behavior.
                            These services may collect data in accordance with their own privacy policies.
                        </p>
                    </section>

                    <section className="policy__section">
                        <h2 className="policy__section-title">5. Data security</h2>
                        <p>
                            We take reasonable technical and organizational measures to protect your
                            personal data from unauthorized access, disclosure, or destruction.
                        </p>
                    </section>

                    <section className="policy__section">
                        <h2 className="policy__section-title">6. Your rights</h2>
                        <p>You have the right to:</p>
                        <ul className="policy__list">
                            <li className="policy__list-item">
                                Access, update, or delete your personal information
                            </li>
                            <li className="policy__list-item">
                                Withdraw your consent to data processing
                            </li>
                            <li className="policy__list-item">
                                File a complaint with a data protection authority if you believe your rights have been violated
                            </li>
                        </ul>
                    </section>

                    <section className="policy__section">
                        <h2 className="policy__section-title">7. Contact</h2>
                        <p>
                            If you have any questions about this privacy policy, feel free to contact us at{" "}
                            <a
                                href="mailto:superm@gmail.com"
                                className="link"
                                aria-label="Send email to superm@gmail.com"
                            >
                                superm@gmail.com
                            </a>.
                        </p>
                    </section>
                </div>

                <footer className="policy__footer">
                    <a href="/" className="u-btn u-btn--secondary">
                        Back to Home
                    </a>
                </footer>
            </div>
        </div>
    );
}

export default PrivacyPolicyPage;