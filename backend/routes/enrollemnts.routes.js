import express from "express";
import {
  getEnrollmentByStudentId,
  getEnrollments,
} from "../controllers/enrollment.controller.js";

const router = express.Router();

router.get("/", getEnrollments);
router.get("/:studentId", getEnrollmentByStudentId);

export default router;
