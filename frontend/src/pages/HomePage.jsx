import React from "react";
import { MoveRight } from "lucide-react";
const HomePage = () => {
  return (
    <div className="relative h-screen w-screen bg-black">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="absolute left-0 right-0 top-[-10%] bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]"></div>
      <div className="w-screen text-white h-screen flex flex-col gap-4 items-center justify-center px-20">
        <h2 className="text-7xl font-semibold text-center">
          Sell & Market Courses From Your Branded Website
        </h2>
        <div className="text-xl text-gray-500">
          Teachyst enables educators and instructors to host, sell and market
          courses on your custom domain
        </div>
        <div className="flex gap-8 items-center">
          <button className="flex items-center gap-2 px-6 py-3 bg-transparent border border-gray-300 rounded-md">
            Get Started <MoveRight />
          </button>
          <button className="px-6 py-3 bg-blue-600 rounded-md">
            Book Demo
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
