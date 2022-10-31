import express from 'express'
import loginRouter from './routes/login.js'
import usersRouter from './routes/users.js'
import nameChecker from "./middlewares/nameChecker.js";

const app = express()

app.use(express.json())
//allow working with forms
app.use(express.urlencoded({extended: false}))

// use images folder for static site logos
app.use('/images',express.static('./images'))
app.use(express.static('./public'))

app.all('/users', (req, res, next) => {
    console.log(`I'm here ${req.method}`)
    next()
})

app.use('/login', loginRouter)

app.use((req, res, next) => nameChecker(req, res, next))
app.use('/users', usersRouter)


app.get('/health', (req,res) => {
    res.send('ok')
})

app.listen(3000, ()=> {
    console.log('Ready on 3000')
})
