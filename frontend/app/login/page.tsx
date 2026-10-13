"use client";
import { LoginForm } from "@/components/login-form";
import Image from "next/image";
import imageLogin from "@/app/img/pang-yuhao-_kd5cxwZOK4-unsplash.jpg";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-1 items-center justify-center font-poppins ">
        <div className="flex flex-col gap-4 p-6 md:p-10 ">
          <div className="flex justify-center gap-2">
            <h1 className="text-4xl font-semibold text-center  text-yellow-400">
              SCHOLAR_NOTE
            </h1>
          </div>
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image src={imageLogin} fill alt="" />
      </div>
    </div>
  );
}
