import React from "react";
import { Link } from "react-router-dom";
import "./PaymentSuccess.css";

export default function PaymentSuccess() {
    return (
        <div className="success-wrapper">
            <div className="success-card">
                <div className="success-icon">✔️</div>
                <h1>¡Pago realizado con éxito!</h1>
                <p className="success-message">
                    Gracias por tu compra. Recibirás un correo con la confirmación y los detalles del envío.
                </p>
                <Link to="/products" className="btn-return">Volver a la tienda</Link>
            </div>
        </div>
    );
}
