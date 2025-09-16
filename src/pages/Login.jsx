// Login page component for user authentication with form validation
import { useEffect, useId, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { callApi } from "../services/fetcher.jsx";
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
            console.log(error);
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
        <div className="login-wrapper">
            <title>Login | SuperM</title>
            <h1>Login</h1>
            <p className="text-dimmed">Login using test@example.com and any password.</p>

            <form onSubmit={handleLogin}>
                <div className="input-group">
                    <label className="label" htmlFor={emailId}>
                        Email<span className="required">*</span>:
                    </label>
                    <input
                        id={emailId}
                        name="email"
                        type="text"
                        className="input"
                        autoComplete="email"
                        disabled={mutation.isPending}
                        value={form.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        ref={emailRef}
                    />
                    {touched.email && errors.email && <span className="error">{errors.email}</span>}
                </div>

                <div className="input-group">
                    <label className="label" htmlFor={passwordId}>
                        Password<span className="required">*</span>:
                    </label>
                    <input
                        id={passwordId}
                        name="password"
                        type="password"
                        className="input"
                        autoComplete="current-password"
                        disabled={mutation.isPending}
                        value={form.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {touched.password && errors.password && <span className="error">{errors.password}</span>}
                </div>

                <p className="error">{errorMessage}</p>

                <div className="form-buttons">
                    <input
                        type="submit"
                        value="Login"
                        className="btn btn--level1"
                        disabled={mutation.isPending}
                    />
                </div>
            </form>
        </div>
    );
}
