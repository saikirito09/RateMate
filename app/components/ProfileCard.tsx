"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useColor } from "../utils/ColorContext";

export default function ProfileCard({
  profile,
  onRate,
}: {
  profile: any;
  onRate: (id: string, rating: number) => void;
}) {
  const randomColor: string = useColor();
  const [rating, setRating] = useState<number | null>(null);

  const handleRating = (selectedRating: number) => {
    setRating(selectedRating);
    onRate(profile.id, selectedRating);
  };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const { key } = event;
      if (key >= "0" && key <= "7") {
        const selectedRating = parseInt(key);
        handleRating(selectedRating);
      }
    },
    [onRate, profile.id],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen"
      style={{ backgroundColor: randomColor }}
    >
      {/* Heading and Rating Buttons */}
      <div className="absolute top-8 w-full flex flex-col items-center justify-center z-20">
        <div className="text-base mb-2 text-gray-200 italic font-semibold">
          Click a number or press any number from 0 to 7 to rate.
        </div>
        <div className="flex justify-center gap-2">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((num) => (
            <button
              key={num}
              onClick={() => handleRating(num)}
              className={`w-10 h-10 rounded-md flex items-center justify-center text-base font-bold
                ${rating === num ? "bg-gray-500/90 text-white" : "bg-gray-200/10 text-gray-200"}
                backdrop-blur-md shadow-lg border border-white/20
                hover:bg-white transition-colors`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Main profile container */}
      <div className="relative z-10 max-w-3xl w-full mx-auto mt-4">
        <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-lg overflow-hidden flex h-[500px] border border-white/20">
          <div className="w-1/2 h-full">
            <div className="relative w-full h-full">
              <Image
                src={profile.images?.[0] || "/add-your-image.png"}
                alt={profile.name}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>
          <div className="w-1/2 p-4 flex flex-col justify-start h-full overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-4">
              {profile.name}
            </h2>
            <p className="text-white text-sm">
              <strong>Age:</strong> {profile.age} &nbsp; | &nbsp;{" "}
              <strong>Height:</strong> {profile.height}
            </p>
            <p className="text-white text-sm mt-2">
              <strong>About Me:</strong> {profile.bio}
            </p>
            <p className="text-white text-sm mt-2">
              <strong>Looking For:</strong> {profile.lookingFor}
            </p>
            <p className="text-white text-sm mt-2">
              <strong>School:</strong> {profile.school}
            </p>
            <p className="text-white text-sm mt-2">
              <strong>Habits:</strong> {profile.habits}
            </p>
            <p className="text-white text-sm mt-2">
              <strong>Interests:</strong> {profile.interests}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
