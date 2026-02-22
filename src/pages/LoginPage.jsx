/**
 * Login page managing user authentication with form validation.
 * Redirects to /profile on successful login.
 * @param {Function} onUserLogin - Callback to set the authenticated user in App state
 */

import { useEffect, useId, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { callApi } from "../services/fetcher.js";
import { useFormValidation } from "../hooks/useFormValidation";
import "../styles/LoginPage.css";

export default function Login({ onUserLogin }) {
    const emailId = useId();
    const passwordId = useId();
    const navigate = useNavigate();
    const emailRef = useRef(null);
    const [errorMessage, setErrorMessage] = useState("");
    const {
        form,
        errors,
        touched,
        handleChange,
        handleBlur,
        isFormValid,
    } = useFormValidation({
        email: "",
        password: ""
    });

    const mutation = useMutation({
        mutationFn: (data) => {
            return callApi("users", "post", "rpc/login", {
                u_email: data.email,
                u_password: data.password,
            });
        },
        onError: (error) => {
            if (error.message.includes("400")) {
                setErrorMessage("Email not found in the database. Please check your email or sign up.");
            } else {
                setErrorMessage(error.message);
            }
        },
        onSuccess: (data) => {
            if (data?.message) {
                setErrorMessage(data.message);
                return;
            }
            if (data?.[0]) {
                onUserLogin(data[0]);
                navigate("/profile");
            }
        },
    });

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    const handleLogin = (event) => {
        event.preventDefault();
        setErrorMessage("");

        if (!isFormValid()) return;

        mutation.mutate(form);
    };

    return (
        <div className="login">
            <title>Login | SuperM</title>
            <h1 className="login__title">Login</h1>
            <p className="u-text-dimmed">Login using test@example.com and any password.</p>

            <form onSubmit={handleLogin} className="login__form">
                <div className="u-input-group">
                    <label htmlFor={emailId}>
                        Email<span>*</span>:
                    </label>
                    <input
                        id={emailId}
                        name="email"
                        type="text"
                        autoComplete="email"
                        disabled={mutation.isPending}
                        value={form.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        ref={emailRef}
                    />
                    {touched.email && errors.email && <span className="u-error">{errors.email}</span>}
                </div>

                <div className="u-input-group">
                    <label htmlFor={passwordId}>
                        Password<span>*</span>:
                    </label>
                    <input
                        id={passwordId}
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        disabled={mutation.isPending}
                        value={form.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {touched.password && errors.password && <span className="u-error">{errors.password}</span>}
                </div>

                <p className="u-error">{errorMessage}</p>

                <div className="u-form-buttons">
                    <input
                        type="submit"
                        value="Login"
                        className="u-btn u-btn--primary"
                        disabled={mutation.isPending}
                    />
                </div>
            </form>
        </div>
    );
}
