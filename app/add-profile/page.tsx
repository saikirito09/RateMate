"use client";

import { useState, useEffect, useCallback } from "react";
import { useColor } from "../utils/ColorContext";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { uploadImage } from "../utils/uploadImage";
import { addProfile } from "../utils/addProfile";
import toast, { Toaster } from "react-hot-toast";

export default function AddProfile() {
  const randomColor = useColor();
  const placeholderImage = "/add-your-image.png";
  const [images, setImages] = useState<File[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    height: "",
    lookingFor: "",
    school: "",
    habits: "",
    interests: "",
    bio: "",
  });

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    if (files.length + images.length <= 6) {
      setImages((prevImages) => [...prevImages, ...files]);
    } else {
      toast.error("You can only add up to 6 images.");
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handlePrev();
      } else if (event.key === "ArrowRight") {
        handleNext();
      }
    },
    [images],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const imageUrls = await Promise.all(images.map(uploadImage));
      await addProfile({ ...formData, images: imageUrls });
      toast.success("Profile saved successfully!");
      setFormData({
        name: "",
        age: "",
        height: "",
        lookingFor: "",
        school: "",
        habits: "",
        interests: "",
        bio: "",
      });
      setImages([]);
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to save profile. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-start justify-center p-4 pt-2 font-mono"
      style={{ backgroundColor: randomColor }}
    >
      <Toaster position="top-right" />
      <div className="w-full max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-8 flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
        <div className="w-full md:w-auto flex flex-col justify-center items-center space-y-4">
          <div
            className="relative w-[300px] h-[300px] border-2 border-[#ededed] rounded-lg flex items-center justify-center overflow-hidden"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {images.length > 0 ? (
              <Image
                src={URL.createObjectURL(images[currentIndex])}
                alt="Uploaded Image"
                width={300}
                height={300}
                className="object-cover w-full h-full rounded-lg"
              />
            ) : (
              <Image
                src={placeholderImage}
                alt="Add Your Image"
                width={300}
                height={300}
                className="object-cover w-full h-full rounded-lg"
              />
            )}
            {images.length > 0 && (
              <>
                <button
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 p-2 rounded-full"
                  onClick={handlePrev}
                >
                  <ChevronLeft size={24} color="#ededed" />
                </button>
                <button
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 p-2 rounded-full"
                  onClick={handleNext}
                >
                  <ChevronRight size={24} color="#ededed" />
                </button>
                <p className="absolute top-0 right-0 m-2 text-xs text-gray-500 italic bg-gray-700 bg-opacity-50 p-1 rounded">
                  {currentIndex + 1}/{images.length}
                </p>
              </>
            )}
          </div>
          <label className="bg-[#ededed] text-[#333] font-bold py-2 px-4 rounded-lg text-sm hover:bg-[#d4d4d4] transition-colors w-full max-w-[300px] text-center cursor-pointer">
            Upload Image
            <input
              type="file"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                if (files.length + images.length <= 6) {
                  setImages((prevImages) => [...prevImages, ...files]);
                } else {
                  toast.error("You can only add up to 6 images.");
                }
              }}
              className="hidden"
            />
          </label>
          <p className="text-xs text-gray-400 italic">
            Add a minimum of 2 images and a maximum of 6 images.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full md:flex-grow flex flex-col justify-start space-y-4 text-[#ededed] overflow-y-auto max-h-[80vh] md:max-h-none"
        >
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            className="bg-transparent text-2xl placeholder-gray-500 focus:outline-none font-bold italic"
          />
          <div className="flex space-x-4 items-center">
            <label className="text-sm text-[#ededed] font-bold">Age</label>
            <input
              type="text"
              name="age"
              placeholder="21"
              value={formData.age}
              onChange={handleChange}
              className="bg-transparent text-sm placeholder-gray-500 focus:outline-none w-1/2"
            />
            <label className="text-sm text-[#ededed] font-bold">Height</label>
            <select
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="bg-transparent text-sm text-[#ededed] focus:outline-none w-1/2 appearance-none"
              style={{
                backgroundImage: `url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23ededed'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E&quot;)`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.5rem center",
                backgroundSize: "1.5em 1.5em",
                paddingRight: "2rem",
              }}
            >
              <option value="" disabled hidden>
                Select height
              </option>
              {Array.from({ length: 61 }, (_, i) => {
                const feet = Math.floor((i + 48) / 12);
                const inches = (i + 48) % 12;
                return (
                  <option key={i} value={`${feet}&apos;${inches}&quot;`}>
                    {feet}&apos;{inches}&quot;
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label className="text-sm text-[#ededed] font-bold">
              Looking for
            </label>
            <input
              type="text"
              name="lookingFor"
              placeholder="a serious relationship"
              value={formData.lookingFor}
              onChange={handleChange}
              className="bg-transparent text-sm placeholder-gray-500 focus:outline-none w-full"
            />
          </div>
          <div>
            <label className="text-sm text-[#ededed] font-bold">School</label>
            <input
              type="text"
              name="school"
              placeholder="Bachelor's in Computer Science"
              value={formData.school}
              onChange={handleChange}
              className="bg-transparent text-sm placeholder-gray-500 focus:outline-none w-full"
            />
          </div>
          <div>
            <label className="text-sm text-[#ededed] font-bold">Habits</label>
            <input
              type="text"
              name="habits"
              placeholder="Non-smoker, Social drinker"
              value={formData.habits}
              onChange={handleChange}
              className="bg-transparent text-sm placeholder-gray-500 focus:outline-none w-full"
            />
          </div>
          <div>
            <label className="text-sm text-[#ededed] font-bold">
              What are you into
            </label>
            <input
              type="text"
              name="interests"
              placeholder="Hiking, Photography, Traveling"
              value={formData.interests}
              onChange={handleChange}
              className="bg-transparent text-sm placeholder-gray-500 focus:outline-none w-full"
            />
          </div>
          <div>
            <label className="text-sm text-[#ededed] font-bold">Bio</label>
            <textarea
              name="bio"
              placeholder="Adventurous, Creative, Thoughtful. A software developer who loves hiking and photography. Looking to meet new people and explore new opportunities."
              value={formData.bio}
              onChange={handleChange}
              className="bg-transparent text-sm placeholder-gray-500 focus:outline-none resize-none h-24 w-full"
            />
          </div>
          <button className="bg-[#ededed] text-[#333] font-bold py-2 px-4 rounded-lg text-sm hover:bg-[#d4d4d4] transition-colors">
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
}
