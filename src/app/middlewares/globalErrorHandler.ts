import { ErrorRequestHandler } from 'express'
import { IGenericErrorMessage } from '../../interface/error'
import handleValidationError from '../../errors/handleValidationError'
import config from '../../config/index'
import { Error } from 'mongoose'
import ApiError from '../../errors/ApiError'
import handleZodError from '../../errors/handleZodError'
import { ZodError } from 'zod'

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  //   next(err)

  let statusCode = 5000
  let message = 'something went worng'
  let errorMessages: IGenericErrorMessage[] = []

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorMessages = simplifiedError?.errorMessages
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error?.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  })
  next()
}
export default globalErrorHandler
