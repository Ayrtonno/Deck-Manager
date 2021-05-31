const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    isEmailVerified: { type: Boolean, default: false },
}, { timestamps: true })

const User = model("User", userSchema)

exports.User = User
