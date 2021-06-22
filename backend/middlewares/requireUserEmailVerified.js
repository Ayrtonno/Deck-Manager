
const requireUserEmailVerified = (req, res, next) => {
  //req.user ci arriva dalla deserialize
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
  //la next serve per dire all'app di continuare
  return next()
}

exports.requireUserEmailVerified = requireUserEmailVerified
