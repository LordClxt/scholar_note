"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { modalContext } from "../Modal/CreateModalContext";
import { modalEditContext } from "../Modal/ModifierContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createEnseignant,
  editEnseignant,
} from "@/lib/enseignantServerActions";
import { Loader } from "../Loader";

interface DataIterface {
  id?: number | undefined;
  nom: string;
  prenom: string;
  sexe: string;
  adresse: string;
  specialite: string;
  email:string
}

const FormCreateEnseignant = ({ data }: { data?: DataIterface }) => {
  const modaleContext = React.useContext(modalContext) as unknown as {
    isOpen: boolean;
    close: () => void;
  };
  // Context de modification
  const modaleEditContext = React.useContext(modalEditContext) as unknown as {
    isOpen: boolean;
    close: () => void;
  };

  //Récuperation du query client pour invalider les data en cache
  const queryClient = useQueryClient();

  const isSave = data?.id === undefined;

  const mutation = useMutation({
    mutationFn: isSave
      ? createEnseignant
      : (dataUpdate) => editEnseignant(dataUpdate, data.id),
    onSuccess: () => {
      // Invalider les données en cache
      queryClient.invalidateQueries({ queryKey: ["enseignants"] });

      // Fermer la modale
      if (isSave) {
        modaleContext.close();
      } else {
        modaleEditContext.close();
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  // Gestion formulaire

  interface inputDataInterface {
    specialite: string;
    nom: string;
    prenom: string;
    addresse: string;
    email:string
  }

  const [inputData, setInputData] = useState<inputDataInterface>({
    specialite: isSave ? "" : data.specialite,
    nom: isSave ? "" : data.nom,
    prenom: isSave ? "" : data.prenom,
    addresse: isSave ? "" : data.adresse,
    email: isSave?"":data.email
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      specialite: inputData.specialite,
      nom: inputData.nom,
      prenom: inputData.prenom,
      adresse: inputData.addresse,
      sexe: formData.get("sexe"),
      email:inputData.email,
      mot_de_passe:inputData.nom+"_"+inputData.email
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mutation.mutate(data);
  };

  return (
    <>
      {mutation.isPending && <Loader />}
      <form onSubmit={handleCreate}>
        <div className="grid w-full items-center gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="nom">Nom</Label>
              <Input
                onChange={handleChange}
                value={inputData.nom}
                name="nom"
                id="nom"
                placeholder="Saisir le nom..."
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="prenom">Prenom</Label>
              <Input
                onChange={handleChange}
                value={inputData.prenom}
                id="prenom"
                name="prenom"
                placeholder="Saisir le prenom..."
              />
            </div>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="addresse">Email</Label>
            <Input
              value={inputData.email}
              onChange={handleChange}
              id="email"
              type="email"
              name="email"
              placeholder="Saisir l'email..."
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="addresse">Addresse</Label>
            <Input
              value={inputData.addresse}
              onChange={handleChange}
              id="addresse"
              name="addresse"
              placeholder="Saisir l'addresse..."
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="specialite">Spécialité</Label>
            <Input
              value={inputData.specialite}
              onChange={handleChange}
              id="specialite"
              name="specialite"
              placeholder="Saisir la spécialité..."
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="sexe">Sexe</Label>
            <Select required name="sexe">
              <SelectTrigger id="sexe">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="masculin">Masculin</SelectItem>
                <SelectItem value="feminin">Feminin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex">
            <Button className="w-full text-white">
              {isSave ? "Ajouter" : "Modifier"}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default FormCreateEnseignant;
