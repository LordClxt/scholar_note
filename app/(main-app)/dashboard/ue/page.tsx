/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import CreateModalContext from "@/components/Modal/CreateModalContext";
import FormCreateUE from "@/components/Form/FormCreateUE";
import { UETable } from "@/components/Table/UETable";
import { useQuery } from "@tanstack/react-query";
import { getAllUE } from "@/lib/ueServerActions";
import { Loader } from "@/components/Loader";

const Page = () => {
  const { data, isSuccess } = useQuery({
    queryKey: ["ue"],
    queryFn: getAllUE,
  });

  const [input, setInput] = useState("");
  const [localData, setLocalData] = useState({ data: [] });

  useEffect(() => {
    if (isSuccess) {
      setLocalData(data);
    }
  }, [isSuccess]);

  if (!isSuccess) {
    return <Loader />;
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInput(e.target.value);
    const filterUe = data.data?.filter((ue) =>
      ue.intitule.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setLocalData({ data: filterUe });
  };


  
  return (
    <div className="bg-white p-5 rounded shadow">
      <div className="flex items-center justify-between my-5">
        <h1 className="font-poppins font-bold text-3xl uppercase text-zinc-800">
          UE
        </h1>
        <CreateModalContext titre="Crée un UE">
          <FormCreateUE />
        </CreateModalContext>
      </div>
      <div className="flex items-center gap-1 my-5 justify-end">
        <div className="flex gap-1 justify-end">
          <Input
            onChange={handleChangeInput}
            value={input}
            className="w-[15rem]"
            placeholder="Saisir un intitulé ..."
          />
        </div>
      </div>
      <div className=" bg-white rounded shadow">
        {!isSuccess ? <Loader /> : <UETable data={localData} />}
      </div>
    </div>
  );
};

export default Page;
