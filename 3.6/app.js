import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import userRouter from './api/users.js'

dotenv.config()

const DB_URI = process.env.DB_URI

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/users', userRouter)

app.use((req,res) => {
    res.status(404).send('Please use /api/users')
})

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({message: err.message})
})

mongoose.connect(DB_URI).then(async () => {
    console.log('Mongo connected!')
    app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}`))
}).catch(err => {
    console.log(err)
})
