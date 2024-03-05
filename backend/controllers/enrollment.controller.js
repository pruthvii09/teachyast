import prisma from "../prisma/prisma.js";

export const getEnrollments = async (req, res) => {
  try {
    const enrollments = await prisma.enrollment.findMany();

    res.status(201).json({
      status: "success",
      message: "Enrollments Fetched",
      data: enrollments,
    });
  } catch (error) {
    console.error("Error getting enrollments:", error);
    res.status(500).json({ error: "Internal server Error" });
  }
};
export const getEnrollmentByStudentId = async (req, res) => {
  try {
    const { studentId } = req.params;
    const enrollments = await prisma.enrollment.findMany({
      where: {
        studentId: studentId,
      },
    });
    res.status(201).json({
      status: "success",
      message: "Enrollments Fetched",
      data: enrollments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server Error" });
  }
};
