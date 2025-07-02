export function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

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
