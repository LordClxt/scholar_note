/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import CardNote from "@/components/CardNote";
import { Loader } from "@/components/Loader";
import FiltreModule from "@/components/MesNotes/FiltreModule";
import FiltrePeriode from "@/components/MesNotes/FiltrePeriode";
import { Button } from "@/components/ui/button";
import { mesEvaluation } from "@/lib/etudiantServerActions";
import { getAllFiliereByModule } from "@/lib/filiereModuleServerActions";
import { getAllPeriode } from "@/lib/periodeServerActions";
import { useStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { Cross } from "lucide-react";
import React, { useEffect, useState } from "react";

const Page = () => {
  // @ts-ignore
  const user = useStore((state) => state.user);

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["notes", user.id],
    queryFn: () => mesEvaluation(user.matricule),
  });

  const { data: periodes, isLoading: periodeLoading } = useQuery({
    queryKey: ["periodes"],
    queryFn: getAllPeriode,
  });

  const { data: modules, isLoading: modulesLoading } = useQuery({
    queryKey: ["filiere_module", user.id_filiere],
    queryFn: () => getAllFiliereByModule(user.id_filiere),
  });

  const [localData, setLocalData] = useState([]);
  const [periodeState, setPeriodeState] = useState({ data: [] });
  const [moduleState, setModulesState] = useState([]);

  useEffect(() => {
    if (isSuccess && !periodeLoading && !modulesLoading) {
      setPeriodeState(periodes);
      setLocalData(data);
      setModulesState(modules);
    }
  }, [isSuccess, data, periodes, periodeLoading, modulesLoading, modules]);

  const [selectModule, setSelectModule] = useState("");
  const [selectedPeriode, setSelectedPeriode] = React.useState("");

  const handlePeriodeChange = (periode) => {
    let filt = data
    if(selectModule){
      filt = data.filter(
        (evaluation) => evaluation.module.id == selectModule
      );
    }
    const filterEvaluation = filt.filter(
      (evaluation) => evaluation.periode.id == periode
    );
    setLocalData(filterEvaluation);
  };
  const handleModuleChange = (module) => {
    let filt = data
    if(selectedPeriode){
      filt = filt.filter(
        (evaluation) => evaluation.periode.id == selectedPeriode
      );
    }
    const filterEvaluation = filt.filter(
      (evaluation) => evaluation.module.id == module
    );
    setLocalData(filterEvaluation);
  };

  const resetFilter = () => {
    setLocalData(data);
    setSelectModule("");
    setSelectedPeriode("");
  };

  if (periodeLoading || isLoading) {
    return <Loader />;
  }
  return (
    <div className=" flex flex-col gap-2">
      <div className="flex flex-col gap-3 bg-white p-6 rounded shadow">
        <h1 className="font-bold font-poppins text-3xl">MES EVALUATIONS</h1>
        <div className="flex gap-1 justify-end ">
          <FiltrePeriode
            selected={selectedPeriode}
            setSelected={setSelectedPeriode}
            handlePeriodeChange={handlePeriodeChange}
            periodes={periodeState}
          />
          <FiltreModule
            select={selectModule}
            setSelect={setSelectModule}
            handleModuleChange={handleModuleChange}
            modules={moduleState}
          />
          <Button
            onClick={resetFilter}
            className="font-bold font-poppins text-white"
            variant="destructive"
          >
            supprimer les filtres <Cross className="rotate-45" />
          </Button>
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : localData.length > 0 ? (
        localData.map((evaluation) => (
          <CardNote
            key={evaluation.id}
            date={evaluation.date}
            credit={evaluation.module.credit}
            date_debut={evaluation.periode.date_debut}
            date_fin={evaluation.periode.date_fin}
            enseignant={
              evaluation.enseignant.nom + " " + evaluation.enseignant.prenom
            }
            module={evaluation.module.libele}
            note={evaluation.note}
            type_evaluation={evaluation.type_evaluation}
          />
        ))
      ) : (
        <div className="font-poppins gap-3 bg-white px-5 py-5 rounded shadow text-center ">
          Vous n&apos;avez pas de note pour le moment
        </div>
      )}
    </div>
  );
};

export default Page;
