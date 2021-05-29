const argon2 = require("argon2")
const passport = require("passport")
const passportLocal = require("passport-local")

const { User } = require("../models/user")

const localStrategy = new passportLocal.Strategy({ usernameField: "email", passwordField: "password" }, async (email, password, done) => {
    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            throw new Error("User not found")
        }

        const isValid = await argon2.verify(user.password, password)
        if (!isValid) {
            throw new Error("Invalid password")
        }

        done(null, user)
    } catch (error) {
        console.error(error)
        done(error, null)
    }
})

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (userId, done) => {
    const user = await User.findById(userId)
    done(null, user)
})

passport.use("local", localStrategy)
//module.localStrategy = localStrategy


//PROSSIMA VOLTA: form di registrazione/login 