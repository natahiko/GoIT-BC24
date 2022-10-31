import express from "express";
const router = express.Router()

router.get('/', (req,res) => {
    res.send('<form action="/login" method="POST">\n' +
        '  <label for="email">Email</label>\n' +
        '  <input type="text" name="email" id="email" />\n' +
        '  <label for="password">Пароль</label>\n' +
        '  <input type="password" name="password" id="password" />\n' +
        '  <button type="submit">Увійти</button>\n' +
        '</form>')
})

router.post('/', (req,res) => {
    const email = req.body.email;
    const pass = req.body.password;
    res.send(`<h3>Hello with email ${email}</h3>`)
})

router.get('/out', (req,res) => {
    res.send('Logout')
})

export default router
