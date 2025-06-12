import { useEffect, useId, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../services/fetcher.jsx";

export default function Login({ onUserLogin }) {
    const emailId = useId();
    const passwordId = useId();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const emailRef = useRef(null);

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    async function handleLogin(event) {
        event.preventDefault();
        setErrorMessage("");

        const formData = new FormData(event.target);
        const email = formData.get("email");
        const password = formData.get("password");

        if (!email || !password) {
            setErrorMessage("Email and password are required.");
            return;
        }

        setLoading(true);
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        setLoading(false);

        if (error) {
            setErrorMessage(error.message ?? "Login failed");
            return;
        }

        // Cargamos datos del usuario desde la tabla users
        const { data: userData, error: userError } = await supabase
            .from("users")
            .select("id, email, is_admin")
            .eq("id", data.user.id)
            .single();

        if (userError) {
            setErrorMessage(userError.message ?? "Failed to fetch user data");
            return;
        }

        onUserLogin(userData);

        if (userData.is_admin) {
            navigate("/admin");
        } else {
            navigate("/profile");
        }
    }

    return (
        <div className="profile-wrapper">
            <title>Login | SuperM</title>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <label className="label" htmlFor={emailId}>
                    Email<span className="required">*</span>:
                </label>
                <input
                    id={emailId}
                    name="email"
                    type="email"
                    className="input"
                    ref={emailRef}
                    autoComplete="email"
                    disabled={loading}
                />
                <label className="label" htmlFor={passwordId}>
                    Password<span className="required">*</span>:
                </label>
                <input
                    id={passwordId}
                    name="password"
                    type="password"
                    className="input"
                    autoComplete="current-password"
                    disabled={loading}
                />
                <p className="login-error">{errorMessage}</p>
                <div className="form-buttons">
                    <input
                        type="submit"
                        value={loading ? "Logging in..." : "Login"}
                        disabled={loading}
                        className="btn"
                    />
                </div>
            </form>
        </div>
    );
}
