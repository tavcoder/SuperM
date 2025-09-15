import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import "../styles/ErrorPage.css";

export default function ErrorPage() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("Oops! Something went wrong. Please try again.");

    useEffect(() => {
        const storedError = localStorage.getItem('apiError');
        if (storedError) {
            setErrorMessage(storedError);
            localStorage.removeItem('apiError'); // Limpiar después de usar
        }
    }, []);

    const handleReturn = () => {
        navigate(-1);
    };

    return (
        <div className="error-wrapper">
            <div className="error-card">
                <div className="error-icon">❌</div>
                <h1>Oops!</h1>
                <p className="error-message">
                    {errorMessage}
                </p>
                <div className="error-buttons">
                    <button onClick={handleReturn} className="btn btn--level1">
                        Go Back
                    </button>
                    <button onClick={() => navigate('/')} className="btn btn--level3">
                        Go to Home
                    </button>
                </div>
            </div>
        </div>
    );
}
