import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Course from "../components/Course";
import getAPIData from "../hooks/getApiData";
import postAPIData from "../hooks/postApiData";
import { Upload, XCircle } from "lucide-react";
import Dialog from "../components/Dialog";
import Loader from "../components/Loader/Loader";
import Loader2 from "../components/Loader/Loader2";
import { uploadFile } from "../helper/uploadFile";
import { useDispatch, useSelector } from "react-redux";
import { addCourses, setCourses } from "../redux/courseSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const CoursePage = () => {
  const { courses } = useSelector((store) => store.courses);
  const { user } = useSelector((store) => store.user);
  console.log(user);
  console.log(courses);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({
    name: "",
    desc: "",
    banner: "",
    price: "",
    user: user?.data?.email,
  });
  const { sendData, loading, error } = postAPIData();
  const handleSaveCourse = async () => {
    console.log(courseData);
    if (!courseData.banner || !courseData.name || !courseData.desc) {
      toast.error("All Fields Required!!");
      return;
    }
    const res = await sendData(
      `${import.meta.env.VITE_NODE_API}/course`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
      {
        ...courseData,
      }
    );
    if (res) {
      dispatch(addCourses(res?.data));
      toast.success("Course Added Successfully!");
      setDialogOpen(!dialogOpen);
    }
    if (error) {
      toast.error(error);
    }
  };
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data, getLoading, getError } = getAPIData(
    `${import.meta.env.VITE_NODE_API}/course/user/${user?.data?.id}`
  );
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    if (!getError || !getLoading) {
      console.log(data);
      dispatch(setCourses(data?.data));
    }
  }, [data, getLoading, getError]);
  const handleFileChange = async (e) => {
    console.log("hello");
    const selectedFile = e.target.files[0];
    console.log(selectedFile);
    if (selectedFile) {
      try {
        const imageUrl = await uploadFile(selectedFile);
        console.log(imageUrl);
        setCourseData((prevData) => ({
          ...prevData,
          banner: imageUrl,
        }));
        console.log(imageUrl);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };
  return (
    <Sidebar>
      {getLoading ? (
        <div className="flex items-center justify-center h-full">
          <Loader />
        </div>
      ) : (
        <div className="h-screen">
          <h2 className="text-4xl mb-5">Your Courses</h2>
          <button
            onClick={() => setDialogOpen(!dialogOpen)}
            className="px-4 py-2 bg-blue-600 rounded-md mb-4"
          >
            Add Course
          </button>
          <div className="grid xl:grid-cols-3 grid-cols-1 lg:grid-cols-2 place-items-center sm:place-content-start gap-4">
            {courses?.map((course) => (
              <Course key={course?.id} course={course} />
            ))}
          </div>
          {dialogOpen && (
            <Dialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen}>
              <div className="flex justify-between items-center">
                <h2 className="text-3xl mb-4">Add a Course</h2>
                <XCircle
                  className="cursor-pointer text-red-500"
                  onClick={() => setDialogOpen(!dialogOpen)}
                />
              </div>
              <div className="flex flex-col gap-4 rounded-md">
                <div className="flex items-center justify-center w-full">
                  {courseData.banner && (
                    <img
                      src={courseData.banner}
                      alt="Banner"
                      className="w-full h-64 rounded-lg"
                    />
                  )}
                  {!courseData.banner && (
                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload />
                        <p className="mb-2 text-sm text-gray-500 text-center dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop your banner
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        onChange={handleFileChange}
                        type="file"
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <div className="flex flex-col">
                  <label>Title</label>
                  <input
                    className="px-2 py-2 outline-none rounded-md bg-gray-700"
                    type="text"
                    placeholder="Enter Title of Course"
                    value={courseData.name}
                    onChange={(e) =>
                      setCourseData({ ...courseData, name: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <label>Price</label>
                  <input
                    className="px-2 py-2 outline-none rounded-md bg-gray-700"
                    type="text"
                    placeholder="Enter Price"
                    value={courseData.price}
                    onChange={(e) =>
                      setCourseData({ ...courseData, price: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <label>Description</label>
                  <textarea
                    className="px-2 py-1 outline-none rounded-md bg-gray-700"
                    placeholder="Enter Description Here..."
                    type="text"
                    rows={3}
                    value={courseData.desc}
                    onChange={(e) =>
                      setCourseData({ ...courseData, desc: e.target.value })
                    }
                  />
                </div>
                {error && <p className="text-xs text-red-600">{error}</p>}
                <button
                  disabled={loading}
                  onClick={handleSaveCourse}
                  className="bg-blue-600 px-4 py-2 rounded-md"
                >
                  {loading ? <Loader2 /> : "Save"}
                </button>
              </div>
            </Dialog>
          )}
        </div>
      )}
    </Sidebar>
  );
};

export default CoursePage;
