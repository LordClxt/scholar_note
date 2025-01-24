import React from "react";
import { SidebarTrigger } from "./ui/sidebar";

const NavBar = () => {
  return (
    <div className="flex bg-white justify-between items-center w-full p-3 shadow">
      <SidebarTrigger />
      <div className="w-10 h-10 bg-red-400 rounded-full"></div>
    </div>
  );
};

export default NavBar;
