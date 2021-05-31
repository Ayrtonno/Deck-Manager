const requireUserEmailVerified = (req, res, next) => {
  const user = req.user
  if (!user) {
    return res.status(403).json({ 
      message: "Please login first!",
    })
  }
  if (!user.isEmailVerified) {
    return res.status(403).json({ 
      message: "Please verify your email!",
    })
  }
  return next()
}

exports.requireUserEmailVerified = requireUserEmailVerified
