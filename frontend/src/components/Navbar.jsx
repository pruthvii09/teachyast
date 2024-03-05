import React from "react";
import Logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="fixed z-10 w-full">
      <nav className="bg-transparent border-gray-200">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl py-4 sm:px-12 px-4">
          <a href="/" className="flex items-center gap-2">
            <img src={Logo} className="sm:h-8 h-7" alt="Flowbite Logo" />
            <h1 className="self-center sm:text-3xl text-xl font-semibold whitespace-nowrap dark:text-white">
              Teachyast
            </h1>
          </a>
          <NavLink
            to={"/login"}
            className="text-sm sm:px-4 sm:py-2 py-2 px-2 bg-blue-600 rounded-md text-white"
          >
            Login
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
