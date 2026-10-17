/**
 * Form validation utilities
 */

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePhone = (phone) => {
    // Remove all non-digit characters
    const digits = phone.replace(/\D/g, '');
    // Check if at least 10 digits
    return digits.length >= 10;
};

export const validatePhoneFormat = (phone) => {
    // More lenient - allows various formats
    return /^[\d\s\-\+\(\)]{10,}$/.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

export const validateURL = (url) => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

export const validateSlug = (slug) => {
    // Only lowercase letters, numbers, and hyphens
    return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
};

export const getFieldError = (errors, fieldName) => {
    return errors[fieldName]?.message || '';
};

export const sanitizeInput = (input) => {
    if (typeof input !== 'string') return input;
    // Remove HTML tags and trim
    return input.replace(/<[^>]*>/g, '').trim();
};

export const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const formatPhoneNumber = (phone) => {
    const digits = phone.replace(/\D/g, '');
    if (digits.length === 10) {
        return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    }
    if (digits.length >= 11) {
        return `+${digits.slice(0, -10)} (${digits.slice(-10, -7)}) ${digits.slice(-7, -4)}-${digits.slice(-4)}`;
    }
    return phone;
};
