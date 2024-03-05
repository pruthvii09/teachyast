import React from "react";
import { Link } from "react-router-dom";
import postAPIData from "../hooks/postApiData.js";
import { useState } from "react";
import { setUser } from "../redux/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Loader from "../components/Loader.jsx";
const SignupPage = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const { user } = useSelector((store) => store.user);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sendData, loading, error } = postAPIData();
  const handleSignup = async () => {
    try {
      if (!userData.email || !userData.password) {
        return;
      }

      const res = await sendData(
        `${import.meta.env.VITE_NODE_API}/students/signup`,
        null,
        {
          ...userData,
        }
      );

      if (res) {
        localStorage.setItem("user", JSON.stringify(res));
        console.log(res);
        dispatch(setUser(res));
        navigate("/"); // Assuming `navigate` is available to redirect the user
      }
    } catch (error) {
      // Handle error when API request fails
      console.error("Error signing up:", error);
      toast.error("Failed to sign up. Please try again."); // Display error message to the user
    }
  };
  return (
    <section className="bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h2 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
              Sign in to your account
            </h2>
            <div className="space-y-4 md:space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-white">
                  Your email
                </label>
                <input
                  type="email"
                  className=" border outline-none sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white "
                  placeholder="email@example.com"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className=" border outline-none sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white "
                  value={userData.password}
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                />
              </div>
              <button
                onClick={handleSignup}
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {loading ? <Loader /> : "Signup"}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to={"/login"}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
