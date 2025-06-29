import { Link } from "react-router";
import "../styles/PaymentFailurePage.css";

export default function PaymentFailure() {
    return (
        <div className="failure-wrapper">
            <div className="failure-card">
                <div className="failure-icon">❌</div>
                <h1> Payment Failed</h1>
                <p className="failure-message">
                    There was a problem processing your payment. Please try again.
                </p>
                <Link to="/checkout" className="btn btn--level1">Return to Cart</Link>
            </div>
        </div>
    );
}
