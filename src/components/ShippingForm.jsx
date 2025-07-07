import { useState } from "react";
import CustomSelect from "./CustomSelect";
import "../styles/CheckoutPage.css";

export default function ShippingForm({ onNext }) {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        address: "",
        apt: "",
        city: "",
        country: "",
        state: "",
        zip: "",
        email: "",
        phone: "",
    });

    const countryOptions = [
        { label: "Country", value: "" },
        { label: "USA", value: "USA" },
        { label: "Mexico", value: "Mexico" },
        { label: "Spain", value: "Spain" },
    ];

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <form className="shipping-form" onSubmit={(e) => {
            e.preventDefault();
            onNext(); // proceed to payment
        }}>
            <h2>01. SHIPPING</h2>
            <div className="row">
                <input className="input" name="firstName" placeholder="First name" value={form.firstName} onChange={handleChange} required />
                <input className="input" name="lastName" placeholder="Last name" value={form.lastName} onChange={handleChange} required />
            </div>
            <div className="row">
                <input className="input" name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
                <input className="input" name="apt" placeholder="Apt, suite, etc. (optional)" value={form.apt} onChange={handleChange} />
            </div>
            <div className="row">
                <input className="input" name="city" placeholder="City" value={form.city} onChange={handleChange} required />
                <div className="select-wrapper">
                    <CustomSelect
                        value={form.country}
                        onChange={(newValue) => handleChange({ target: { name: "country", value: newValue } })}
                        options={countryOptions}
                    />
                </div>
            </div>
            <div className="row">
                <input className="input" name="state" placeholder="State" value={form.state} onChange={handleChange} required />
                <input className="input" name="zip" placeholder="Zip Code" value={form.zip} onChange={handleChange} required />
            </div>
            <div className="row">
                <input className="input" name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} required />
                <input className="input" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
            </div>
            <div className="privacy">
                <input className="checkbox" type="checkbox" required />
                <span>Your privacy is important to us. We will only contact you if there is an issue with your order.</span>
            </div>
            <button type="submit" className="btn btn--level1 ">Save & Continue</button>
        </form>
    );
}
