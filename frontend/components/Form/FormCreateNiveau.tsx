import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { modalContext } from "../Modal/CreateModalContext";
import { modalEditContext } from "../Modal/ModifierContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNiveau, editNiveau } from "@/lib/niveauServerActions";
import { Loader } from "../Loader";

interface DataIterface {
  id?: number | undefined;
  nom: string;
}

const FormCreateNiveau = ({ data }: { data?: DataIterface }) => {
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
      ? createNiveau
      : (dataUpdate) => editNiveau(dataUpdate, data.id),
    onSuccess: () => {
      // Invalider les données en cache
      queryClient.invalidateQueries({ queryKey: ["niveaux"] });

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

  const [nom, setNom] = useState(isSave ? "" : data.nom);

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      nom: nom,
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
            <Label htmlFor="nom">Nom</Label>
            <Input
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              id="nom"
              placeholder="Saisir le nom du niveau..."
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

export default FormCreateNiveau;
