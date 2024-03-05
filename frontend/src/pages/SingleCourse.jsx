import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";
import getAPIData from "../hooks/getApiData";
import Dialog from "../components/Dialog";
import { Upload, XCircle } from "lucide-react";
import toast from "react-hot-toast";
import { uploadFile } from "../helper/uploadFile";
import postAPIData from "../hooks/postApiData";
import { addLectures } from "../redux/lectureSlice";
import { useDispatch } from "react-redux";
import Lectures from "../components/Lectures";

const SingleCourse = () => {
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  const [course, setCourse] = useState(null);
  const { data, getLoading, getError } = getAPIData(
    `${import.meta.env.VITE_NODE_API}/course/${id}`
  );
  useEffect(() => {
    if (!getError || !getLoading) {
      console.log(data);
      setCourse(data?.data?.course);
    }
  }, [data, getLoading, getError]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [lectureData, setLectureData] = useState({
    name: "",
    link: "",
    desc: "",
    courseId: id,
  });
  const handleFileChange = async (e) => {
    console.log("hello");
    const selectedFile = e.target.files[0];
    console.log(selectedFile);
    if (selectedFile) {
      try {
        const videoUrl = await uploadFile(selectedFile);
        setLectureData((prevData) => ({
          ...prevData,
          link: videoUrl,
        }));
        console.log(videoUrl);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };
  const { sendData, loading, error } = postAPIData();
  const hanldeUploadLecture = async () => {
    if (!lectureData.name || !lectureData.desc || !lectureData.link) {
      toast.error("All Fields Required!!");
      return;
    }
    console.log(lectureData);
    const res = await sendData(
      `${import.meta.env.VITE_NODE_API}/lectures`,
      null,
      {
        ...lectureData,
      }
    );
    if (res) {
      dispatch(addLectures(res?.data));
      toast.success("Lecture Added Successfully!");
      setDialogOpen(!dialogOpen);
      setLectureData({
        name: "",
        link: "",
        desc: "",
        courseId: id,
      });
    }
    if (error) {
      console.log(error);
    }
  };
  return (
    <Sidebar>
      <div className="h-full bg-black text-white">
        <img className="w-full h-80 object-cover" src={course?.banner} alt="" />
        <div className="px-4">
          <h2 className="sm:text-5xl text-3xl font-bold mt-4 ">
            {course?.name}
          </h2>
          <p className="text-lg text-justify text-gray-500">{course?.desc}</p>
          <div className="mt-4">
            <h3 className="text-4xl">Lectures</h3>
            <div className="mt-4">
              <button
                onClick={() => setDialogOpen(!dialogOpen)}
                className="px-4 py-2 bg-blue-600 rounded-md mb-4"
              >
                Add Lectures
              </button>
            </div>
            <div>
              <Lectures />
            </div>
          </div>
        </div>
      </div>
      {dialogOpen && (
        <Dialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen}>
          <div className="flex justify-between items-center">
            <h2 className="text-3xl mb-4">Add a Lecture</h2>
            <XCircle
              className="cursor-pointer text-red-500"
              onClick={() => setDialogOpen(!dialogOpen)}
            />
          </div>
          <div className="flex flex-col gap-4 rounded-md">
            <div className="flex items-center justify-center w-full">
              {lectureData.link && (
                <video
                  className="w-full h-auto max-w-full border border-gray-200 rounded-lg dark:border-gray-700"
                  controls
                >
                  <source src="https://pruthviportfolioimagebucket.s3.ap-south-1.amazonaws.com/Kafka%20in%20100%20Seconds.mp41709486202958" />
                </video>
              )}
              {!lectureData.link && (
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload />
                    <p className="mb-2 text-sm text-gray-500 text-center dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop your video
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      MP4
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
                placeholder="Enter Title of Lecture"
                value={lectureData.name}
                onChange={(e) =>
                  setLectureData({ ...lectureData, name: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col">
              <label>Description</label>
              <textarea
                className="px-2 py-1 outline-none rounded-md bg-gray-700"
                placeholder="Enter Description Here..."
                type="text"
                value={lectureData.desc}
                onChange={(e) =>
                  setLectureData({ ...lectureData, desc: e.target.value })
                }
              />
            </div>
            <button
              onClick={hanldeUploadLecture}
              className="bg-blue-600 px-4 py-2 rounded-md"
            >
              Add Lecture
            </button>
          </div>
        </Dialog>
      )}
    </Sidebar>
  );
};

export default SingleCourse;
