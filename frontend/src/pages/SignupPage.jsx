import React, { useState } from "react";
import postAPIData from "../hooks/postApiData";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";
import Loader2 from "../components/Loader/Loader2";

const SignupPage = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    type: "teacher",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sendData, loading, error } = postAPIData();
  const handleLogin = async () => {
    if (!data.email || !data.password) {
      toast.error("All Fields Required");
      return;
    }
    const res = await sendData(
      `${import.meta.env.VITE_NODE_API}/users/signup`,
      null,
      {
        ...data,
      }
    );
    if (res) {
      localStorage.setItem(
        "user",
        JSON.stringify({ data: res.data, token: res.token })
      );
      dispatch(setUser({ data: res.data, token: res.token }));
      navigate("/dashboard");
    }
    if (error) {
      toast.error(error);
    }
  };
  return (
    <div className="h-screen text-white w-screen flex items-center justify-center bg-black">
      <div className="flex flex-col gap-4 bg-gray-900  border border-gray-500 px-10 py-8 rounded-md">
        <div className="flex flex-col">
          <h2 className="text-4xl mb-4">Signup</h2>
          <label>Email</label>
          <input
            className="px-2 py-1 outline-none rounded-md bg-gray-600"
            type="text"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>
        <div className="flex flex-col">
          <label>Password</label>
          <input
            className="px-2 py-1 outline-none rounded-md bg-gray-600"
            type="text"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>
        <p className="text-sm">
          Already have an Account?{" "}
          <Link
            to={"/login"}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Login
          </Link>
        </p>
        <button
          onClick={handleLogin}
          className="bg-blue-600 px-4 py-2 rounded-md flex items-center justify-center"
        >
          {loading ? <Loader2 /> : "Signup"}
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
