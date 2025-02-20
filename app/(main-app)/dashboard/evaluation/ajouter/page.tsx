/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import { Loader } from "@/components/Loader";
import { AddEvaluationTable } from "@/components/Table/AddEvaluationTable ";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { getModuleEvaluation } from "@/lib/evaluationServerActions";
import { useStore } from "@/store";
import { SelectTrigger } from "@radix-ui/react-select";
import { useQuery } from "@tanstack/react-query";
import { Save } from "lucide-react";
import React, { useEffect, useState } from "react";

const Page = () => {
  // @ts-ignore
  const user = useStore((state) => state.user);
  

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["etudiant_personne"],
    queryFn: () => getModuleEvaluation(user.specialite),
  });
  const [localData, setLoacalData] = useState([]);
  useEffect(() => {
    if (isSuccess) {
      setLoacalData(data);
    }
  }, [isSuccess, data]);
  return (
    <div className="bg-white p-5 rounded shadow">
      <div className="flex items-center justify-between my-5">
        <h1 className="font-poppins font-bold text-3xl uppercase text-zinc-800">
          Ajouter évaluations
        </h1>
        <Button className="text-white font-bold  px-[7rem]">
          <Save className="font-bold" /> Ajouter
        </Button>
      </div>
      <div>
        <Select onValueChange={null} value={null} required name="module">
          <SelectTrigger id="module">
            <SelectValue placeholder="Selectionner une matiere" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="1">Base de donnée relationnelle</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {isLoading ? <Loader /> : <AddEvaluationTable data={localData} />}
    </div>
  );
};

export default Page;
