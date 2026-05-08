import express from "express"
import isAuth from "../middleware/isAuth.js"
import { analyzeResume, finishInterview, generateQuestion, submitAnswer } from "../controller/interview.controller.js"
import { upload } from "../middleware/multer.js"

const interviewRoute = express.Router()

interviewRoute.post("/resume", isAuth, upload.single("resume"), analyzeResume)
interviewRoute.post("/generate-questions", isAuth, generateQuestion)
interviewRoute.post("/submit-answer", isAuth, submitAnswer)
interviewRoute.post("/finish", isAuth, finishInterview)



export default interviewRoute