"use client";

import { useState } from "react";
import { useColor } from "../utils/ColorContext";

const profiles = [
  // Sample data
  { name: "John Doe", score: 98 },
  { name: "Jane Smith", score: 96 },
  { name: "Chris Johnson", score: 95 },
  { name: "Kathy Brown", score: 93 },
  { name: "Robert Wilson", score: 92 },
  { name: "Chris Johnson", score: 95 },
  { name: "Kathy Brown", score: 93 },
  { name: "Robert Wilson", score: 92 },
  { name: "Chris Johnson", score: 95 },
  { name: "Kathy Brown", score: 93 },
  { name: "Robert Wilson", score: 92 },
];

export default function Analysis() {
  const randomColor: string = useColor();
  const [topCount, setTopCount] = useState(20);

  const handleTopCountChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setTopCount(Number(event.target.value));
  };

  return (
    <div
      className="min-h-screen flex items-start justify-center p-4 font-mono"
      style={{ backgroundColor: randomColor }}
    >
      <div className="w-full max-w-xl mx-auto bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-8 h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-[#ededed] italic">
            Top Profiles
          </h1>
          <select
            className="bg-transparent text-sm text-[#ededed] focus:outline-none appearance-none"
            value={topCount}
            onChange={handleTopCountChange}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23ededed'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.5rem center",
              backgroundSize: "1.5em 1.5em",
              paddingRight: "2rem",
            }}
          >
            <option value="20">Top 20</option>
            <option value="50">Top 50</option>
            <option value="100">Top 100</option>
          </select>
        </div>
        <ul className="text-[#ededed] space-y-2">
          {profiles.slice(0, topCount).map((profile, index) => (
            <li key={index} className="bg-white/10 p-2 rounded-lg">
              <div className="flex justify-between">
                <span>
                  {index + 1}. {profile.name}
                </span>
                <span>{profile.score}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}