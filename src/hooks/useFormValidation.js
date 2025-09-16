/**
 * Custom hook to handle form state and validation.
 * @param {Object} initialValues - An object with the initial field values.
 */
import { useState } from "react";
import { validateField } from "../utils/validation";

export function useFormValidation(initialValues = {}) {
    const [form, setForm] = useState(initialValues);
    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({});

    /**
     * Handles input change events, updating form state and validating if field was touched
     * @param {Event} e - The input change event
     */
    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm(prev => ({ ...prev, [name]: value }));

        if (touched[name]) {
            const error = validateField(name, value);
            setErrors(prev => ({ ...prev, [name]: error }));
        }
    };

    /**
     * Handles input blur events, marking field as touched and validating
     * @param {Event} e - The input blur event
     */
    const handleBlur = (e) => {
        const { name, value } = e.target;

        setTouched(prev => ({ ...prev, [name]: true }));

        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    /**
     * Validates the entire form and returns whether it's valid
     * @returns {boolean} True if form is valid, false otherwise
     */
    const isFormValid = () => {
        const newErrors = {};
        for (const key in form) {
            const error = validateField(key, form[key]);
            if (error) newErrors[key] = error;
        }
        setErrors(newErrors);
        setTouched(Object.keys(form).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
        return Object.keys(newErrors).length === 0;
    };

   
    return {
        form,
        setForm,
        errors,
        touched,
        handleChange,
        handleBlur,
        isFormValid,
    }
}