/**
 * Shipping form for collecting delivery address and contact information.
 * Used in checkout flow and profile page — configurable via props.
 * @param {Object|null} user - Authenticated user, used to pre-fill form fields
 * @param {Function} onNext - Callback to advance to the next checkout step
 * @param {Function} onSubmit - Alternative submit callback used in profile page
 * @param {string} buttonText - Label for the submit button. Defaults to "Save & Continue"
 * @param {boolean} showPrivacy - Whether to show the privacy checkbox. Defaults to true
 * @param {boolean} showTitle - Whether to show the form title. Defaults to true
 * @param {boolean} showButton - Whether to show the submit button. Defaults to true
 * @param {React.ReactNode} cancelButton - Optional cancel button rendered next to submit
 */

import CustomSelect from "./CustomSelect";
import { useFormValidation } from "../hooks/useFormValidation";
import "../styles/CheckoutPage.css";

export default function ShippingForm({ user, onNext, onSubmit, buttonText = "Save & Continue", showPrivacy = true, showTitle = true, showButton = true, cancelButton }) {
    const profile = user?.profile || {};
    const {
        form,
        errors,
        touched,
        handleChange,
        handleBlur,
        isFormValid
    } = useFormValidation({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        address: profile.address || "",
        apt: "",
        city: profile.city || "",
        country: "",
        state: "",
        zip: profile.postalCode || "",
        email: user?.email || "",
        phone: ""
    });

    const countryOptions = [
        { label: "Country*", value: "" },
        { label: "USA", value: "USA" },
        { label: "Mexico", value: "Mexico" },
        { label: "Spain", value: "Spain" },
    ];

    /**
     * Handles form submission for shipping information
     * @param {Event} e - The form submit event
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isFormValid()) return;
        if (onSubmit) {
            onSubmit(form);
        } else {
            onNext();
        }
    };

    const handleKeyPressNumeric = (e) => {
        if (!/\d/.test(e.key)) {
            e.preventDefault();
        }
    };

    const handleKeyPressPhone = (e) => {
        if (!/[\d\s()+-]/.test(e.key)) {
            e.preventDefault();
        }
    };

    return (
        <form className="shipping-form" onSubmit={handleSubmit}>
            {showTitle && <h2>01. SHIPPING</h2>}
            <div className="u-row">
                <div className="u-input-group">
                    <input
                        name="firstName"
                        placeholder="First name*"
                        value={form.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    />
                    {touched.firstName && errors.firstName && <span className="u-error">{errors.firstName}</span>}
                </div>
                <div className="u-input-group">
                    <input
                        name="lastName"
                        placeholder="Last name*"
                        value={form.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    />
                    {touched.lastName && errors.lastName && <span className="u-error">{errors.lastName}</span>}
                </div>
            </div>

            <div className="u-row">
                <div className="u-input-group">
                    <input
                        name="address"
                        placeholder="Address*"
                        value={form.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    />
                    {touched.address && errors.address && <span className="u-error">{errors.address}</span>}
                </div>
                <div className="u-input-group">
                    <input
                        name="apt"
                        placeholder="Apt, suite, etc. (optional)"
                        value={form.apt}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="u-row">
                <div className="u-input-group">
                    <input
                        name="city"
                        placeholder="City*"
                        value={form.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    />
                    {touched.city && errors.city && <span className="u-error">{errors.city}</span>}
                </div>
                <div className="u-input-group">
                    <CustomSelect
                        aria-label="Select city"
                        value={form.country}
                        onChange={(newValue) => {
                            handleChange({ target: { name: "country", value: newValue } });
                            handleBlur({ target: { name: "country", value: newValue } });
                        }}
                        options={countryOptions}
                    />
                    {touched.country && errors.country && <span className="u-error">{errors.country}</span>}
                </div>
            </div>

            <div className="u-row">
                <div className="u-input-group">
                    <input
                        name="state"
                        placeholder="State*"
                        value={form.state}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="u-input-group">
                    <input
                        name="zip"
                        placeholder="Zip Code*"
                        value={form.zip}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onKeyPress={handleKeyPressNumeric}
                        required
                    />
                    {touched.zip && errors.zip && <span className="u-error">{errors.zip}</span>}
                </div>
            </div>

            <div className="u-row">
                <div className="u-input-group">
                    <input
                        name="email"
                        type="email"
                        placeholder="Email*"
                        value={form.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    />
                    {touched.email && errors.email && <span className="u-error">{errors.email}</span>}
                </div>
                <div className="u-input-group">
                    <input
                        name="phone"
                        placeholder="Phone*"
                        value={form.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onKeyPress={handleKeyPressPhone}
                        required
                    />
                    {touched.phone && errors.phone && <span className="u-error">{errors.phone}</span>}
                </div>
            </div>

            {showPrivacy && (
                <div className="shipping-form__privacy">
                    <input className="checkbox" type="checkbox" required />
                    <span>Your privacy is important to us. We will only contact you if there is an issue with your order.*</span>
                </div>
            )}

            {showButton && (
                <div className="shipping-form__actions">
                    <button type="submit" className="u-btn u-btn--primary">
                        {buttonText}
                    </button>
                    {cancelButton}
                </div>
            )}
        </form>
    );
}
