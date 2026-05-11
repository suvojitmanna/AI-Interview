import express from "express";
import { createPayment, verifyPayment } from "../controller/payment.controller.js";
import isAuth from "../middleware/isAuth.js"

const paymentRouter = express.Router();

paymentRouter.post("/order", isAuth, createPayment);
paymentRouter.post("/verify", isAuth, verifyPayment);

export default paymentRouter;