import { createToken } from "../helper/jwtHelper.js";
import prisma from "../prisma/prisma.js";

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: "error", error: "All Fields Required" });
    }
    // Check if the user already exists
    const existingUser = await prisma.student.findUnique({
      where: {
        email: email,
      },
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: "error", error: "Email Already Registered" });
    }
    // Create a new student
    const newUser = await prisma.student.create({
      data: {
        email,
        password,
      },
    });
    const enrollments = await prisma.enrollment.findMany({
      where: {
        studentEmail: email,
      },
    });

    // Generate token for authentication
    const token = createToken(newUser.id);

    // Respond with success message and user data
    res.status(201).json({
      status: "success",
      message: "Student Created",
      data: newUser,
      enrollments: enrollments,
      token: token,
    });
  } catch (error) {
    // Handle server errors
    res.status(500).json({ status: "error", error: error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.student.findUnique({
      where: {
        email: email,
      },
    });
    const enrollments = await prisma.enrollment.findMany({
      where: {
        studentEmail: email,
      },
    });
    if (!user) {
      return res
        .status(400)
        .json({ status: "error", error: "Please Enter Correct Email Id" });
    }
    const match = user.password === password;
    if (!match) {
      return res
        .status(400)
        .json({ status: "error", error: "Please Enter Correct Password" });
    }
    const token = createToken(user.id);
    res.status(200).json({
      status: "success",
      message: "User Logged",
      data: user,
      enrollments: enrollments,
      token,
    });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
