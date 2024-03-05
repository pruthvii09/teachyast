import React from "react";
import { Link } from "react-router-dom";

const Course = ({ course }) => {
  return (
    <div className="max-w-xs  rounded-lg shadow bg-gray-800">
      <a href="#">
        <img
          loading="lazy"
          className="rounded-t-lg h-[200px] w-full"
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
        <Link
          to={`/courses/${course?.id}`}
          className="text-center items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800"
        >
          View Detail
        </Link>
      </div>
    </div>
  );
};

export default Course;
