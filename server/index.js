import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRouter from "./routes/auth.route.js"
import userRouter from "./routes/user.route.js"

dotenv.config()
const app = express()
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())
const PORT = process.env.PORT || 5000

app.get("/", (req, res) => {
    res.json({ message: "Server Started" })
})

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)

// Connect DB first, then start server
connectDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    })
    .catch((err) => {
        console.error("DB connection failed:", err.message)
    })