import express from "express";
import { createUser, getUserById, getUsers } from "../services/users.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.get('/', auth, async (req, res, next) => {
    try{
        const search = req.query.search;
        const users = await getUsers(search)
        res.json(users)
    } catch (e) {
        console.log('fail during find users')
        next(e)
    }
})

router.get('/current', auth, async (req, res, next) => {
    res.json(req.user)
})

router.post('/', async (req,res,next) => {
    try{
        const user = req.body;
        const createdUser = await createUser(user)
        res.json(createdUser)
    } catch (e) {
        console.log(e)
        res.status(400).json(e.message)
    }
})

export default router
