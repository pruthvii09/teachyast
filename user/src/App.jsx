import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import SingleCourse from "./pages/SingleCourse";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { setEnrollment } from "./redux/enrollmentsSlice";
function App() {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_NODE_API}/enrollments/${user?.data?.id}`
        );
        console.log(response);
        const data = response.data;
        console.log("first", data);
        console.log(data?.data);
        dispatch(setEnrollment(data?.data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (user) {
      fetchData();
    }
  }, []);
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/courses/:id" element={<SingleCourse />} />
      </Routes>
      <Toaster />
    </div>
  );
}
export default App;
