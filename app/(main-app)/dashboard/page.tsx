"use client"
import CardsLine from "@/components/DashboardComponents/CardsLine";
import { useStore } from "@/store";
import React from "react";

const page = () => {
  const token = useStore(state=>state.token)
  return (
    <div className="p-8">
      <CardsLine />
      {token}
    </div>
  );
};

export default page;
