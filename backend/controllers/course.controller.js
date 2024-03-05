import prisma from "../prisma/prisma.js";

export const createCourse = async (req, res) => {
  try {
    const { name, desc, banner, user, price } = req.body;
    console.log(req.body);
    if ((!name, !desc, !price)) {
      return res
        .status(400)
        .json({ status: "error", error: "All Fields Required" });
    }
    const course = await prisma.course.create({
      data: {
        name,
        desc,
        banner,
        user,
        price: parseInt(price),
      },
    });
    res
      .status(201)
      .json({ status: "success", message: "Course Created", data: course });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
export const getAllCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany();
    res.status(200).json({ status: "success", data: courses });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
export const getCourseByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    const courses = await prisma.course.findMany({
      where: {
        user: user.email,
      },
    });
    res.status(200).json({ status: "success", data: courses });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
export const getCourseById = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await prisma.course.findUnique({
      where: {
        id: id,
      },
    });
    if (!course) {
      return res
        .status(404)
        .json({ status: "error", error: "Course not found" });
    }
    const lectures = await prisma.lecture.findMany({
      where: {
        courseId: id,
      },
    });
    res.status(200).json({ status: "success", data: { course, lectures } });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

// Update a course
export const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { name, teacher, banner } = req.body;
  try {
    const updatedCourse = await prisma.course.update({
      where: {
        id: id,
      },
      data: {
        name,
        teacher,
        banner,
      },
    });
    res.status(200).json({
      status: "success",
      message: "Course updated",
      data: updatedCourse,
    });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

// Delete a course
export const deleteCourse = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.course.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json({ status: "success", message: "Course deleted" });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
