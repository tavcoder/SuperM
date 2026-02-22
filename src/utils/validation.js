/**
 * Form validation utilities with regex patterns and error messages
 */

// =========================================
// EMAIL & PASSWORD VALIDATORS
// =========================================

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validate password length (min 4 characters)
 * @param {string} password - Password to validate
 * @returns {boolean} True if valid
 */
export function validatePassword(password) {
    return password.trim().length >= 8;
}

// =========================================
// SHIPPING FORM VALIDATORS
// =========================================

/**
 * Validate name (letters, accents, spaces, hyphens)
 * @param {string} name - Name to validate
 * @returns {boolean} True if valid
 */
export function validateName(name) {
    return /^[a-zA-ZÀ-ÿ\s'-]{2,}$/.test(name.trim());
}

export function validateAddress(address) {
    return /^[\w\s.,#-]{5,}$/.test(address.trim());
}

export function validateCity(city) {
    return /^[a-zA-ZÀ-ÿ\s'-]{2,}$/.test(city.trim());
}

export function validateZip(zip) {
    return /^\d{4,10}$/.test(zip.trim());
}

export function validatePhone(phone) {
    return /^[\d\s()+-]{7,}$/.test(phone.trim());
}

export function validateCountry(country) {
    return country && country !== "";
}

// =========================================
// PAYMENT FORM VALIDATORS
// =========================================

/**
 * Validate credit card number (16 digits)
 * @param {string} number - Card number (can include spaces)
 * @returns {boolean} True if valid
 */
export function validateCardNumber(number) {
    return /^\d{16}$/.test(number.replace(/\s/g, ""));
}

export function validateExpiryMonth(month) {
    const m = parseInt(month, 10);
    return m >= 1 && m <= 12;
}

export function validateExpiryYear(year) {
    const y = parseInt(year, 10);
    const currentYear = new Date().getFullYear();
    return y >= currentYear && y <= currentYear + 10;
}

export function validateCvv(cvv) {
    return /^\d{3,4}$/.test(cvv);
}

// =========================================
// VALIDATION ERROR MESSAGES
// =========================================

export const validationMessages = {
    email: "Please enter a valid email address.",
    password: "Password must be at least 8 characters.",
    firstName: "First name must contain only letters and be at least 2 characters.",
    lastName: "Last name must contain only letters and be at least 2 characters.",
    address: "Please enter a valid address (at least 5 characters).",
    city: "Please enter a valid city name.",
    zip: "Please enter a valid zip code.",
    phone: "Please enter a valid phone number.",
    country: "Please select a country.",
    cardName: "Please enter the name on the card.",
    cardNumber: "Card number must be 16 digits.",
    expiry: "Enter a valid expiration date in MM/YY format.",
    cvv: "CVV must be 3 or 4 digits.",
};

// =========================================
// GENERIC FIELD VALIDATOR
// =========================================

/**
 * Map of field names to validator functions
 */
export const validators = {
    email: validateEmail,
    password: validatePassword,
    firstName: validateName,
    lastName: validateName,
    address: validateAddress,
    city: validateCity,
    zip: validateZip,
    phone: validatePhone,
    country: validateCountry,
    cardName: validateName,
    cardNumber: validateCardNumber,
    expiry: (value) => {
        const [month, year] = value.split("/");
        return (
            month &&
            year &&
            validateExpiryMonth(month) &&
            validateExpiryYear("20" + year)
        );
    },
    cvv: validateCvv,
};

/**
 * Validate a form field and return error message if invalid
 * @param {string} name - Field name (must match key in validators object)
 * @param {string} value - Field value to validate
 * @returns {string} Error message if invalid, empty string if valid
 */
export function validateField(name, value) {
    const validator = validators[name];
    if (!validator) return "";
    return validator(value) ? "" : validationMessages[name] || "Invalid field.";
}