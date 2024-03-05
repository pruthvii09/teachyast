import express from "express";
import {
  addLecture,
  deleteLecture,
  getAllLectures,
  getLectureById,
  updateLecture,
} from "../controllers/lecture.controller.js";

const router = express.Router();

router.post("/", addLecture);
router.get("/", getAllLectures);
router.get("/:id", getLectureById);
router.patch("/:id", updateLecture);
router.delete("/:id", deleteLecture);

export default router;
