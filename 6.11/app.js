import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import userRouter from './routers/users.js'
import authRouter from './routers/auth.js'
import meRouter from './routers/me.js'
import uploadsRouter from './routers/uploads.js'

dotenv.config()

const DB_URI = process.env.DB_URI

const app = express()
app.use(cors())
app.use(express.json())
app.use('/images', express.static('./uploadedImages'))

//ADD ROUTERS HERE
app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/@me', meRouter)
app.use('/api/uploads', uploadsRouter)

app.use((req,res) => {
    res.status(404).send('Please use /api/users')
})

app.use((err, req, res, next) => {
    const {status = 500, message = "Server error"} = err
    res.status(status).json({message: message})
})

mongoose.connect(DB_URI).then(async () => {
    console.log('Mongo connected!')
    app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}`))
}).catch(err => {
    console.log(err)
})
