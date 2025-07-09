
// Login form
export function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePassword(password) {
    return password.trim().length >= 4;
}

// Shipping form
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

// Payment form
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

// -----------------------------------------
// VALIDATION ERROR MESSAGES
// -----------------------------------------

export const validationMessages = {
    email: "Please enter a valid email address.",
    password: "Password must be at least 4 characters.",
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

// -----------------------------------------
// Generic field validator
// -----------------------------------------

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
    cardName: validateName, // reuse validateName
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

export function validateField(name, value) {
    const validator = validators[name];
    if (!validator) return "";
    return validator(value) ? "" : validationMessages[name] || "Invalid field.";
}
