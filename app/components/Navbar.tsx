// app/components/Navbar.tsx
"use client";

import Link from "next/link";
import { Plus, BarChart } from "lucide-react";
import { useColor } from "../utils/ColorContext";

export default function Navbar() {
  const randomColor: string = useColor();

  return (
    <>
      <nav
        className="p-4 flex justify-between items-center"
        style={{ backgroundColor: randomColor }}
      >
        <div className="flex items-center">
          <Link href="/" className="text-[#ededed] text-3xl font-bold">
            R
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link
            href="/add-profile"
            className="text-gray-400 flex items-center space-x-2 hover:text-[#ededed] focus:text-[#ededed]"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-mono">Add Profile</span>
          </Link>
          <Link
            href="/analysis"
            className="text-gray-400 flex items-center space-x-2 hover:text-[#ededed] focus:text-[#ededed]"
          >
            <BarChart className="w-4 h-4" />
            <span className="text-sm font-mono">Analysis</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
