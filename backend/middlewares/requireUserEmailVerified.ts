import { Request, Response, NextFunction } from "express"
import { iUser } from "../models/user"
export const requireUserEmailVerified = (req: Request , res: Response, next: NextFunction) => {
  //req.user ci arriva dalla deserialize
  const user = req.user as iUser
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