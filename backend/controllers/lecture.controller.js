import prisma from "../prisma/prisma.js";

// Create a new lecture
export const addLecture = async (req, res) => {
  try {
    const { name, link, desc, courseId } = req.body;
    if (!name || !link || !desc || !courseId) {
      return res
        .status(400)
        .json({ status: "error", error: "All Fields Required" });
    }
    const lecture = await prisma.lecture.create({
      data: {
        name,
        link,
        desc,
        courseId,
      },
    });
    res
      .status(201)
      .json({ status: "success", message: "Lecture Created", data: lecture });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

// Get all lectures
export const getAllLectures = async (req, res) => {
  try {
    const lectures = await prisma.lecture.findMany();
    res.status(200).json({ status: "success", data: lectures });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

// Get a single lecture by ID
export const getLectureById = async (req, res) => {
  const { id } = req.params;
  try {
    const lecture = await prisma.lecture.findUnique({
      where: {
        id: id,
      },
    });
    if (!lecture) {
      return res
        .status(404)
        .json({ status: "error", error: "Lecture not found" });
    }
    res.status(200).json({ status: "success", data: lecture });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

// Update a lecture
export const updateLecture = async (req, res) => {
  const { id } = req.params;
  const { name, link, desc, courseId } = req.body;
  try {
    const updatedLecture = await prisma.lecture.update({
      where: {
        id: id,
      },
      data: {
        name,
        link,
        desc,
        courseId,
      },
    });
    res.status(200).json({
      status: "success",
      message: "Lecture updated",
      data: updatedLecture,
    });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

// Delete a lecture
export const deleteLecture = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.lecture.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({ status: "success", message: "Lecture deleted" });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
