"use client";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import CreateModalContext from "@/components/Modal/CreateModalContext";
import FormCreateEnseignant from "@/components/Form/FormCreateEnseignant";
import { EnseignantTable } from "@/components/Table/EnseignantTable";
import { useQuery } from "@tanstack/react-query";
import { getAllEnseignant } from "@/lib/enseignantServerActions";
import { Loader } from "@/components/Loader";

const Page = () => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["enseignants"],
    queryFn: getAllEnseignant,
  });

  const [input, setInput] = useState("");
  const [localData, setLocalData] = useState({ data: [] });

  useEffect(() => {
    if (isSuccess) {
      setLocalData(data);
    }
  }, [isSuccess, data]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInput(e.target.value);
    const filterEnseignants = data.data?.filter(
      (enseignant) =>
        enseignant.nom.toLowerCase().includes(e.target.value.toLowerCase()) ||
        enseignant.prenom.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setLocalData({ data: filterEnseignants });
  };

  return (
    <div className="sheet sheet-stack p-6">
      <div className="flex items-center justify-between my-5">
        <h1 className="font-poppins font-semibold text-3xl tracking-tight text-foreground border-l-[3px] border-pen pl-3">
          Enseignants
        </h1>
        <CreateModalContext titre="Créer un Enseignant">
          <FormCreateEnseignant />
        </CreateModalContext>
      </div>
      <div className="flex items-center gap-1 my-5 justify-end">
        <div className="flex gap-1">
          <Input
            className="w-[15rem]"
            value={input}
            onChange={handleChangeInput}
            placeholder="Saisir un nom ou un prénom..."
          />
        </div>
      </div>
      <div className="rounded-lg border overflow-hidden bg-card">
        {isLoading ? <Loader /> : <EnseignantTable data={localData} />}
      </div>
    </div>
  );
};

export default Page;
