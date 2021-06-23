// algoritmo di hashing delle password
const argon2 = require("argon2")
const express = require("express")
const passport = require("passport")
const { constants } = require("../config/constants")

//vvvv crea un nuovo router chiamato auth
const authRouter = express.Router()

const { User } = require("../models/user")

// const { requireUserEmailVerified } = require("../middlewares/requireUserEmailVerified")

authRouter.post("/login", passport.authenticate("local"), (req, res, next) => {
  res.json({ user: req.user })
})

authRouter.post("/sign-up", async (req, res) => {
  try {
    const hash = await argon2.hash(req.body.password)
    const signUp = new User({ ...req.body, password: hash })
    await signUp.save()

    const token = constants.TOTPGenerator.generate(constants.tokenSecret)
    console.log(token)

    res.send(`User Created! Verify your email with the following code: ${token}`)
  } catch (error) {
    console.error(error)
    res.status(500).send("Error")
  }
})

authRouter.get("/verify-email", async (req, res) => {

  try {
    const code = req.query.code;
    const user = req.user;
    //PRIMA succede await user.verifyEmail, e il (code) va nel method dentro /models/user, per poi decidere se andare alla 40 o 42
    await user.verifyEmail(code)
    res.json({ message: "Email successfully verified!" })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

authRouter.get("/user-info", (req, res) => {
  res.json({ user: req.user })
})

authRouter.get("/logout", (req, res) => {
  req.logout();
  res.json({ message: "You have been Logged Out!" })
})

exports.authRouter = authRouter
