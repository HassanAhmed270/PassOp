import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white text-center py-2 md:py-1  ">
    <div className="flex flex-col justify-center items-center gap-2  md:gap-1">
        <div className="text-lg md:text-2xl font-bold ">
        <span className="text-green-600 ">&lt;</span>
        Pass
        <span className="text-green-600">OP/&gt;</span>
        </div>
        <div className="flex gap-4 text-sm md:text-base">&copy; {new Date().getFullYear()} MyWebsite.
        <span><img className="w-6" src="/svgs/heart.svg" alt="Logo" /></span> All rights reserved.<span className="hidden md:block">Local Storage Managing For Hosting</span></div>
        </div>
    </footer>
  );
};

export default Footer;
