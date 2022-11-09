import {Schema, model} from "mongoose";

const users = new Schema({
    name: String,
    age: Number,
    email: {
        type: String,
        required: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
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
    }
})

users.index({name: 1})

const User = model('users', users)

export default User
