"use client";
import React, { useState, useEffect } from "react";
import ProfileCard from "./components/ProfileCard";
import { useColor } from "./utils/ColorContext";
import { fetchProfiles, rateProfile } from "./utils/fetchProfile";
import LoadingSpinner from "./components/LoadingSpinner";

export default function HomePage() {
  const randomColor: string = useColor();
  const [profiles, setProfiles] = useState<any[]>([]);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);

  useEffect(() => {
    const getProfiles = async () => {
      const data = await fetchProfiles();
      const shuffledProfiles = data.sort(() => 0.5 - Math.random());
      console.log("Profiles data:", shuffledProfiles);
      setProfiles(shuffledProfiles);
    };
    getProfiles();
  }, []);

  const handleRate = async (id: string, rating: number) => {
    try {
      await rateProfile(id, rating);
      setProfiles((prevProfiles) =>
        prevProfiles.map((profile) =>
          profile.id === id
            ? {
                ...profile,
                score:
                  (profile.score * profile.numRatings + rating) /
                  (profile.numRatings + 1),
                numRatings: profile.numRatings + 1,
              }
            : profile,
        ),
      );
      setCurrentProfileIndex((prevIndex) => (prevIndex + 1) % profiles.length);
    } catch (error) {
      console.error("Error rating profile:", error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{ backgroundColor: randomColor }}
    >
      {profiles.length > 0 ? (
        <ProfileCard
          profile={profiles[currentProfileIndex]}
          onRate={handleRate}
        />
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}
