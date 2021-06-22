// argon2 gestisce l'hashing della password dell'utente
const argon2 = require("argon2")
const passport = require("passport")
// passport local è la strategia di autenticazione locale (ovvero che sto facendo io qui in questo preciso luogo, E' IL LOGIN)
const passportLocal = require("passport-local")

const { User } = require("../models/user")

// la strategy è il modo in cui effettuo il login
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

// passport serialize viene chiamato dopo la login, e dopo essere loggato salva in sessione l'id utente
passport.serializeUser((user, done) => {
    done(null, user.id)
})

//la deserialize dall'id dell'utente che sta nel cookie prendiamo tutte le altre info dell'utente dal database
passport.deserializeUser(async (userId, done) => {
    const user = await User.findById(userId)
    done(null, user)
})

passport.use("local", localStrategy)
//module.localStrategy = localStrategy
