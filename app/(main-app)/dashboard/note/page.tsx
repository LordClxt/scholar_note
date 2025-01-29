/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import CardNote from "@/components/CardNote";
import { Loader } from "@/components/Loader";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mesEvaluation } from "@/lib/etudiantServerActions";
import { useStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Page = () => {
  // @ts-ignore
  const user = useStore((state) => state.user);

  const { data, isLoading } = useQuery({
    queryKey: ["notes", user.id],
    queryFn: () => mesEvaluation(user.id),
  });

  return (
    <div className=" flex flex-col gap-2">
      <div className="flex flex-col gap-3 bg-white p-6 rounded shadow">
        <h1 className="font-bold font-poppins text-3xl">MES EVALUATIONS</h1>
        <div className="grid gap-2">
          <Select onValueChange={null}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filtrer mes évaluations" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Filtrer mes évaluations</SelectLabel>
                <SelectItem value="enseignant">Date</SelectItem>
                <SelectItem value="etudiant">Module</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        data.map((evaluation) => (
          <CardNote key={evaluation.id} coefficient={evaluation.coefficient}
            date={evaluation.date}
            date_debut={evaluation.periode.date_debut}
            date_fin={evaluation.periode.date_fin}
            enseignant={evaluation.enseignant.nom + " " + evaluation.enseignant.prenom}
            module={evaluation.module.libele}
            note={evaluation.note}
            type_evaluation={evaluation.type_evaluation}
          />
        ))
      )}
    </div>
  );
};

export default Page;
