// Input validation middleware
import validator from 'validator';

export const validateBooking = (req, res, next) => {
    const { firstName, lastName, email, phone, message, category } = req.body;

    // Check required fields
    if (!firstName || !firstName.trim()) {
        return res.status(400).json({ 
            status: false, 
            message: "First name is required",
            code: "MISSING_FIRST_NAME"
        });
    }

    if (!lastName || !lastName.trim()) {
        return res.status(400).json({ 
            status: false, 
            message: "Last name is required",
            code: "MISSING_LAST_NAME"
        });
    }

    if (!email || !email.trim()) {
        return res.status(400).json({ 
            status: false, 
            message: "Email is required",
            code: "MISSING_EMAIL"
        });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
        return res.status(400).json({ 
            status: false, 
            message: "Invalid email format",
            code: "INVALID_EMAIL"
        });
    }

    if (!phone || !phone.trim()) {
        return res.status(400).json({ 
            status: false, 
            message: "Phone number is required",
            code: "MISSING_PHONE"
        });
    }

    // Validate phone format (basic validation)
    if (!/^[\d\s\-\+\(\)]+$/.test(phone) || phone.replace(/\D/g, '').length < 10) {
        return res.status(400).json({ 
            status: false, 
            message: "Invalid phone number format",
            code: "INVALID_PHONE"
        });
    }

    if (!category || !category.trim()) {
        return res.status(400).json({ 
            status: false, 
            message: "Category is required",
            code: "MISSING_CATEGORY"
        });
    }

    // Sanitize inputs
    req.body.firstName = validator.escape(firstName.trim());
    req.body.lastName = validator.escape(lastName.trim());
    req.body.email = validator.normalizeEmail(email);
    req.body.phone = phone.trim();
    req.body.category = validator.escape(category.trim());
    if (message) {
        req.body.message = validator.escape(message.trim());
    }

    next();
};

export const validateContactUs = (req, res, next) => {
    const { phone, email, address } = req.body;

    if (!phone || !phone.trim()) {
        return res.status(400).json({ 
            status: false, 
            message: "Phone is required",
            code: "MISSING_PHONE"
        });
    }

    if (!email || !email.trim()) {
        return res.status(400).json({ 
            status: false, 
            message: "Email is required",
            code: "MISSING_EMAIL"
        });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ 
            status: false, 
            message: "Invalid email format",
            code: "INVALID_EMAIL"
        });
    }

    if (!address || !address.trim()) {
        return res.status(400).json({ 
            status: false, 
            message: "Address is required",
            code: "MISSING_ADDRESS"
        });
    }

    // Sanitize
    req.body.phone = phone.trim();
    req.body.email = validator.normalizeEmail(email);
    req.body.address = validator.escape(address.trim());

    next();
};

export const validateWebpage = (req, res, next) => {
    const { title, content, slug } = req.body;

    if (!title || !title.trim()) {
        return res.status(400).json({ 
            status: false, 
            message: "Title is required",
            code: "MISSING_TITLE"
        });
    }

    if (!slug || !slug.trim()) {
        return res.status(400).json({ 
            status: false, 
            message: "Slug is required",
            code: "MISSING_SLUG"
        });
    }

    // Validate slug format (alphanumeric and hyphens only)
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
        return res.status(400).json({ 
            status: false, 
            message: "Invalid slug format. Use only lowercase letters, numbers, and hyphens",
            code: "INVALID_SLUG"
        });
    }

    // Sanitize
    req.body.title = validator.escape(title.trim());
    req.body.slug = slug.trim().toLowerCase();

    next();
};

export const validateRepairer = (req, res, next) => {
    const { name, email, phone, specialty } = req.body;

    if (!name || !name.trim()) {
        return res.status(400).json({ 
            status: false, 
            message: "Name is required",
            code: "MISSING_NAME"
        });
    }

    if (!email || !email.trim()) {
        return res.status(400).json({ 
            status: false, 
            message: "Email is required",
            code: "MISSING_EMAIL"
        });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ 
            status: false, 
            message: "Invalid email format",
            code: "INVALID_EMAIL"
        });
    }

    // Sanitize
    req.body.name = validator.escape(name.trim());
    req.body.email = validator.normalizeEmail(email);
    if (phone) {
        req.body.phone = phone.trim();
    }
    if (specialty) {
        req.body.specialty = validator.escape(specialty.trim());
    }

    next();
};
