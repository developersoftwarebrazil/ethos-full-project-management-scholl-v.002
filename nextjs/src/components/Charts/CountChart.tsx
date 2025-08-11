"use client";

import { count } from "console";
import Image from "next/image";
import { Cell, Pie, PieChart } from "recharts";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CountChart = ({
  boys,
  girls,
}: {
  boys: string;
  girls: string;
}) => {
  const data = [
    {
      name: "Boys",
      value: boys,
      count: 55,
      fill: "#C3EBFA",
    },
    {
      name: "Girls",
      value: girls,
      count: 45,
      fill: "#FAE27C",
    },
    {
      name: "Total",
      count: 55 + 45,
      fill: "white",
      // fill: "#F5F5F5",
    },
  ];
  return (
    <div className="w-full h-full bg-white rounded-xl p-4">
      {/* TITLE */}
      <div className="flex justify-between items-start">
        <h1 className="text-lg font-semibold">Student</h1>
        <Image
          src="/moreDark.png"
          alt="people icon"
          width={24}
          height={24}
          className="ml-2"
        />
      </div>
      {/* CHART */}
      <div className="w-full h-[75%] relative">
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={32}
            data={data}
          >
            <RadialBar             
              background
              dataKey="count"
            />
           
          </RadialBarChart>
        </ResponsiveContainer>
        <Image
          src="/maleFemale.png"
          alt=""
          height={50}
          width={50}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />

        {/* <ResponsiveContainer >
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              stroke="#fff"
              strokeWidth={2}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer> */}
      </div>
      {/* BUTTON */}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-lamaSky rounded-full" />
          <h1 className="font-bold">1.123</h1>
          <h2 className="text-xs text-gray-300">Boys (55%)</h2>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-lamaYellow rounded-full" />
          <h1 className="font-bold">1.123</h1>
          <h2 className="text-xs text-gray-300">Girls (45%)</h2>
        </div>
      </div>
    </div>
  );
};

export default CountChart;
