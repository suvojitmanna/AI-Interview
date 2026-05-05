import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js"

dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000

app.get("/", (req, res) => {
    res.json({ message: "Server Started" })
})

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