import React from "react";

function CookiesPolicy() {
    return (
        <div className="policy-container" style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto", lineHeight: "1.7" }}>
            <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Cookies Policy</h1>
            <p style={{ fontStyle: "italic" }}>Last updated: July 21, 2025</p>

            <p>
                This website uses cookies to enhance your browsing experience, analyze site
                traffic, and offer personalized content. By continuing to use this website, you
                consent to the use of cookies in accordance with this policy.
            </p>

            <h2>1. What are cookies?</h2>
            <p>
                Cookies are small text files that are stored on your device when you visit a
                website. They help us remember your preferences, understand how you interact
                with our content, and improve your user experience.
            </p>

            <h2>2. Types of cookies we use</h2>
            <ul style={{ paddingLeft: "1.5rem" }}>
                <li>
                    <strong>Essential cookies:</strong> Necessary for the website to function
                    properly. They enable basic features like navigation and secure areas.
                </li>
                <li>
                    <strong>Analytics cookies:</strong> Help us understand how visitors use the
                    site, which allows us to improve performance and usability.
                </li>
                <li>
                    <strong>Marketing cookies:</strong> May be set by third parties (e.g., Google
                    Analytics) to deliver relevant ads and measure their effectiveness.
                </li>
            </ul>

            <h2>3. Third-party cookies</h2>
            <p>
                We use trusted third-party services such as Google Analytics to collect
                aggregated data on user engagement. These services may set their own cookies in
                your browser.
            </p>

            <h2>4. How you can control cookies</h2>
            <p>
                You can accept or decline cookies through our cookie banner. You can also
                change or withdraw your consent anytime by clicking “Change cookie preferences”
                in the footer of this site.
            </p>
            <p>
                Additionally, most browsers allow you to manage cookies via browser settings.
                Note that disabling some cookies may affect your site experience.
            </p>

            <h2>5. Contact us</h2>
            <p>
                If you have any questions about this cookie policy, please contact me at{" "}
                <a href="mailto:superm@example.com" style={{ color: "#4a90e2" }}>
                    superm@gmail.com
                </a>.
            </p>
        </div>
    );
}

export default CookiesPolicy;
