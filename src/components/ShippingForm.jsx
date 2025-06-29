import { useState } from "react";
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
                <input name="firstName" placeholder="First name" value={form.firstName} onChange={handleChange} required />
                <input name="lastName" placeholder="Last name" value={form.lastName} onChange={handleChange} required />
            </div>
            <div className="row">
                <input name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
                <input name="apt" placeholder="Apt, suite, etc. (optional)" value={form.apt} onChange={handleChange} />
            </div>
            <div className="row">
                <input name="city" placeholder="City" value={form.city} onChange={handleChange} required />
                <select name="country" value={form.country} onChange={handleChange} required>
                    <option value="">Country</option>
                    <option value="USA">USA</option>
                    <option value="Mexico">Mexico</option>
                </select>
            </div>
            <div className="row">
                <input name="state" placeholder="State" value={form.state} onChange={handleChange} required />
                <input name="zip" placeholder="Zip Code" value={form.zip} onChange={handleChange} required />
            </div>
            <div className="row">
                <input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} required />
                <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
            </div>
            <div className="privacy">
                <input type="checkbox" required />
                <span>Your privacy is important to us. We will only contact you if there is an issue with your order.</span>
            </div>
            <button type="submit" className="btn btn--level1 ">Save & Continue</button>
        </form>
    );
}
