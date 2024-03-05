import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import CoursePage from "./pages/CoursePage";
import { Toaster } from "react-hot-toast";
import SingleCourse from "./pages/SingleCourse";
import SignupPage from "./pages/SignupPage";

function App() {
  const location = useLocation();
  return (
    <div>
      {!(
        location.pathname.startsWith("/dashboard/courses/") ||
        location.pathname.startsWith("/dashboard")
      ) && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/courses" element={<CoursePage />} />
        <Route path="/dashboard/courses/:id" element={<SingleCourse />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
