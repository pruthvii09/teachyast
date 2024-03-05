import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCourse } from "../redux/courseSlice";
import Dialog from "./Dialog";
import { AlertCircle } from "lucide-react";

const Course = ({ course }) => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [openDialog, setDialogOpen] = useState(false);
  const hanldeDelete = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_NODE_API}/course/${course.id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      console.log(response.data.status);
      toast.success("Deleted Successfully");
      dispatch(deleteCourse(course.id));
    } catch (error) {
      toast.error("An error Occoured");
    }
  };
  return (
    <div className="max-w-xs bg-[#181818] rounded-lg shadow dark:bg-[#181818]">
      <a href="#">
        <img
          loading="lazy"
          className="rounded-t-lg w-full h-[200px]"
          src={course.banner}
          alt=""
        />
      </a>
      <div className="p-5 flex flex-col justify-between">
        <div>
          <div>
            <a href="#">
              <h5 className="mb-2 truncate text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {course.name}
              </h5>
            </a>
            <p className="text-xl font-bold">$ {course.price}</p>
          </div>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {course.desc.substring(0, 100)}....
          </p>
        </div>
        <div className="flex justify-between">
          <Link
            to={`/dashboard/courses/${course?.id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
          >
            Edit Course
          </Link>
          <button
            onClick={() => setDialogOpen(!openDialog)}
            className="px-3 py-2 text-sm bg-red-500 text-white rounded-lg"
          >
            Delete Course
          </button>
        </div>
      </div>
      {openDialog && (
        <Dialog>
          <div className="flex flex-col items-center gap-2">
            <div>
              <AlertCircle size={40} />
            </div>
            <p>Are you sure you want to delete this Course?</p>
            <div className="flex justify-between w-full px-10 mt-4">
              <button
                onClick={hanldeDelete}
                className="px-5 py-2 text-base bg-red-500 rounded-md"
              >
                Yes
              </button>
              <button
                onClick={() => setDialogOpen(!openDialog)}
                className="px-3 py-2  border border-gray-500 rounded-md text-base"
              >
                No, Cancle
              </button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default Course;
