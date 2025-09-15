// Reusable status page component for displaying success, error, or info messages with actions
import { useNavigate } from "react-router";
import "../styles/StatusPage.css";

const STATUS_CONFIGS = {
    success: {
        icon: "✔️",
        title: "Payment completed successfully!",
        message: "Thank you for your purchase. You will receive an email with the confirmation and shipping details.",
        buttons: [{ text: "Back to store", to: "/products", className: "btn--level1" }],
    },
    error: {
        icon: "❌",
        title: "Oops!",
        message: "Oops! Something went wrong. Please try again.",
        buttons: [
            { text: "Go Back", action: (navigate) => navigate(-1), className: "btn--level1" },
            { text: "Go to Home", to: "/", className: "btn--level3" },
        ],
    },
    info: {
        icon: "ℹ",
        title: "Information",
        message: "Here's some info.",
        buttons: [{ text: "Go back", to: "/" }],
    },
};

function StatusPage({ type = "info", icon, title, message, buttons }) {
    const navigate = useNavigate();
    const config = STATUS_CONFIGS[type] || STATUS_CONFIGS.info;
    const finalIcon = icon || config.icon;
    const finalTitle = title || config.title;
    const finalMessage = message || config.message;
    const finalButtons = buttons || config.buttons;

    return (
        <div className="status-page">
            <div className={`status-icon ${type}`}>{finalIcon}</div>
            <h1 className="status-page__title">{finalTitle}</h1>
            <p className="status-page__message">{finalMessage}</p>
            <div className="status-page__buttons">
                {finalButtons.map((btn, index) => (
                    <button
                        key={index}
                        className={btn.className || "btn"}
                        onClick={() => {
                            if (btn.action) btn.action(navigate);
                            else if (btn.to) navigate(btn.to);
                        }}
                    >
                        {btn.text}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default StatusPage;