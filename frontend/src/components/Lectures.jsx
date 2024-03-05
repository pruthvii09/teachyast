import React, { useEffect, useState } from "react";
import getAPIData from "../hooks/getApiData";
import { setLectures } from "../redux/lectureSlice";
import { useDispatch, useSelector } from "react-redux";
import Lecture from "./Lecture";
import { useNavigate, useParams } from "react-router-dom";

const Lectures = () => {
  const { id } = useParams();
  const { lectures } = useSelector((store) => store.lectures);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, getLoading, getError } = getAPIData(
    `${import.meta.env.VITE_NODE_API}/course/${id}`
  );
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    if (!getError || !getLoading) {
      dispatch(setLectures(data?.data?.lectures));
    }
  }, [data, getLoading, getError]);
  return (
    <div className="flex flex-col gap-4">
      {lectures?.map((lecture) => (
        <Lecture key={lecture.id} lecture={lecture} />
      ))}
    </div>
  );
};

export default Lectures;
