import React from "react";
import banner from "@/app/img/DSITCover_HiRes_CMYK-scaled.jpeg";
const Header = () => {
  return (
    <>
      <div
        
        style={{
          backgroundImage: `url(${banner.src})`,
          backgroundSize: "cover",
        }}
        className="h-52  relative"
      ></div>
      <div className=" relative flex">
        <div className="absolute w-44 h-44 -top-[6rem] left-[2rem] bg-black rounded-full"></div>
        <div className="ml-[14rem] mt-3">
          <h1 className="font-poppins font-bold text-xl">
            TINDE PEHE CALIXTE HASSAN
          </h1>
          <p className="font-poppins text-gray-600">hassanetinde@gmail.com</p>
        </div>
      </div>
    </>
  );
};

export default Header;
