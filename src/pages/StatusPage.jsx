/**
 * Reusable status page displaying success, error, or info messages with action buttons.
 * Falls back to default icon, title, message and buttons based on type if not provided.
 * @param {string} type - Page variant: "success", "error", or "info". Defaults to "info"
 * @param {string} icon - Optional icon override
 * @param {string} title - Optional title override
 * @param {string} message - Optional message override
 * @param {Array<Object>} buttons - Optional buttons override, each with text, to, and className
 */
import { useNavigate } from "react-router";
import "../styles/StatusPage.css";

const STATUS_CONFIGS = {
    success: {
        icon: "✓",
        title: "Payment completed successfully!",
        message: "Thank you for your purchase. You will receive an email with the confirmation and shipping details.",
        buttons: [
            {
                text: "Back to store",
                to: "/products",
                className: "u-btn u-btn--primary"
            }
        ],
    },
    error: {
        icon: "✕",
        title: "Oops!",
        message: "Oops! Something went wrong. Please try again.",
        buttons: [
            {
                text: "Try Again",
                action: (navigate) => navigate(-1),
                className: "u-btn u-btn--primary"
            },
            {
                text: "Go to Home",
                to: "/",
                className: "u-btn u-btn--secondary"
            },
        ],
    },
    info: {
        icon: "ⓘ",
        title: "Information",
        message: "Here's some important information you should know.",
        buttons: [
            {
                text: "Go Home",
                to: "/",
                className: "u-btn u-btn--primary"
            }
        ],
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
        <div className={`status-page status-page--${type}`}>
           
            <div className={`status-page__icon-container status-page__icon-container--${type}`}>
                <div className={`status-page__icon ${type}`}>
                    {finalIcon}
                </div>
            </div>

            {/* Content */}
            <div className="status-page__content">
                <h1 className="status-page__title">{finalTitle}</h1>
                <p className="status-page__message">{finalMessage}</p>
            </div>

            {/* Buttons */}
            <div className="status-page__actions">
                {finalButtons.map((btn, index) => (
                    <button
                        key={index}
                        className={btn.className || "u-btn u-btn--primary"}
                        onClick={() => {
                            if (btn.action) {
                                btn.action(navigate);
                            } else if (btn.to) {
                                navigate(btn.to);
                            }
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