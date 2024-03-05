import React from "react";
import Sidebar from "../components/Sidebar";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
const data = [
  { name: "Redis", uv: 400, pv: 2400, amt: 2400 },
  { name: "Docker", uv: 200, pv: 2400, amt: 2400 },
  { name: "Kafka", uv: 345, pv: 2400, amt: 2400 },
  { name: "ReactJs", uv: 98, pv: 2400, amt: 2400 },
  { name: "NodeJs", uv: 235, pv: 2400, amt: 2400 },
];
const Dashboard = () => {
  return (
    <Sidebar>
      <div className="h-screen">
        <h2 className="text-4xl mb-5">Your Dashboard</h2>
        <div className="flex flex-col gap-4">
          <div className="px-10 py-5 bg-[#1e1e1e] rounded-md w-fit">
            <h3 className="text-2xl">Your Total Course</h3>
            <p className="text-3xl font-bold">10</p>
          </div>
          <div className="px-10 py-5 text-white bg-[#1e1e1e] rounded-md w-fit">
            <LineChart
              width={600}
              height={300}
              data={data}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <Line type="monotone" dataKey="uv" stroke="#2563eb" />
              <CartesianGrid stroke="#fff" strokeDasharray="5 5" />
              <XAxis stroke="#ededed" dataKey="name" />
              <YAxis stroke="#ededed" />
            </LineChart>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default Dashboard;
