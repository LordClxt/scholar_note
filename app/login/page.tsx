"use client"
import { LoginForm } from "@/components/login-form"
import Image from "next/image"
import imageLogin from "@/app/img/pang-yuhao-_kd5cxwZOK4-unsplash.jpg"
import SplitText from "../components/SplitText/SplitText"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-1 items-center justify-center font-poppins ">
      <div className="flex flex-col gap-4 p-6 md:p-10 ">
        <div className="flex justify-center gap-2">
          <SplitText
              text="SCHOLAR_NOTE"
              className="text-4xl font-semibold text-center  text-yellow-400"
              delay={150}
              animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
              animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
              threshold={0.2}
              rootMargin="-50px"
            />
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
  )
}
