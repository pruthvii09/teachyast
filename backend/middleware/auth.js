import { verifyToken } from "../helper/jwtHelper.js";
import prisma from "../prisma/prisma.js";

export const authorizeTeacher = async (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ status: "error", error: "Unauthorized" });
  }
  if (req.user.type === "teacher") {
    next();
  }
};
export const authorizeStudent = async (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ status: "error", error: "Unauthorized" });
  }
  if (req.user.type === "student") {
    next();
  }
};
export const auth = async (req, res, next) => {
  try {
    const token =
      req?.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      res.status(401).json({ error: "Unauthorized" });
    }
    const decoded = verifyToken(token);

    const user = await prisma.user.findUnique({
      where: {
        id: decoded?._id,
      },
    });
    console.log(user);
    if (!user) {
      res.status(401, "Invalid access Token");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ status: false, error: "Internal Error" });
  }
};
