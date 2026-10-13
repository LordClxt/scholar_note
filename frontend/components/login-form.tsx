/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
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
  const [select, setSelect] = useState("etudiant");

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      loginFunction(data.access_token, data.user, select);
      if(select == "etudiant"){
        router.push("/dashboard/note");
      } else {
        router.push("/dashboard/evaluation");
      }
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
      type_user: select,
    };
    // @ts-ignore
    mutation.mutate(data);
  };

  return (
    <>
      {mutation.isPending && !mutation.isSuccess && <Loader />}
      <form
        onSubmit={handleSubmit}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold mb-5">CONNEXION</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Entre ton {select == "etudiant" && "Matricule ou ton "} Email pour
            te connecter
          </p>
        </div>
        {errors && (
          <div className="bg-red-200 border text-red-500 text-center border-red-500 rounded p-3">
           {errors}
          </div>
        )}

        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="login">
              Email {select == "etudiant" && " / Matricule"}
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
              {/* <a
                href="#"
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Mot de passe oublié?
              </a> */}
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
          {
            
          }
          <div className="grid gap-2">
            <Label htmlFor="password">Type d&apos;utilisateur</Label>
            <Select onValueChange={(value) => setSelect(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Etudiant" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Type utilisateur</SelectLabel>
                  <SelectItem value="enseignant">Enseignant</SelectItem>
                  <SelectItem value="etudiant">Etudiant</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full font-bold">
            CONNEXION
          </Button>
        </div>
      </form>
    </>
  );
}
