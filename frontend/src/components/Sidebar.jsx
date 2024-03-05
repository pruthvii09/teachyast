import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { LayoutDashboard, Menu, NotebookPen, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../redux/userSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Sidebar = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleLogout = async () => {
    localStorage.removeItem("user");
    dispatch(logoutUser());
    navigate("/");
  };
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full p-2 text-white bg-black flex sm:hidden items-center justify-end text-end"
      >
        <span className="sr-only">Open sidebar</span>
        <Menu />
      </button>

      <aside
        className={`fixed top-0 sm:left-0 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 ${
          open ? "left-64" : ""
        }`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-[#1e1e1e]">
          <div className="flex items-center gap-4 mb-3">
            <img src={Logo} className="h-10" alt="" />
            <h1 className="text-3xl text-white font-bold">Teachyast</h1>
          </div>
          <ul className="space-y-2 font-medium">
            <li>
              <NavLink
                to={"/dashboard"}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 group"
              >
                <LayoutDashboard />
                <span className="ms-3">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/courses"}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 group"
              >
                <NotebookPen />
                <span className="flex-1 ms-3 whitespace-nowrap">Courses</span>
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to={"/dashboard/blogs"}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <NotebookPen />
                <span className="flex-1 ms-3 whitespace-nowrap">Blog</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <LockKeyhole />
                <span className="flex-1 ms-3 whitespace-nowrap">Passwords</span>
              </NavLink>
            </li> */}
            <li>
              <button
                onClick={handleLogout}
                className="flex w-full text-start items-start p-2 text-gray-900 rounded-lg dark:text-white dark:bg-gray-800 group"
              >
                <LogOut />
                <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
      <div className="p-4 sm:ml-64 h-full bg-black text-white ">{children}</div>
    </div>
  );
};

export default Sidebar;
