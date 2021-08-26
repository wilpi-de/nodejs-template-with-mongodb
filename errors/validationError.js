class ValidationError extends Error {
    constructor(errors, statusCode) {
        super();

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        this.isOperational = true;

        this.type = "ValidationError";
        this.errors = errors;

        Error.captureStackTrace(this, this.constructor);
    }

    toJSON = () => {
        return {
            status: this.status,
            type: this.type,
            errors: this.errors
        }
    }

}

module.exports = ValidationError;