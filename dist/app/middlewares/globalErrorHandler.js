"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError_1 = __importDefault(require("../../errors/handleValidationError"));
const index_1 = __importDefault(require("../../config/index"));
const mongoose_1 = require("mongoose");
const ApiErros_1 = __importDefault(require("../../errors/ApiErros"));
const globalErrorHandler = (err, req, res, next) => {
    //   next(err)
    let statusCode = 5000;
    let message = 'something went worng';
    let errorMessages = [];
    if (err.name === 'ValidationError') {
        const simplifiedError = (0, handleValidationError_1.default)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorMessages = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorMessages;
    }
    else if (err instanceof ApiErros_1.default) {
        statusCode = err.statusCode;
        message = err.message;
        errorMessages = err.message
            ? [
                {
                    path: 'errors',
                    message: err.message,
                },
            ]
            : [];
    }
    else if (err instanceof mongoose_1.Error) {
        message = err === null || err === void 0 ? void 0 : err.message;
        errorMessages = (err === null || err === void 0 ? void 0 : err.message)
            ? [
                {
                    path: '',
                    message: err === null || err === void 0 ? void 0 : err.message,
                },
            ]
            : [];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: index_1.default.env !== 'production' ? err === null || err === void 0 ? void 0 : err.stack : undefined,
    });
    next();
};
exports.default = globalErrorHandler;
