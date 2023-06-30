import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'

const globalErrorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //   next(err)

  res.status(400).json({
    success: false,
    message: err,
  })
  next()
}
export default globalErrorHandler
