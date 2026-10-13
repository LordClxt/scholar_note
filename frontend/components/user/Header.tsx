/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client"
import React from "react";
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
        className="ink-panel h-40"
      >
        <div className="absolute inset-y-0 left-12 w-px bg-pen/70" />
      </div>
      <div className=" relative flex">
        <div className="absolute size-40 -top-[5.5rem] left-[2rem] rounded-full bg-gradient-to-br from-[hsl(229_62%_48%)] to-primary text-primary-foreground border-4 border-background shadow-[0_16px_32px_-14px_hsl(231_60%_15%/0.6)] flex items-center justify-center font-hand text-7xl font-bold">
          {((user.prenom?.[0] ?? "") + (user.nom?.[0] ?? "")).toUpperCase()}
        </div>
        <div className="ml-[13rem] mt-3">
          <h1 className="font-semibold text-xl tracking-tight">
            {[user.prenom, user.nom].filter(Boolean).join(" ")}
          </h1>
          <p className="font-poppins text-muted-foreground">{user.email}</p>
          <Badge>{role}</Badge>
        </div>
      </div>
    </>
  );
};

export default Header;
