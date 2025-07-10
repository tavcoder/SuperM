import { useNavigate } from "react-router";
import "../styles/PaymentFailurePage.css";

export default function PaymentFailure() {
    const navigate = useNavigate();

    const handleReturn = () => {
        navigate(-1);
    };

    return (
        <div className="failure-wrapper">
            <div className="failure-card">
                <div className="failure-icon">❌</div>
                <h1>Payment Failed</h1>
                <p className="failure-message">
                    There was a problem processing your payment. Please try again.
                </p>
                <button onClick={handleReturn} className="btn btn--level1">
                    Return to Payment
                </button>
            </div>
        </div>
    );
}
