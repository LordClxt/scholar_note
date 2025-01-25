"use client"
import { SelectComponent } from "@/components/Form/SelectComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {  Search } from "lucide-react";
import React from "react";
import CreateModalContext from "@/components/Modal/CreateModalContext";
import FormCreateEvaluation from "@/components/Form/FormCreateEvaluation";
import { EvaluationTable } from "@/components/Table/EvaluationTable";
import { useQuery } from "@tanstack/react-query";
import { getAllEvaluation } from "@/lib/evaluationServerActions";
import { Loader } from "@/components/Loader";

const Page = () => {

  const {data, isLoading} = useQuery({
    queryKey:["evaluations"],
    queryFn:getAllEvaluation,
  })


  return (
    <div className="bg-white p-5 rounded shadow">
      <div className="flex items-center justify-between my-5">
        <h1 className="font-poppins font-bold text-3xl uppercase text-zinc-800">
          Evaluations
        </h1>
        <CreateModalContext titre="Crée une évaluation">
          <FormCreateEvaluation />
        </CreateModalContext>
      </div>
      <div className="flex items-center gap-1 my-5 justify-end">
        <div className="flex gap-1">
          <Input className="" placeholder="Saisir un nom..." />
          <Button>
            <Search className="text-white" />
          </Button>
        </div>
        <SelectComponent
          items={["Item1", "Item2"]}
          label="Item"
          selectValue="Filtrer"
        />
      </div>
      <div className=" bg-white rounded shadow">
        {
          isLoading ? <Loader />:
          <EvaluationTable data={data} /> 
        }
      </div>
    </div>
  );
};

export default Page;
