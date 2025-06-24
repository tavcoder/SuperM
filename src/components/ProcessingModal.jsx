import "../styles/ProcessingModal.css";

export default function ProcessingModal() {
    return (
        <div className="processing-overlay">
            <div className="processing-modal">
                <div className="spinner" />
                <p>Processing your payment...</p>
            </div>
        </div>
    );
}
