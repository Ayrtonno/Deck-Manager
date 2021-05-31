const argon2 = require("argon2")
const express = require("express")
const passport = require("passport")
const { totp } = require("otplib")

const authRouter = express.Router()

const { User } = require("../models/user")

// const { requireUserEmailVerified } = require("../middlewares/requireUserEmailVerified")

const defaultOptions = totp.allOptions()

const TOTPGenerator = totp.create({
  ...defaultOptions,
  // 1 day in seconds (60 seconds for 60 minutes for 24 hours)
  step: 24 * 60 * 60,
  // 7 days in seconds (60 seconds for 60 minutes for 24 hours for 7 days)
  window: 7 * 24 * 60 * 60,
})

const tokenSecret = "W1gP2Vdkj0cvOkOs"

authRouter.post("/login", passport.authenticate("local"), (req, res, next) => {
  res.json({ user: req.user })
})

authRouter.post("/sign-up", async (req, res) => {
  try {
    const hash = await argon2.hash(req.body.password)
    const signUp = new User({ ...req.body, password: hash })
    await signUp.save()

    const token = TOTPGenerator.generate(tokenSecret)
    console.log(token)

    res.send(`User Created! Verify your email with the following code: ${token}`)
  } catch (error) {
    console.error(error)
    res.status(500).send("Error")
  }
})

authRouter.get("/verify-email", async (req, res) => {
  const code = req.query.code;

  // Put this into User schema with a method named verifyEmail
  // await user.verifyEmail(code)
  // 1. take code
  // 2. verify code
  // 3. if code wrong -> throw error
  // 4. else -> save user.isEmailVerified = true
  // throw error when code is wrong!
  const isValid = TOTPGenerator.check(code, tokenSecret)

  if (isValid) {
    const user = req.user
    user.isEmailVerified = true
    await user.save()
    res.json({ message: "Email successfully verified!" })
  } else {
    res.status(400).json({ message: "Wrong code!" })
  }

  /*
  try {
    const code = req.query.code;
    const user = req.user;
    await user.verifyEmail(code)
    res.json({ message: "Email successfully verified!" })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
  */
})

authRouter.get("/user-info", (req, res) => {
  res.json({ user: req.user })
})

authRouter.get("/logout", (req, res) => {
  req.logout();
  res.send("You have been Logged Out!")
})

exports.authRouter = authRouter
