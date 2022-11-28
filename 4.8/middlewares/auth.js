import { createError } from "../utils/createError.js";
import jwt from 'jsonwebtoken'
import User from "../schemas/user.js";
import RevokedTokens from "../schemas/revokedTokens.js";

export const auth = async (req, _, next) => {
    try {
        const { authorization = "" } = req.headers;
        const [bearer, token] = authorization.split(' ');
        if (bearer !== "Bearer") {
            throw createError(401, 'not a bearer token')
        }

        const data = jwt.verify(token, process.env.SECRET_KEY)

        req.token = token
        const user = await User.findById(data.id)
        if(!user) {
            throw createError(404)
        }
        req.user = user;

        const revokedToken = await RevokedTokens.findOne({token})
        if(revokedToken) {
            throw createError(401)
        }

        next()
    } catch (e) {
        next(createError(401, e.message))
    }
}
