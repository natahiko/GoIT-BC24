
import Joi from 'joi'
import { emailPattern } from "../utils/regex.js";

export const loginSchema = Joi.object( {
    email: Joi.string().pattern(emailPattern).required(),
    password: Joi.any().valid('a', 'b').required()
})
