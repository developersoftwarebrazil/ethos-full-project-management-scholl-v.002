"use client";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import Image from "next/image";

const data = [
  { name: "Group A", value: 92, fill: "#c3ebfa" },
  { name: "Group B", value: 8, fill: "#fae27c" },
];

const Performance = () => {
  return (
    <div className="bg-white h-80 rounded-md relative p-4 ">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold ">Performace</h1>
        <Image src="/moreDark.png" alt="" width={16} height={16} />
      </div>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            fill="#8884db"
            label
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center absolute">
      <h1 className="text-3xl font-bold">9.2</h1>
      <p className="text-sm text-gray-300">of 10 max LTS</p>
      </div>
      <h2 className="font-medium bottom-16 left-0 right-0 m-auto text-center absolute">1st Semester - 2nd Semester</h2>
    </div>
  );
};

export default Performance;
