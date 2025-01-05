import React from "react";
import { FaSearch } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";
import './styles/input.css'

export default function Input() {
  return (
    <div className="bg-[#121212] h-[15vh] flex flex-col items-center justify-center">
      <div className="search-box flex items-center gap-4 p-3 rounded-lg border w-[70%]">
        <input
          className="border-none outline-none text-white bg-transparent flex-1"
          type="text"
          placeholder="Search..."
        />
        <button className="button">
          <span> Search </span>
        </button>
      </div>
    </div>
  );
}
