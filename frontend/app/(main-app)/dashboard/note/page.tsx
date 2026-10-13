/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import CardNote from "@/components/CardNote";
import { Loader } from "@/components/Loader";
import { GradeMark } from "@/components/notebook/GradeMark";
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
    <div className="flex flex-col gap-4">
      <NotesHero evaluations={data?.data ?? data ?? []} />
      <div className="flex flex-wrap items-center justify-between gap-3 sheet px-5 py-4 mb-2">
        <p className="text-sm text-muted-foreground">{localData.length} évaluation{localData.length > 1 ? "s" : ""}</p>
        <div className="flex flex-wrap gap-2 justify-end">
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
            className="font-medium font-poppins"
            variant="outline"
          >
            Effacer les filtres <Cross className="rotate-45" />
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
        <div className="font-poppins gap-3 sheet px-5 py-5 text-center">
          Vous n&apos;avez pas de note pour le moment
        </div>
      )}
    </div>
  );
};

export default Page;


function NotesHero({ evaluations }) {
  const notes = Array.isArray(evaluations) ? evaluations.map((e) => e.note) : []
  const moyenne = notes.length ? notes.reduce((t, n) => t + n, 0) / notes.length : null
  const meilleure = notes.length ? Math.max(...notes) : null
  const reussies = notes.filter((n) => n >= 10).length
  return (
    <section className="ink-panel rounded-2xl p-8 shadow-[0_24px_48px_-24px_hsl(231_60%_15%/0.6)]">
      <div className="absolute inset-y-0 left-6 w-px bg-pen/70" aria-hidden="true" />
      <div className="relative flex flex-col gap-6 pl-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Mes évaluations</h1>
          <p className="mt-2 text-white/75">Toutes tes notes, corrigées et classées par module.</p>
          <div className="mt-6 flex gap-8">
            <div><p className="text-2xl font-semibold">{notes.length}</p><p className="text-sm text-white/60">notes</p></div>
            <div><p className="text-2xl font-semibold">{reussies}</p><p className="text-sm text-white/60">au-dessus de 10</p></div>
            {meilleure !== null && <div><p className="text-2xl font-semibold">{meilleure}</p><p className="text-sm text-white/60">meilleure note</p></div>}
          </div>
        </div>
        {moyenne !== null && (
          <div className="self-start md:self-auto flex flex-col items-center rounded-xl bg-white px-8 py-5 text-foreground rotate-[1.5deg] shadow-[0_18px_40px_-16px_rgba(0,0,0,0.55)]">
            <p className="text-sm text-muted-foreground">Ma moyenne</p>
            <GradeMark note={moyenne} size="lg" className="mt-1" />
          </div>
        )}
      </div>
    </section>
  )
}
