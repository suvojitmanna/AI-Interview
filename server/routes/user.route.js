import express from "express"
import isAuth from "../middleware/isAuth.js"
import { getCurrentUser } from "../controller/user.controller.js"
import { logout } from "../controller/auth.controller.js"

const userRouter = express.Router()

userRouter.get("/current-user", isAuth,getCurrentUser)
userRouter.get("/logout", logout)



export default userRouter