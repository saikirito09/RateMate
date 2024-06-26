"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus, BarChart } from "lucide-react";
import { useColor } from "../utils/ColorContext";

export default function Navbar() {
  const randomColor: string = useColor();
  const pathname = usePathname();

  const isCurrentPage = (path: string) => pathname === path;

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
            className={`flex items-center space-x-2 ${
              isCurrentPage("/add-profile") ? "text-[#ededed]" : "text-gray-400"
            } hover:text-[#ededed] focus:text-[#ededed]`}
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-mono">Add Profile</span>
          </Link>
          <Link
            href="/analysis"
            className={`flex items-center space-x-2 ${
              isCurrentPage("/analysis") ? "text-[#ededed]" : "text-gray-400"
            } hover:text-[#ededed] focus:text-[#ededed]`}
          >
            <BarChart className="w-4 h-4" />
            <span className="text-sm font-mono">Analysis</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
