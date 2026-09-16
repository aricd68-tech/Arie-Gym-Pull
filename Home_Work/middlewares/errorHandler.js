export const errorHandler = (err, req, res, next) => {
    console.error("Server Error:", err.message);

    const statusCode = err.status || 500;
    res.status(statusCode).json({
        error: err.message || "Internal Server Error"
    });
};