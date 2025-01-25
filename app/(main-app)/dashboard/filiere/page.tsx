"use client";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import FormCreateFiliere from "@/components/Form/FormCreateFiliere";
import CreateModalContext from "@/components/Modal/CreateModalContext";
import { FiliereTable } from "@/components/Table/FiliereTable";
import { useQuery } from "@tanstack/react-query";
import { getAllFiliere } from "@/lib/filiereServerActions";
import { Loader } from "@/components/Loader";

const Page = () => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["filieres"],
    queryFn: getAllFiliere,
  });

  const [input, setInput] = useState("");
  const [localData, setLocalData] = useState({ data: [] });

  useEffect(() => {
    if (isSuccess) {
      setLocalData(data);
    }
  }, [data, isSuccess]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInput(e.target.value);
    const filterFiliere = data.data?.filter((filiere) =>
      filiere.nom.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setLocalData({ data: filterFiliere });
  };

  return (
    <div className="bg-white p-5 rounded shadow">
      <div className="flex items-center justify-between my-5">
        <h1 className="font-poppins font-bold text-3xl uppercase text-zinc-800">
          Filières
        </h1>
        <CreateModalContext titre="Crée une filière">
          <FormCreateFiliere />
        </CreateModalContext>
      </div>
      <div className="flex items-center gap-1 my-5 justify-end">
        <div className="flex gap-1">
          <Input
            className="w-[15rem]"
            value={input}
            onChange={handleChangeInput}
            placeholder="Saisir un nom de filière..."
          />
        </div>
      </div>
      <div className=" bg-white rounded shadow">
        {isLoading ? <Loader /> : <FiliereTable data={localData} />}
      </div>
    </div>
  );
};

export default Page;
