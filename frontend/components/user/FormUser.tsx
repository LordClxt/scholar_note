/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useStore } from "@/store";
import { useMutation } from "@tanstack/react-query";
import { editProfil } from "@/lib/profileServerActions";
import { Loader } from "../Loader";

interface inputDataInterface {
  nom: string;
  prenom: string;
  email: string;
}

const FormUser = () => {
  // @ts-ignore
  const user = useStore((state) => state?.user);
  // @ts-ignore
  const role = useStore((state) => state?.role);
  // @ts-ignore
  const modifier_profil = useStore((state) => state?.modifier_profil);


  const [isEditable, setIsEditable] = useState(false);
  const [select, setSelect] = useState('masculin');
  const [inputData, setInputData] = useState<inputDataInterface>({
    nom: "",
    prenom: "",
    email: "",
  });

  const [isLoading, setIsLoading] = useState(true); // État de chargement

  useEffect(() => {
    // Vérifiez si le store est réhydraté
    const unsubscribe = useStore.persist.onFinishHydration(() => {
      setIsLoading(false); // Le store est réhydraté
    });

    return () => unsubscribe(); // Nettoyage
  }, []);

  useEffect(() => {
    if(isLoading){
      setInputData({
        nom:user.nom,
        prenom:user.prenom,
        email:user.email
      })
      setSelect(user.sexe)
    }
  }, [isLoading, user]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  const mutation = useMutation({
    mutationFn:(data)=>editProfil(user.id, data),
    onSuccess:()=>{
      modifier_profil(inputData.nom, inputData.prenom, select, inputData.email)
      setIsEditable(false)
    }
  });

  const handleSubmit = (e)=>{
    e.preventDefault()
    const data = {
      nom:inputData.nom,
      prenom:inputData.prenom,
      email:inputData.email,
      sexe:select,
      type_user:role
    }

    // @ts-ignore
    mutation.mutate(data)
  }
  // modifier_profil
  return (

    <>
      {
        mutation.isPending && <Loader />
      }
      <div className="">
        <div className="mx-10 flex justify-end">
          {!isEditable && (
            <Button
              className="px-10 font-bold font-poppins"
              onClick={() => setIsEditable(!isEditable)}
            >
              Modifier
            </Button>
          )}
        </div>
        <form onSubmit={handleSubmit} className="bg-white mt-9  p-7 mx-10 rounded shadow ">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="nom">Nom</Label>
              <Input
                disabled={!isEditable}
                className="disabled:bg-gray-300 disabled:text-black"
                onChange={handleChangeInput}
                value={inputData.nom ? inputData.nom : ""}
                name="nom"
                id="nom"
                placeholder="Saisir le nom..."
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="prenom">Prénom</Label>
              <Input
                disabled={!isEditable}
                className="disabled:bg-gray-300 disabled:text-black"
                onChange={handleChangeInput}
                value={inputData.prenom ? inputData.prenom : ""}
                name="prenom"
                id="prenom"
                placeholder="Saisir le prénom..."
              />
            </div>
          </div>
          
          {/* <---------------- ---------------> */}

          <div className="grid grid-cols-2 gap-2 mt-6">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                className="disabled:bg-gray-300 disabled:text-black"
                disabled={!isEditable}
                onChange={handleChangeInput}
                value={inputData.email? inputData.email : ""}
                name="email"
                type="email"
                id="email"
                placeholder="Saisir l'email..."
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="sexe">Sexe</Label>
              <Select
                onValueChange={(value)=>{
                  setSelect(value)
                }}
                disabled={!isEditable}
                value={select ? select : user.sexe}
                required
                name="sexe"
              >
                <SelectTrigger id="sexe">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="masculin">Masculin</SelectItem>
                  <SelectItem value="feminin">Feminin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* <---------------- ---------------> */}
          {isEditable && (
            <div className="mt-3 font-poppins flex gap-1 font-bold text-white">
              <Button
                variant="destructive"
                onClick={() => setIsEditable(!isEditable)}
              >
                Annuler
              </Button>
              <Button className="text-white">
                Sauvegarder les modifications
              </Button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default FormUser;
