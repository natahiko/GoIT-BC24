import express from "express";
import jwt from 'jsonwebtoken'
import User from "../schemas/user.js";
import { createUser } from "../services/users.js";
import { createError } from "../utils/createError.js";
import RevokedTokens from "../schemas/revokedTokens.js";
import { auth } from "../middlewares/auth.js";
import { loginSchema } from '../schemas/login.js'

const router = express.Router();

router.post('/registration', async (req, res, next) => {
    try{
        const foundUser = await User.findOne({ email: req.body.email }, "password")
        if (foundUser) {
            throw createError(400, "user already registered")
        }
        const user = new User({...req.body, password: undefined})
        await user.setPassword(req.body.password)

        const createdUser = await createUser(user)
        res.json(createdUser)
    } catch (e) {
        console.log('fail on registration')
        next(e)
    }
})

router.post('/login', async (req, res, next) => {
    try {
        const {error} = loginSchema.validate(req.body)
        if(error){
            throw createError(400, error.message)
        }

        const { email, password } = req.body
        const user = await User.findOne({ email }, "password")
        if (!user) {
            throw createError(404, "not found")
        }

        const isValidPassword = await user.checkPassword(password)
        if (!isValidPassword) {
            throw createError(401, 'password incorrect')
        }

        const payload = {
            id: user._id
        }
        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' })
        return res.json({ token })
    } catch (e) {
        next(e)
    }
})

router.get("/logout", auth, async (req, res, next) => {
    const token = req.token
    const userId = req.user.id

    await RevokedTokens.create({token, userId})

    res.send('token revoked')
})

export default router
