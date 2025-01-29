"use client"; // Assurez-vous que ce composant est côté client
import Image from 'next/image';
import loaderImage from "@/app/img/graduate.gif"
// import Lottie from "lottie-react"


export const Loader = () => {
  return (
    <div className="fixed z-50 bg-black bg-opacity-80 top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="bg-yellow-300 w-[150px] relative h-[150px] flex justify-center items-center p-5 rounded-full">
        {/* <Lottie animationData={loader} width={200} height={2} /> */}
        <Image unoptimized className='rounded-full' src={loaderImage} width={100} height={100} alt='' />
        {/* <p className='font-poppins font-bold text-white'>CHARGEMENT...</p> */}
      </div>
    </div>
  );
};