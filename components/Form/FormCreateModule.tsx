"use client"
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
import { modalEditContext } from "../Modal/ModifierContext";
import { modalContext } from "../Modal/CreateModalContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createModule, editModule } from "@/lib/moduleServerActions";
import { getAllUE } from "@/lib/ueServerActions";
import { Loader } from "../Loader";

interface DataIterface {
  id?: number | undefined;
  libele: string;
  volume_horaire:number;
  id_ue:number,
  credit:number
}



const FormCreateModule = ({ data }: { data?: DataIterface }) => {

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



  // Récupérer tous les ue
  // Récupération des niveaux

  const { data: UE, isLoading: ueLoading} = useQuery({
    queryKey: ["ue"],
    queryFn: getAllUE,
  });


  const mutation = useMutation({
    mutationFn: isSave
      ? createModule
      : (dataUpdate) => editModule(dataUpdate, data.id),
    onSuccess: () => {
      // Invalider les données en cache
      queryClient.invalidateQueries({ queryKey: ["modules"] });

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

  // Gestion Formulaire

  const [libele, setLibele] = useState(isSave ? "" : data.libele);
  const [credit, setCredit] = useState(isSave ? "" : data.credit);
  const [volumeHoraire, setVolumeHoraire] = useState(isSave ? "" : data.volume_horaire);

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)
    const data = {
      libele: libele,
      volume_horaire:volumeHoraire,
      id_ue: formData.get('ue'),
      credit:credit
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mutation.mutate(data);
  };


  if(ueLoading){
    return <Loader />
  }


  return (
    <>
      {
        mutation.isPending && <Loader />
      }
      <form onSubmit={handleCreate}>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="nom">Nom</Label>
            <Input onChange={(e)=>setLibele(e.target.value)} value={libele} id="nom" placeholder="Saisir le nom du module..." />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="nom">Volume horaire</Label>
            <Input value={volumeHoraire} onChange={(e)=>setVolumeHoraire(e.target.value)} type="number" min={2} max={100} id="nom" placeholder="Saisir le volume horaire..." />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="nom">Nombre de credit</Label>
            <Input value={credit} onChange={(e)=>setCredit(e.target.value)} type="number" min={1} max={5} id="nom" placeholder="Saisir le nombre de credit..." />
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="ue">UE</Label>
            <Select name="ue">
              <SelectTrigger id="ue">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent position="popper">
                {

                  UE.data?.map(ue=>(
                    <SelectItem key={ue.id} value={ue.id + ""}>{ue.intitule}</SelectItem>
                  ))
                }
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
    </>
  );
};

export default FormCreateModule;
