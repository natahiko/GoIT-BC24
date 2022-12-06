import {Schema, model} from "mongoose";
import bcrypt from "bcrypt";
import { emailPattern } from "../utils/regex.js";

//from lecture 3.6
const users = new Schema({
    name: String,
    age: Number,
    email: {
        type: String,
        required: true,
        match: emailPattern,
        unique: true
    },
    status: {
        type: String,
        enum: ['busy', "away", "active"]
    },
    isEmployed: {
        type: Boolean,
        default: false
    },
    additional: {
        music: {
            type: String,
            enum: ['pop', "rock", 'blues']
        },
        cuisine: String,
        favouriteMovie: String
    },
    isDeleted: {
        type: Boolean,
        default: false,
        select: false
    },
    password: {
        type: String,
        select: false
    }
})

users.index({name: 1})

users.methods.setPassword = async function(password) {
    this.password = await bcrypt.hash(password, +process.env.BCRYPT_SALT)
}

users.methods.checkPassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

const User = model('users', users)

export default User
