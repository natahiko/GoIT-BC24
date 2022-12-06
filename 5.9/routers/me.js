import express from "express";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.get('/', auth, async (req, res, next) => {
    res.json(req.user)
})


export default router
