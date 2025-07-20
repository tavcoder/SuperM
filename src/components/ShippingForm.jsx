import CustomSelect from "./CustomSelect";
import { useFormValidation } from "../hooks/useFormValidation";
import "../styles/CheckoutPage.css";

export default function ShippingForm({ onNext }) {
    const {
        form,
        errors,
        touched,
        handleChange,
        handleBlur,
        isFormValid
    } = useFormValidation({
        firstName: "",
        lastName: "",
        address: "",
        apt: "",
        city: "",
        country: "",
        state: "",
        zip: "",
        email: "",
        phone: ""
    });

    const countryOptions = [
        { label: "Country", value: "" },
        { label: "USA", value: "USA" },
        { label: "Mexico", value: "Mexico" },
        { label: "Spain", value: "Spain" },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isFormValid()) return;
        onNext();
    };

    return (
        <form className="shipping-form" onSubmit={handleSubmit}>
            <h2>01. SHIPPING</h2>
            <div className="row">
                <div className="input-group">
                    <input
                        name="firstName"
                        placeholder="First name"
                        value={form.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    />
                    {touched.firstName && errors.firstName && <span className="error">{errors.firstName}</span>}
                </div>
                <div className="input-group">
                    <input
                        name="lastName"
                        placeholder="Last name"
                        value={form.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    />
                    {touched.lastName && errors.lastName && <span className="error">{errors.lastName}</span>}
                </div>
            </div>

            <div className="row">
                <div className="input-group">
                    <input
                        name="address"
                        placeholder="Address"
                        value={form.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    />
                    {touched.address && errors.address && <span className="error">{errors.address}</span>}
                </div>
                <div className="input-group">
                    <input
                        name="apt"
                        placeholder="Apt, suite, etc. (optional)"
                        value={form.apt}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="row">
                <div className="input-group">
                    <input
                        name="city"
                        placeholder="City"
                        value={form.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    />
                    {touched.city && errors.city && <span className="error">{errors.city}</span>}
                </div>
                <div className="input-group">
                    <CustomSelect
                        aria-label="Select city"
                        value={form.country}
                        onChange={(newValue) => {
                            handleChange({ target: { name: "country", value: newValue } });
                            handleBlur({ target: { name: "country", value: newValue } });
                        }}
                        options={countryOptions}
                    />
                    {touched.country && errors.country && <span className="error">{errors.country}</span>}
                </div>
            </div>

            <div className="row">
                <div className="input-group">
                    <input
                        name="state"
                        placeholder="State"
                        value={form.state}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <input
                        name="zip"
                        placeholder="Zip Code"
                        value={form.zip}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    />
                    {touched.zip && errors.zip && <span className="error">{errors.zip}</span>}
                </div>
            </div>

            <div className="row">
                <div className="input-group">
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    />
                    {touched.email && errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className="input-group">
                    <input
                        name="phone"
                        placeholder="Phone"
                        value={form.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                    />
                    {touched.phone && errors.phone && <span className="error">{errors.phone}</span>}
                </div>
            </div>

            <div className="privacy">
                <input className="checkbox" type="checkbox" required />
                <span>Your privacy is important to us. We will only contact you if there is an issue with your order.</span>
            </div>

            <button type="submit" className="btn btn--level1">
                Save & Continue
            </button>
        </form>
    );
}
