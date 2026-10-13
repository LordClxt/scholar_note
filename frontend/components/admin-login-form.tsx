/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/lib/authServerActions";
import { useStore } from "@/store";
import { useRouter } from "next/navigation";
import { Loader } from "./Loader";
// import { redirect } from "next/navigation"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  // @ts-ignore
  const loginFunction = useStore((state) => state?.connexion);
  const router = useRouter();
  const [errors, setErrors] = useState(null);


  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log(data);
      
      loginFunction(data.access_token, data.user, 'admin');
      router.push("/dashboard");
    },
    onError: (err) => {
      // @ts-ignore
      setErrors(err.response.data.detail)
    },
  });

  interface inputDataInterface {
    login: string;
    mdp: string;
  }

  const [inputData, setInputData] = useState<inputDataInterface>({
    login: "",
    mdp: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      login: inputData.login,
      mot_de_passe: inputData.mdp,
      type_user: "admin",
    };
    // @ts-ignore
    mutation.mutate(data);
  };

  return (
    <>
      {mutation.isPending && <Loader />}
      <form
        onSubmit={handleSubmit}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold tracking-tight">Connexion administrateur</h2>
          <p className="text-balance text-sm text-muted-foreground">
            Entre ton Email pour te connecter
          </p>
        </div>
        {errors && (
          <div className="bg-destructive/10 border text-destructive text-center border-destructive/40 rounded p-3 text-sm">
           {errors}
          </div>
        )}

        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="login">
              Email admin
            </Label>
            <Input
              value={inputData.login}
              onChange={handleChange}
              name="login"
              id="login"
              type="text"
              placeholder=""
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="mdp">Mot de passe</Label>
            </div>
            <Input
              id="mdp"
              value={inputData.mdp}
              onChange={handleChange}
              name="mdp"
              type="password"
              required
            />
          </div>

          <Button type="submit" className="w-full font-semibold">
            Se connecter
          </Button>
        </div>
      </form>
    </>
  );
}
