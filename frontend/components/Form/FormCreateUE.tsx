/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUE, editUE } from "@/lib/ueServerActions";
import { Loader } from "../Loader";
import { modalContext } from "../Modal/CreateModalContext";
import { modalEditContext } from "../Modal/ModifierContext";


// iNTERFACE POUR LES DATA DE UE
interface DataIterface {
  id?: number | undefined;
  intitule: string;
}

const FormCreateUE = ({ data }: { data?: DataIterface }) => {
  // Context de creation
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
    mutationFn: isSave ? createUE : (dataUpdate) => editUE(dataUpdate, data.id),
    onSuccess: () => {
      // Invalider les données en cache
      queryClient.invalidateQueries({ queryKey: ["ue"] });

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

  const [intitule, setIntitule] = useState(isSave ? "" : data.intitule);

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      intitule: intitule,
    };
    // @ts-ignore
    mutation.mutate(data);
  };

  return (
    <>
      {mutation.isPending && <Loader />}
      <form onSubmit={handleCreate}>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="intitu">Intitulé de l'UE</Label>
            <Input
              value={intitule}
              onChange={(e) => setIntitule(e.target.value)}
              id="intitu"
              name="intitule"
              placeholder="Saisir l'intitulé de l'ue..."
            />
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

export default FormCreateUE;
