const { Schema, model } = require("mongoose");
const { totp } = require("otplib")
const { constants } = require("../config/constants")

const userSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    address: { type: String },
    city: { type: String },
    nation: { type: String },
    //phoneNumber è una stringa nel caso in cui ci sia il codice del paese (es. +39)
    phoneNumber: { type: String },
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
