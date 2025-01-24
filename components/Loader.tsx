"use client";
import { Player } from "@lottiefiles/react-lottie-player";
import loader from "@/app/lotties/Animation - 1737725395360.json";
import { createPortal } from "react-dom";

export const Loader = () => {
  return createPortal(
    <div className="fixed z-50 bg-black bg-opacity-80 top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="bg-yellow-300 p-5 rounded-full">
        <Player
            className="relative -top-3 -left-2"
            autoplay={true}
            loop={true}
            controls={true}
            src={loader}
            style={{ height: "150px", width: "150px" }}
        ></Player>
      </div>
    </div>,
    document.body
  );
};
