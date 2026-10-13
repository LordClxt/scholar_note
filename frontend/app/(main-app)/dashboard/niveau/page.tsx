"use client";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import CreateModalContext from "@/components/Modal/CreateModalContext";
import FormCreateNiveau from "@/components/Form/FormCreateNiveau";
import { NiveauTable } from "@/components/Table/NiveauTable";
import { useQuery } from "@tanstack/react-query";
import { getAllNiveau } from "@/lib/niveauServerActions";
import { Loader } from "@/components/Loader";

const Page = () => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["niveaux"],
    queryFn: getAllNiveau,
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
    const filterNiveaux = data.data?.filter((niveau) =>
      niveau.nom.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setLocalData({ data: filterNiveaux });
  };

  return (
    <div className="sheet sheet-stack p-6">
      <div className="flex items-center justify-between my-5">
        <h1 className="font-poppins font-semibold text-3xl tracking-tight text-foreground border-l-[3px] border-pen pl-3">
          Niveaux
        </h1>
        <CreateModalContext titre="Créer un niveau">
          <FormCreateNiveau />
        </CreateModalContext>
      </div>
      <div className="flex items-center gap-1 my-5 justify-end">
        <div className="flex gap-1">
          <Input
            value={input}
            onChange={handleChangeInput}
            className="w-[15rem]"
            placeholder="Saisir un nom..."
          />
        </div>
      </div>
      <div className="rounded-lg border overflow-hidden bg-card">
        {isLoading ? <Loader /> : <NiveauTable data={localData} />}
      </div>
    </div>
  );
};

export default Page;
