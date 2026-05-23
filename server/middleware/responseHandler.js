// Standardized API response handler middleware
export const apiResponse = (req, res, next) => {
    // Attach custom response method
    res.apiSuccess = (data, message = "Success", code = "SUCCESS") => {
        return res.status(200).json({
            status: true,
            code,
            message,
            data,
            timestamp: new Date().toISOString()
        });
    };

    res.apiError = (message = "Error", code = "ERROR", statusCode = 400) => {
        return res.status(statusCode).json({
            status: false,
            code,
            message,
            timestamp: new Date().toISOString()
        });
    };

    res.apiValidationError = (message = "Validation Error", errors = null) => {
        return res.status(400).json({
            status: false,
            code: "VALIDATION_ERROR",
            message,
            errors,
            timestamp: new Date().toISOString()
        });
    };

    res.apiNotFound = (message = "Resource not found") => {
        return res.status(404).json({
            status: false,
            code: "NOT_FOUND",
            message,
            timestamp: new Date().toISOString()
        });
    };

    next();
};

// Error handling middleware
export const errorHandler = (err, req, res, next) => {
    console.error("Error:", err);

    if (err.name === "ValidationError") {
        return res.status(400).json({
            status: false,
            code: "VALIDATION_ERROR",
            message: "Validation failed",
            errors: Object.values(err.errors).map(e => e.message),
            timestamp: new Date().toISOString()
        });
    }

    if (err.name === "CastError") {
        return res.status(400).json({
            status: false,
            code: "INVALID_ID",
            message: "Invalid ID format",
            timestamp: new Date().toISOString()
        });
    }

    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        return res.status(400).json({
            status: false,
            code: "DUPLICATE_ENTRY",
            message: `${field} already exists`,
            timestamp: new Date().toISOString()
        });
    }

    return res.status(err.statusCode || 500).json({
        status: false,
        code: err.code || "INTERNAL_SERVER_ERROR",
        message: err.message || "Internal server error",
        timestamp: new Date().toISOString()
    });
};

// Not found middleware
export const notFound = (req, res) => {
    return res.status(404).json({
        status: false,
        code: "ROUTE_NOT_FOUND",
        message: `Route ${req.method} ${req.path} not found`,
        timestamp: new Date().toISOString()
    });
};
