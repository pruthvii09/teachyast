import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

//routes import
import userRoutes from "./routes/user.routes.js";
import courseRoutes from "./routes/course.routes.js";
import lectureRoutes from "./routes/lecture.routes.js";
import studentRoutes from "./routes/student.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import enrollmentRoutes from "./routes/enrollemnts.routes.js";
import serverless from "serverless-http";

//routes declaration
app.use("/users", userRoutes);
app.use("/course", courseRoutes);
app.use("/lectures", lectureRoutes);
app.use("/students", studentRoutes);
app.use("/payments", paymentRoutes);
app.use("/enrollments", enrollmentRoutes);

export { app };
export const handler = serverless(app);
