import express from 'express'
import cors from 'cors'

import 'dotenv/config'
import connectDB from './config/mongodb.js'
import userRouter from './Routes/userRoutes.js'
import imageRouter from './Routes/imageRoutes.js'

const PORT = process.env.PORT || 4000

const app = express()

app.use(express.json())
app.use(cors())


await connectDB()

app.use('/api/user',userRouter)
app.use('/api/image', imageRouter)
app.get('/',(req,res)=>res.send("API working"))

app.listen(PORT,()=>console.log("server running on port " + PORT))


// localhost:400/api/user/register
// localhost:400/api/user/login

