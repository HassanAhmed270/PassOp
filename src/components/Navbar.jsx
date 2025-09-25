import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gray-800  text-white px-6 py-2 flex justify-between items-center">
      <div className="text-3xl font-bold">
        <span className="text-green-600 ">&lt;</span>
        Pass
        <span className="text-green-600">OP/&gt;</span>
        </div>
      <button className="text-white flex items-center gap-2 bg-green-600 px-4 py-1 rounded-full hover:bg-green-400">
        <a href="https://github.com/HassanAhmed270/PassOp" target="_blank" rel="noopener noreferrer">Github</a>
      </button>
    </nav>
  );
};

export default Navbar;
