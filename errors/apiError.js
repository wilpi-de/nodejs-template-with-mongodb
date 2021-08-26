class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        this.isOperational = true;

        this.type = "ApiError";

        Error.captureStackTrace(this, this.constructor);
    }

    toJSON = () => {
        return {
            status: this.status,
            type: this.type,
            message: this.message
        }
    }
}

module.exports = ApiError;