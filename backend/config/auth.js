const argon2 = require("argon2")
const passport = require("passport")
const passportLocal = require("passport-local")
const { User } = require("../models/user")

const localStrategy = new passportLocal.Strategy({ usernameField: "email", passwordField: "password" }, async (email, password, done) => {
    const user = await User.findOne({ email: email })
    if (!user) {
        done("Wrong Credentials!", null)
    } else {
        if (await argon2.verify(user.password, password)) {
            done(null, user)
        } else {
            done("Wrong Password!", null)
        }
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