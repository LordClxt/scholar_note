"use client";
import CreateModalContext from "@/components/Modal/CreateModalContext";
import { EtudiantTable } from "@/components/Table/EtudiantTable";
import FormCreateEtudiant from "@/components/Form/FormCreateEtudiant";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllEtudiant } from "@/lib/etudiantServerActions";
import { Loader } from "@/components/Loader";

const Page = () => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["etudiants"],
    queryFn: getAllEtudiant,
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
    const filterEtudiants = data.data?.filter(
      (etudiant) =>
        etudiant.matricule.toLowerCase().includes(e.target.value.toLowerCase()) ||
        etudiant.nom.toLowerCase().includes(e.target.value.toLowerCase()) || etudiant.prenom.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setLocalData({ data: filterEtudiants });
  };

  return (
    <div className="bg-white p-5 rounded shadow">
      <div className="flex items-center justify-between my-5">
        <h1 className="font-poppins font-bold text-3xl uppercase text-zinc-800">
          Etudiants
        </h1>
        <CreateModalContext titre="Crée un étudiant">
          <FormCreateEtudiant />
        </CreateModalContext>
      </div>
      <div className="flex items-center gap-1 my-5 justify-end">
        <div className="flex gap-1">
          <Input
           value={input}
           onChange={handleChangeInput}
            className="w-[15rem]"
            placeholder="Saisir nom ou matricule..."
          />
        </div>
      </div>
      <div className=" bg-white rounded shadow">
        {isLoading ? <Loader /> : <EtudiantTable data={localData} />}
      </div>
    </div>
  );
};

export default Page;
