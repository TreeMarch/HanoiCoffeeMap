//custom error class
class AppError extends Error {
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true; // danh dau day la loi "biet truoc ", khong phai bug
        Error.captureStackTrace(this, this.constructor)
    }
}

export default AppError;