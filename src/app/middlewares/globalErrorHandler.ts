import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { IGenericErrorMessage } from '../../interface/error'
import handleValidationError from '../../errors/handleValidationError'
import config from '../../config/index'

const globalErrorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //   next(err)

  let statusCode = 5000
  let message = 'something went worng'
  let errorMessages: IGenericErrorMessage[] = []

  if (err.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack:config.env !== 'production' ? err?.stack : undefined,
  })
  next()
}
export default globalErrorHandler
