"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalErrorHandler = (err, req, res, next) => {
    //   next(err)
    res.status(400).json({
        success: false,
        message: err,
    });
    next();
};
exports.default = globalErrorHandler;
