/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client"
import React from "react";
import banner from "@/app/img/DSITCover_HiRes_CMYK-scaled.jpeg";
import { useStore } from "@/store";
import { Badge } from "../ui/badge";
const Header = () => {
  // @ts-ignore
  const user = useStore((state) => state?.user);
  // @ts-ignore
  const role = useStore((state) => state?.role);
  return (
    <>
      <div
        
        style={{
          backgroundImage: `url(${banner.src})`,
          backgroundSize: "cover",
        }}
        className="h-36  relative"
      ></div>
      <div className=" relative flex">
        <div className="absolute w-44 h-44 -top-[6rem] left-[2rem] bg-black rounded-full"></div>
        <div className="ml-[14rem] mt-3">
          <h1 className="font-poppins font-bold text-xl">
            {(user.nom ? user.nom?.toUpperCase() : "") + " " + (user.prenom ? user.prenom?.toUpperCase() : "")}
          </h1>
          <p className="font-poppins text-gray-600">{user.email}</p>
          <Badge>{role}</Badge>
        </div>
      </div>
    </>
  );
};

export default Header;
