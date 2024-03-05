import express from "express";
import {
  createOrder,
  verifyPayment,
} from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/verify", verifyPayment);
router.post("/:courseId", createOrder);

export default router;
