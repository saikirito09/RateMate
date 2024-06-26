"use client";

import { useState, useEffect } from "react";
import { useColor } from "../utils/ColorContext";
import { fetchTopProfiles } from "../utils/fetchProfile";
import LoadingSpinner from "../components/LoadingSpinner";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

function parseHeight(height) {
  const [feet, inches] = height.split("'").map(Number);
  return feet * 12 + (inches || 0);
}

function getHeightRange(height) {
  if (height < 60) return "Below 5'0\"";
  if (height <= 65) return "5'0\" to 5'5\"";
  if (height <= 70) return "5'6\" to 6'0\"";
  if (height <= 75) return "6'1\" to 6'5\"";
  if (height <= 80) return "6'6\" to 7'0\"";
  return "Above 7'0\"";
}

export default function Analysis() {
  const randomColor: string = useColor();
  const [profiles, setProfiles] = useState<any[]>([]);
  const [topCount, setTopCount] = useState(20);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfiles = async () => {
      setLoading(true);
      const data = await fetchTopProfiles(topCount);
      setProfiles(data);
      setLoading(false);
    };
    getProfiles();
  }, [topCount]);

  const handleTopCountChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setTopCount(Number(event.target.value));
  };

  const ageData = profiles.map((profile) => parseInt(profile.age, 10));
  const heightData = profiles.map((profile) => parseHeight(profile.height));

  const ageHistogramData = {
    labels: Array.from(new Set(ageData)).sort((a, b) => a - b),
    datasets: [
      {
        label: "Age Distribution",
        data: ageData.reduce((acc, age) => {
          if (!isNaN(age)) {
            acc[age] = (acc[age] || 0) + 1;
          }
          return acc;
        }, {}),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const heightRanges = [
    "Below 5'0\"",
    "5'0\" to 5'5\"",
    "5'6\" to 6'0\"",
    "6'1\" to 6'5\"",
    "6'6\" to 7'0\"",
    "Above 7'0\"",
  ];

  const heightHistogramData = {
    labels: heightRanges,
    datasets: [
      {
        label: "Height Distribution",
        data: heightRanges.map(
          (range) =>
            heightData.filter((height) => getHeightRange(height) === range)
              .length,
        ),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: "#ededed",
        },
      },
      y: {
        ticks: {
          color: "#ededed",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#ededed",
        },
      },
    },
  };

  return (
    <div
      className="min-h-screen flex flex-col items-start justify-start p-4 font-mono"
      style={{ backgroundColor: randomColor }}
    >
      <div className="w-full flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2 bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-4 overflow-y-auto h-[80vh]">
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
          {loading ? (
            <LoadingSpinner />
          ) : (
            <ul className="text-[#ededed] space-y-2">
              {profiles.map((profile, index) => (
                <li key={profile.id} className="bg-white/10 p-2 rounded-lg">
                  <div className="flex justify-between">
                    <span>
                      {index + 1}. {profile.name}
                    </span>
                    <span>
                      {profile.score.toFixed(2)} ({profile.numRatings} ratings)
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-4 overflow-hidden h-[38vh]">
            <h2 className="text-xl font-bold text-[#ededed] italic mb-4">
              Age Distribution
            </h2>
            <div className="h-[70%]">
              <Bar data={ageHistogramData} options={chartOptions} />
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-4 overflow-hidden h-[38vh]">
            <h2 className="text-xl font-bold text-[#ededed] italic mb-4">
              Height Distribution
            </h2>
            <div className="h-[70%]">
              <Bar data={heightHistogramData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
