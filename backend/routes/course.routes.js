import express from "express";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  getCourseByUser,
  updateCourse,
} from "../controllers/course.controller.js";
import { auth, authorizeTeacher } from "../middleware/auth.js";
const router = express.Router();

router.post("/", auth, authorizeTeacher, createCourse);
router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.get("/user/:userId", getCourseByUser);
router.patch("/:id", auth, authorizeTeacher, updateCourse);
router.delete("/:id", auth, authorizeTeacher, deleteCourse);

export default router;
