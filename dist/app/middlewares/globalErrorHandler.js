"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError_1 = __importDefault(require("../../errors/handleValidationError"));
const globalErrorHandler = (err, req, res, next) => {
    //   next(err)
    let statusCode = 5000;
    let message = 'something went worng';
    let errorMessages = [];
    if (err.name === 'ValidationError') {
        const simplifiedError = (0, handleValidationError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
    });
    next();
};
exports.default = globalErrorHandler;
