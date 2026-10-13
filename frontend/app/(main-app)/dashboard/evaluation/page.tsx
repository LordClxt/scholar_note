"use client";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { EvaluationTable } from "@/components/Table/EvaluationTable";
import { useQuery } from "@tanstack/react-query";
import { getAllEvaluation } from "@/lib/evaluationServerActions";
import { Loader } from "@/components/Loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllPeriode } from "@/lib/periodeServerActions";
import { getAllFiliere } from "@/lib/filiereServerActions";
import { Button } from "@/components/ui/button";
import { Cross, Plus } from "lucide-react";
import Link from "next/link";

const Page = () => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["evaluations"],
    queryFn: getAllEvaluation,
  });
  const {
    data: periodes,
    isLoading: isLoadingPeriode,
    isSuccess: isSuccesPeriode,
  } = useQuery({
    queryKey: ["periodes"],
    queryFn: getAllPeriode,
  });
  const {
    data: filieres,
    isLoading: isLoadingFiliere,
    isSuccess: isSuccesFiliere,
  } = useQuery({
    queryKey: ["filieres"],
    queryFn: getAllFiliere,
  });

  // Elements de filtre
  const [evaluations, setEvaluations] = useState({ data: [] });
  const [periodesState, setPeriodesState] = useState({ data: [] });
  const [filieresState, setFilieresState] = useState({ data: [] });
  const [periodeSelect, setPeriodeSelect] = useState("");
  const [filiereSelect, setFiliereSelect] = useState("");
  const [matriculeInput, setMatriculeInput] = useState("");

  // Recuperer des valeurs de l'api dans des états
  useEffect(() => {
    if (isSuccess && isSuccesFiliere && isSuccesPeriode) {
      setEvaluations(data);
      setFilieresState(filieres);
      setPeriodesState(periodes);
    }
  }, [data, isSuccess, isSuccesFiliere, isSuccesPeriode, filieres, periodes]);

  // LOGIQUES FILTRAGE
  const onMatriculeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMatriculeInput(e.target.value);

    let finalFilter = data?.data;

    finalFilter = finalFilter.filter((evaluation) =>
      evaluation.etudiant.matricule.includes(e.target.value)
    );

    if (filiereSelect) {
      finalFilter = finalFilter.filter(
        (evaluation) => evaluation.etudiant.id_filiere === filiereSelect
      );
    }

    if (periodeSelect) {
      finalFilter = finalFilter.filter(
        (evaluation) => evaluation.id_periode === periodeSelect
      );
    }
    setEvaluations({ data: finalFilter });
  };

  const handlerPeriodeFilter = (periode) => {
    let finalFilter = data?.data;
    finalFilter = data?.data.filter(
      (evaluation) => evaluation.id_periode === periode
    );
    if (filiereSelect) {
      finalFilter = finalFilter.filter(
        (evaluation) => evaluation.etudiant.id_filiere === filiereSelect
      );
    }
    if (matriculeInput != "") {
      finalFilter = finalFilter.filter((evaluation) =>
        evaluation.etudiant.matricule.includes(matriculeInput)
      );
    }

    setEvaluations({ data: finalFilter });
  };

  const handlerFilereFilter = (filiere) => {
    const periodeFilter = data.data?.filter(
      (evaluation) => evaluation.id_periode === periodeSelect
    );
    const newFilter = periodeFilter?.filter(
      (evaluation) => evaluation.etudiant.id_filiere === filiere
    );
    const finalFilter = newFilter.filter((evaluation) =>
      evaluation.etudiant.matricule.includes(matriculeInput)
    );
    setEvaluations({ data: finalFilter });
  };

  // Renitialiser les filtres
  const resetFilter = () => {
    setPeriodeSelect("");
    setFiliereSelect("");
    setEvaluations(data);
    setMatriculeInput("");
  };

  if (isLoading || isLoadingFiliere || isLoadingPeriode) {
    return <Loader />;
  }

  return (
    <div className="bg-white p-5 rounded shadow">
      <div className="flex items-center justify-between my-5">
        <h1 className="font-poppins font-bold text-3xl uppercase text-zinc-800">
          Evaluations
        </h1>
        <Button className="text-white font-bold font-poppins px-20" asChild>
          <Link href="/dashboard/evaluation/ajouter" className="flex">
            <Plus />
            Ajouter
          </Link>
        </Button>
      </div>
      <div className="flex">
        <div className="flex items-center gap-1 my-5 justify-end w-full">
          <div className="flex gap-1">
            <Input
              className=""
              value={matriculeInput}
              onChange={onMatriculeChange}
              placeholder="Saisir un matricule..."
            />
          </div>

          {/* FILTRE FILIERE */}
          <div className="flex flex-col space-y-1.5">
            <Select
              onValueChange={(value) => {
                setFiliereSelect(value);
                handlerFilereFilter(value);
              }}
              value={filiereSelect}
              required
              name="module"
            >
              <SelectTrigger id="module">
                <SelectValue placeholder="Selectionner une filiere" />
              </SelectTrigger>
              <SelectContent position="popper">
                {filieresState.data?.map((filiere) => (
                  <SelectItem key={filiere.id} value={filiere.id}>
                    {filiere.nom}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* FILTRE PERIODE */}
          <div className="flex flex-col space-y-1.5">
            <Select
              onValueChange={(value) => {
                setPeriodeSelect(value);
                handlerPeriodeFilter(value);
              }}
              value={periodeSelect}
              required
              name="module"
            >
              <SelectTrigger id="module">
                <SelectValue placeholder="Selectionner une periode" />
              </SelectTrigger>
              <SelectContent position="popper">
                {periodesState.data?.map((periode) => (
                  <SelectItem key={periode.id} value={periode.id}>
                    {periode.date_debut} - {periode.date_fin}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={resetFilter}
            className="font-bold font-poppins text-white"
            variant="destructive"
          >
            supprimer les filtres <Cross className="rotate-45" />
          </Button>
        </div>
      </div>
      <div className=" bg-white rounded shadow">
        {isLoading ? <Loader /> : <EvaluationTable data={evaluations} />}
      </div>
    </div>
  );
};

export default Page;
