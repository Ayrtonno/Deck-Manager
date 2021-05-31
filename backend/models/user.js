const { Schema, model } = require("mongoose");
const { totp } = require("otplib")
const { constants } = require("../config/constants")

const userSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    isEmailVerified: { type: Boolean, default: false },
}, {
    timestamps: true, toJSON: {
        transform: function (_document, ret) {
            const { password, ...user } = ret
            return user
        }
    }
})

userSchema.methods.verifyEmail = async function (code) {

    const isValid = constants.TOTPGenerator.check(code, constants.tokenSecret)

    if (!isValid) {
        throw new Error("Wrong code!")
    }

    this.isEmailVerified = true
    await this.save()
}

const User = model("User", userSchema)

exports.User = User
