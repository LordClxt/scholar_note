"use client";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import CreateModalContext from "@/components/Modal/CreateModalContext";
import FormCreatePeriode from "@/components/Form/FormCreatePeriode";
import { PeriodeTable } from "@/components/Table/PeriodeTable";
import { useQuery } from "@tanstack/react-query";
import { getAllPeriode } from "@/lib/periodeServerActions";
import { Loader } from "@/components/Loader";

const Page = () => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["periodes"],
    queryFn: getAllPeriode,
  });

  const [input, setInput] = useState("");
  const [localData, setLocalData] = useState({ data: [] });

  useEffect(() => {
    if (isSuccess) {
      setLocalData(data);
    }
  }, [isSuccess]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInput(e.target.value);
    const filterperiodes = data.data?.filter(
      (periode) =>
        periode.date_debut.includes(e.target.value) ||
        periode.date_fin.includes(e.target.value)
    );
    setLocalData({ data: filterperiodes });
  };

  return (
    <div className="bg-white p-5 rounded shadow">
      <div className="flex items-center justify-between my-5">
        <h1 className="font-poppins font-bold text-3xl uppercase text-zinc-800">
          Périodes
        </h1>
        <CreateModalContext titre="Crée une période">
          <FormCreatePeriode />
        </CreateModalContext>
      </div>
      <div className="flex items-center gap-1 my-5 justify-end">
        <div className="flex gap-1">
          <Input value={input}onChange={handleChangeInput} className="w-[15rem]" placeholder="Saisir une date..." />
         
        </div>
      </div>
      <div className=" bg-white rounded shadow">
        {isLoading ? <Loader /> : <PeriodeTable data={localData} />}
      </div>
    </div>
  );
};
export default Page;
