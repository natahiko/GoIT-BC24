import express from 'express'
import catsRouter from './routers/cats.js'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors({origin: 'http://localhost', methods: 'GET,POST'}))

app.use('/api/v1/cats', catsRouter)

app.listen(3000, () => {console.log('Listen on port 3000')})
