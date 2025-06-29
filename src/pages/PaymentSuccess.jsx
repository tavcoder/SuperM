import { Link } from "react-router";
import "../styles/PaymentSuccessPage.css";

export default function PaymentSuccess() {
    return (
        <div className="success-wrapper">
            <div className="success-card">
                <div className="success-icon">✔️</div>
                <h1>Payment completed successfully!</h1>
                <p className="success-message">
                    Thank you for your purchase. You will receive an email with the confirmation and shipping details.
                </p>
                <Link to="/products" className="btn btn--level1">Back to store</Link>
            </div>
        </div>
    );
}
