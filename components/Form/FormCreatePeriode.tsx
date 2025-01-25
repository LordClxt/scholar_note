"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { modalContext } from "../Modal/CreateModalContext";
import { modalEditContext } from "../Modal/ModifierContext";
import { createPeriode, editPeriode } from "@/lib/periodeServerActions";
import { Loader } from "../Loader";

// iNTERFACE POUR LES DATA DE PERIODE
interface DataIterface {
  id?: number | undefined;
  date_debut: string;
  date_fin: string;
}

const FormCreatePeriode = ({ data }: { data?: DataIterface }) => {
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
      ? createPeriode
      : (dataUpdate) => editPeriode(dataUpdate, data.id),
    onSuccess: () => {
      // Invalider les données en cache
      queryClient.invalidateQueries({ queryKey: ["periodes"] });

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

  const [date_debut, setDateDebut] = useState(isSave ? "" : data.date_debut);
  const [date_fin, setDateFin] = useState(isSave ? "" : data.date_fin);

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      date_debut: date_debut,
      date_fin: date_fin,
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mutation.mutate(data);
  };

  return (
    <>
      {
        mutation.isPending && <Loader />
      }
      <form onSubmit={handleCreate}>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="debut">Date de début</Label>
            <Input
              onChange={(e) => setDateDebut(e.target.value)}
              value={date_debut}
              id="debut"
              type="date"
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="fin">Date de fin</Label>
            <Input
              onChange={(e) => setDateFin(e.target.value)}
              value={date_fin}
              id="fin"
              type="date"
            />
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

export default FormCreatePeriode;
