/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import { API_URL } from "@/lib/api";
import CheckBoxComponent from "@/components/ChackBox";
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
import { getAllPeriode } from "@/lib/periodeServerActions";
import { useStore } from "@/store";
import { SelectTrigger } from "@radix-ui/react-select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();

  // @ts-ignore
  const user = useStore((state) => state.user);

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["etudiant_personne"],
    queryFn: () => getModuleEvaluation(user.specialite),
  });

  const {
    data: periodes,
    isLoading: periodeLoading,
    isSuccess: periodeSuccess,
  } = useQuery({
    queryKey: ["periodes"],
    queryFn: getAllPeriode,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) =>
      axios.post(`${API_URL}/ajouter/notes`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["evaluations"] });
      router.push("/dashboard/evaluation");
    },
  });

  const [periodesState, setPeriodesState] = useState({ data: [] });
  const [periode, setPeriode] = useState("");
  const [isExam, setIsExam] = useState(false);
  const [isCC, setIsCC] = useState(false);
  const [localData, setLoacalData] = useState({
    etudiants: [],
    id_module: 0,
    id_enseignant: 0,
    id_periode: "",
    isExam: isExam,
    isCC: isCC,
  });
  // const [openAlert, setOpenAlert] = useState(false)

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    setLoacalData({
      ...localData,
      etudiants: localData.etudiants.map((etudiant) =>
        etudiant.id == id
          ? {
              ...etudiant,
              [name]: value,
            }
          : etudiant
      ),
    });
  };

  const handlePeriodeChange = (text) => {
    setPeriode(text);
    setLoacalData({
      ...localData,
      id_periode: text,
    });
  };

  const handleSubmit = () => {
    if (periode == "") {
      alert("Veuillez choisir une periode");
    } else if (!isCC && !isExam) {
      alert("Veuillez cochez 'examen' ou 'controle continue'");
    } else {
      // @ts-ignore
      mutation.mutate(localData);
    }
  };

  useEffect(() => {
    if (isSuccess && periodeSuccess) {
      setPeriodesState(periodes);
      setLoacalData({
        id_module: data[0]?.module?.id,
        id_enseignant: user.id,
        id_periode: periode,
        isExam: isExam,
        isCC: isCC,
        etudiants: [
          ...data.map((etudiant) => ({
            id: etudiant.etudiant.id,
            nom: etudiant.etudiant.nom,
            matricule: etudiant.etudiant.matricule,
            prenom: etudiant.etudiant.prenom,
            [`notecc_${etudiant.etudiant.id}`]: 0,
            [`noteex_${etudiant.etudiant.id}`]: 0,
          })),
        ],
      });
    }
  }, [isSuccess, data, periodes, periodeSuccess]);

  if (periodeLoading) {
    return <Loader />;
  }

  return (
    <>
      {mutation.isPending && <Loader />}
      <div className="bg-white p-5 rounded shadow">
        <div className="flex items-center justify-between my-5">
          <h1 className="font-poppins font-bold text-3xl uppercase text-zinc-800">
            Ajouter évaluations
          </h1>
          <Button
            onClick={handleSubmit}
            className="text-white font-bold  px-[7rem]"
          >
            <Save className="font-bold" /> Ajouter
          </Button>
        </div>
        <div className="flex justify-end gap-2">
          <CheckBoxComponent
            onChange={() => {
              setIsCC(!isCC);
              setLoacalData({...localData, isCC:!isCC})
            }}
            value={isCC}
            text="Controle continue"
          />
          <CheckBoxComponent
            onChange={() => {
              setIsExam(!isExam);
              setLoacalData({...localData, isExam:!isExam})
            }}
            value={isExam}
            text="Examen"
          />
          <div className="my-10">
            <Select
              onValueChange={(value) => {
                handlePeriodeChange(value);
              }}
              value={periode}
              required
            >
              <SelectTrigger id="module">
                <SelectValue placeholder="Selectionner une periode" />
              </SelectTrigger>
              <SelectContent position="popper">
                {periodesState?.data.map((periode) => (
                  <SelectItem key={periode.id} value={periode.id}>
                    {periode.date_debut}-{periode.date_fin}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <AddEvaluationTable
            isExam={isExam}
            isCC={isCC}
            handleChange={handleChange}
            data={localData}
          />
        )}
      </div>
    </>
  );
};

export default Page;
