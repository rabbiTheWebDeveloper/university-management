import express, { Application } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import router from './app/routers'
const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// api

app.use('/api/v1', router)

app.use(globalErrorHandler)

export default app
