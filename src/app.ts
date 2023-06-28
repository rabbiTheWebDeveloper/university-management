import  express, { Application } from  'express' ;
import  cors from'cors'


let  app:Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000)