import { useEffect, useId, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { callApi } from "../services/fetcher.jsx";
import { validateField } from "../utils/validation"; 

export default function Login({ onUserLogin }) {
    const emailId = useId();
    const passwordId = useId();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const emailRef = useRef(null);

    const mutation = useMutation({
        mutationFn: (data) => {
            return callApi("users", "post", "rpc/login", {
                u_email: data.email,
                u_password: data.password,
            });
        },
        onError: (error) => {
            console.log(error);
            setErrorMessage(error.message);
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

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));

        if (touched[name]) {
            const errMsg = validateField(name, value);
            setErrors(prev => ({ ...prev, [name]: errMsg }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        const errMsg = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: errMsg }));
    };

    const isFormValid = () => {
        const newErrors = {};
        for (const key in form) {
            const error = validateField(key, form[key]);
            if (error) newErrors[key] = error;
        }
        setErrors(newErrors);
        setTouched(Object.keys(form).reduce((acc, k) => ({ ...acc, [k]: true }), {}));
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = (event) => {
        event.preventDefault();
        setErrorMessage("");

        if (!isFormValid()) return;

        mutation.mutate(form);
    };

    return (
        <div className="profile-wrapper">
            <title>Login | SuperM</title>
            <h1>Login</h1>
            <p className="text-dimmed">Login using test@example.com and any password.</p>

            <form onSubmit={handleLogin}>
                <label className="label" htmlFor={emailId}>
                    Email<span className="required">*</span>:
                </label>
                <input
                    id={emailId}
                    name="email"
                    type="text"
                    className="input"
                    placeholder="Email"
                    autoComplete="email"
                    disabled={mutation.isPending}
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    ref={emailRef}
                />
                {touched.email && errors.email && <span className="error">{errors.email}</span>}

                <label className="label" htmlFor={passwordId}>
                    Password<span className="required">*</span>:
                </label>
                <input
                    id={passwordId}
                    name="password"
                    type="password"
                    className="input"
                    placeholder="Password"
                    autoComplete="current-password"
                    disabled={mutation.isPending}
                    value={form.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {touched.password && errors.password && <span className="error">{errors.password}</span>}

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
