import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { IGenericErrorMessage } from '../../interface/error'
import handleValidationError from '../../errors/handleValidationError'
import config from '../../config/index'
import { Error } from 'mongoose'
import ApiError from '../../errors/ApiErros'

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
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorMessages = simplifiedError?.errorMessages


  }
  else if (err instanceof ApiError) {
    statusCode= err.statusCode;
    message= err.message;
    errorMessages=err.message ?
    [{
      path: 'errors',
      message:err.message,
    }]: []

  }
  else if(err instanceof Error){
    message=err?.message
    errorMessages=err?.message ?
    [
      {
        path:"" ,
        message: err?.message,
      }
    ] : []

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
