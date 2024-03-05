import React from "react";

const Lecture = ({ lecture }) => {
  return (
    <div>
      <div className="flex sm:flex-row flex-col gap-4 bg-gray-800 sm:px-10 px-5 py-5 rounded-md">
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
        </div>
      </div>
    </div>
  );
};

export default Lecture;
