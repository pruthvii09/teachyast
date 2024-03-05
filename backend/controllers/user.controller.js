import { createToken } from "../helper/jwtHelper.js";
import prisma from "../prisma/prisma.js";

export const signup = async (req, res) => {
  try {
    const { email, password, type } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: "error", error: "All Fields Required" });
    }
    const exist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (exist) {
      return res
        .status(400)
        .json({ status: "error", error: "Already Registred" });
    }
    const user = await prisma.user.create({
      data: {
        email,
        password,
        type,
      },
    });
    const token = createToken(user.id);
    console.log(token);
    res
      .status(201)
      .json({ status: "success", message: "User Created", data: user, token });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email: email,
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
    res
      .status(200)
      .json({ status: "success", message: "User Logged", data: user, token });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};
