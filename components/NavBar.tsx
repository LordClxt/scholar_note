import React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import UserModal from "./UserModal";

const NavBar = () => {
  return (
    <div className="relative flex bg-white justify-between items-center w-full p-3 shadow">
      <SidebarTrigger />
      <UserModal />
    </div>
  );
};

export default NavBar;
