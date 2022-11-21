import jwt from 'jsonwebtoken'

const payload = {
    name: "Natalii"
}
//should be stored in .env
const secret = "kjhhsdhfd"

const token = jwt.sign(payload, secret,  { expiresIn: '1h' })
console.log('token: ',token)

const newToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTmF0YWxpIiwiaWF0IjoxNjY5MDU1MDU0LCJleHAiOjE2NjkwNTg2NTR9.gVkO0C-1Y10ZyxmkzEMg6BLH3Iy0xztyvKyVVb9rBZU"

try {
    const verify = jwt.verify(token, secret)
    console.log('verify:', verify)
} catch (e) {
    console.log(e.message)
}

const decoded = jwt.decode(newToken)
console.log('decoded:', decoded)

