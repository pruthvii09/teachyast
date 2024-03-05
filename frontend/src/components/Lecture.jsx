import React, { useState } from "react";
import Dialog from "./Dialog";
import { AlertCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteLecture } from "../redux/lectureSlice";
import toast from "react-hot-toast";
import axios from "axios";

const Lecture = ({ lecture }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const hanldeDelete = async () => {
    console.log("hello");
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_NODE_API}/lectures/${lecture.id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      console.log(response.data.status);
      toast.success("Deleted Successfully");
      dispatch(deleteLecture(lecture.id));
    } catch (error) {
      toast.error("An error Occoured");
    }
  };
  return (
    <div className="flex sm:flex-row flex-col gap-4 bg-[#1e1e1e] sm:px-10 px-5 py-5 rounded-md">
      <div className="sm:w-2/5 w-full sm:h-52 h-full">
        <video
          className="w-full h-auto max-w-full border border-gray-200 rounded-lg dark:border-gray-700"
          controls
        >
          <source src={lecture.link} />
        </video>
      </div>
      <div className="sm:w-3/5 w-full h-full justify-between flex flex-col items-start gap-4 ">
        <div>
          <h3 className="text-2xl">{lecture.name}</h3>
          <p className="text-slate-500 text-justify">
            {lecture.desc.substring(0, 250)}
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setDialogOpen(!dialogOpen)}
            className="bg-red-500 px-4 py-2 rounded-md"
          >
            Delete
          </button>
          <button className="px-4 py-2 rounded-md bg-blue-600">Edit</button>
        </div>
      </div>
      {dialogOpen && (
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

export default Lecture;
