import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getAPIData from "../hooks/getApiData";
import Lecture from "../components/Lecture";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const SingleCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const { user } = useSelector((store) => store.user);
  const { enrollments } = useSelector((store) => store.enrollments);
  const isEnrolled = enrollments?.some(
    (enrollment) => enrollment?.courseId === id
  );
  console.log("enrolled", isEnrolled);
  const [lectures, setLectures] = useState(null);
  const { data, getLoading, getError } = getAPIData(
    `${import.meta.env.VITE_NODE_API}/course/${id}`
  );
  useEffect(() => {
    if (!getError || !getLoading) {
      console.log(data);
      setCourse(data?.data?.course);
      setLectures(data?.data?.lectures);
      console.log("first", lectures);
    }
  }, [data, getLoading, getError]);
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  async function displayRazorpay() {
    if (!user) {
      return navigate("/login");
    }
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const result = await axios.post(
      `http://localhost:4000/payments/${course.id}`
    );
    console.log(result);
    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: "rzp_test_X5jsEfJrma6w4H", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "Pruthviraj Auti Corp Ltd.",
      description: "Course Purchase",
      // image: { logo },
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
          studentId: user?.data?.id,
          studentEmail: user?.data?.email,
          courseId: id,
        };

        const result = await axios.post(
          "http://localhost:4000/payments/verify",
          data
        );

        alert(result.data.msg);
        window.location.reload();
      },
      notes: {
        address: "Pune",
      },
      theme: {
        color: "#111827",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  //

  return (
    <>
      <img className="w-full h-80 object-cover" src={course?.banner} alt="" />
      <div className="text-white sm:px-20 px-0 mb-4">
        <div className="h-full  text-white">
          <div className="px-4">
            <h2 className="sm:text-5xl text-3xl font-bold mt-4 ">
              {course?.title}
            </h2>
            <div className="flex sm:flex-col flex-col-reverse gap-4">
              <p className="text-lg text-justify text-gray-500">
                {course?.desc}
              </p>
              {!isEnrolled && (
                <button
                  onClick={displayRazorpay}
                  className="px-6 py-2 bg-blue-600 rounded-md"
                >
                  Buy Now
                </button>
              )}
            </div>
            <div className="mt-4">
              <h3 className="text-4xl mb-4">Lectures</h3>
              {isEnrolled ? (
                <div className="flex flex-col gap-4">
                  {lectures?.map((lecture) => (
                    <Lecture key={lecture.id} lecture={lecture} />
                  ))}
                </div>
              ) : (
                <div>Buy The Course to view Lectures</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleCourse;
