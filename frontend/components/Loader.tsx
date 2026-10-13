"use client";
import { CSSProperties } from "react";
import HashLoader from "react-spinners/HashLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "#fac60a",
};


export const Loader = () => {
  return (
    <div className="fixed z-50 bg-black bg-opacity-80 top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="bg-white p-10 rounded-full ring-8  ring-yellow-400">
      <HashLoader
        color={"#ffc800"}
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