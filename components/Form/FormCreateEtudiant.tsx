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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllFiliere } from "@/lib/filiereServerActions";
import { createEtudiant, editEtudiant } from "@/lib/etudiantServerActions";
import { getAllNiveau } from "@/lib/niveauServerActions";
import { Loader } from "../Loader";

interface DataIterface {
  id?: number | undefined;
  matricule: string;
  nom: string;
  prenom: string;
  sexe: string;
  adresse: string;
  id_filiere: number;
}

const FormCreateEtudiant = ({ data }: { data?: DataIterface }) => {
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

  // Récupération des filières

  const { data: filieres, isLoading: filiereLoading } = useQuery({
    queryKey: ["filieres"],
    queryFn: getAllFiliere,
  });

  // Récuperer tous les niveaux
  const { data: niveaux, isLoading: niveauxLoading } = useQuery({
    queryKey: ["niveaux"],
    queryFn: getAllNiveau,
  });

  const mutation = useMutation({
    mutationFn: isSave
      ? createEtudiant
      : (dataUpdate) => editEtudiant(dataUpdate, data.id),
    onSuccess: () => {
      // Invalider les données en cache
      queryClient.invalidateQueries({ queryKey: ["etudiants"] });

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
    matricule: string;
    nom: string;
    prenom: string;
    addresse: string;
  }

  const [inputData, setInputData] = useState<inputDataInterface>({
    matricule: isSave ? "" : data.matricule,
    nom: isSave ? "" : data.nom,
    prenom: isSave ? "" : data.prenom,
    addresse: isSave ? "" : data.adresse,
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
      matricule: inputData.matricule,
      nom: inputData.nom,
      prenom: inputData.prenom,
      adresse: inputData.addresse,
      id_filiere: formData.get("filiere"),
      sexe: formData.get("sexe"),
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mutation.mutate(data);
  };

  if (filiereLoading || niveauxLoading) {
    return <Loader />;
  }

  return (
    <form onSubmit={handleCreate}>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="matricule">Matricule</Label>
          <Input
            value={inputData.matricule}
            onChange={handleChange}
            id="matricule"
            name="matricule"
            placeholder="Saisir le matricule..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Nom</Label>
            <Input
              value={inputData.nom}
              onChange={handleChange}
              id="name"
              name="nom"
              placeholder="Saisir le nom..."
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Prenom</Label>
            <Input
              value={inputData.prenom}
              onChange={handleChange}
              id="prenom"
              name="prenom"
              placeholder="Saisir le prenom..."
            />
          </div>
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="name">Addresse</Label>
          <Input
            value={inputData.addresse}
            onChange={handleChange}
            id="addresse"
            name="addresse"
            placeholder="Saisir l'addresse..."
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="filiere">Filière</Label>
          <Select required name="filiere">
            <SelectTrigger id="filiere">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              {filieres.data?.map((filiere) => {
                const niveau = niveaux.data?.find(
                  (niveau) => niveau.id == filiere.id_niveau
                );
                return (
                  <SelectItem key={filiere.id} value={filiere.id + ""}>
                    {filiere.nom} - {niveau.nom}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
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

        <div className="flex ">
          <Button className="w-full text-white">
            {isSave ? "Ajouter" : "Modifier"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default FormCreateEtudiant;
