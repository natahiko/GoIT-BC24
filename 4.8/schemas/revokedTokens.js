import { Schema, model } from "mongoose";

const revokedTokens = new Schema({
    token: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
})

const RevokedTokens = model('revokedTokens', revokedTokens)

export default RevokedTokens
