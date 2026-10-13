"use client";
import { CSSProperties } from "react";
import HashLoader from "react-spinners/HashLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "#1D2F8F",
};


export const Loader = () => {
  return (
    <div className="fixed z-50 bg-background/80 backdrop-blur-[2px] top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="bg-card p-8 rounded-md border shadow-sm">
      <HashLoader
        color={"#1D2F8F"}
        cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </div>
      {/* <p className="font-poppins text-xl text-white font-bold">Chargement...</p> */}
    </div>
  );
};