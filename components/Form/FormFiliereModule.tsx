"use client";
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader } from "../Loader";
import { modalContext } from "../Modal/CreateModalContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  createFiliereModule,
} from "@/lib/filiereModuleServerActions";
import { getAllModule } from "@/lib/moduleServerActions";

// iNTERFACE POUR LES DATA DE UE
interface DataIterface {
  id_filiere: number;
}

const FormFiliereModule = ({ data }: { data?: DataIterface }) => {
  // Context de creation
  const modaleContext = React.useContext(modalContext) as unknown as {
    isOpen: boolean;
    close: () => void;
  };

  //Récuperation du query client pour invalider les data en cache
  const queryClient = useQueryClient();

  const { data: modules, isLoading: moduleLoading } = useQuery({
    queryKey: ["modules"],
    queryFn: getAllModule,
  });

  const [modulesState, setModulesState] = useState([]);

  const mutation = useMutation({
    mutationFn: createFiliereModule,
    onSuccess: () => {
      // Invalider les données en cache
      queryClient.invalidateQueries({
        queryKey: ["filiere_modules", data.id_filiere+""],
      });

      // Fermer la modale
      modaleContext.close();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  
  useEffect(()=>{
    if(!moduleLoading){
        setModulesState([
          ...modules.data?.map((module) => ({
            libele: module.libele,
            id: module.id,
          }))
        ])
    }
  }, [moduleLoading, modules])

  const [module, setModule] = useState("");
  const [moduleInput, setModuleInput] = useState("");

  const handleChangeModuleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModuleInput(e.target.value);
    const filterModules = modules.data?.filter((mod) =>
      mod.libele.includes(e.target.value)
    );
    setModulesState(filterModules);
  };

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataSend = {
      id_module: module,
      id_filiere: data.id_filiere,
    };
    // @ts-ignore
    mutation.mutate(dataSend);
  };
  if (moduleLoading) {
    return <Loader />;
  }
  return (
    <>
      {mutation.isPending && <Loader />}
      <form onSubmit={handleCreate}>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="module">Module</Label>
            <Select
              onValueChange={(value) => setModule(value)}
              value={module.toString()}
              required
              name="module"
            >
              <SelectTrigger id="module">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent position="popper">
                <Input
                  value={moduleInput}
                  onChange={handleChangeModuleInput}
                  placeholder="Rechercher un module..."
                  className="my-1"
                />
                {modulesState.map((module) => (
                  <SelectItem key={module.id} value={module.id + ""}>
                    {module.libele}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex">
            <Button className="w-full text-white">Ajouter</Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default FormFiliereModule;
