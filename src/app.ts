import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import userRouter from './app/modules/user/user.route'
const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// api 

app.use("/api/v1/user" , userRouter)

//Testing
app.get('/', (req: Request, res: Response) => {
  res.send('Working Successfully')
})

export default app
