/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { modalContext } from "../Modal/CreateModalContext";
import { modalEditContext } from "../Modal/ModifierContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllEtudiant } from "@/lib/etudiantServerActions";
import { getAllModule } from "@/lib/moduleServerActions";
import { getAllPeriode } from "@/lib/periodeServerActions";
import { Loader } from "../Loader";
import {
  createEvaluation,
  editEvaluation,
} from "@/lib/evaluationServerActions";

interface DataIterface {
  id?: number | undefined;
  date: string;
  coefficient: string;
  id_etudiant: number;
  id_enseignant: number;
  id_module: number;
  id_periode: number;
  note: number;
}

const FormCreateEvaluation = ({ data }: { data?: DataIterface }) => {
  const modaleContext = React.useContext(modalContext) as unknown as {
    isOpen: boolean;
    close: () => void;
  };
  // Context de modification
  const modaleEditContext = React.useContext(modalEditContext) as unknown as {
    isOpen: boolean;
    close: () => void;
  };

  //Récuperation du query client pour invalider les data en cache
  const queryClient = useQueryClient();

  const isSave = data?.id === undefined;

  const { data: etudiants, isLoading: etudiantLoading } = useQuery({
    queryKey: ["etudiants"],
    queryFn: getAllEtudiant,
  });

  const { data: modules, isLoading: moduleLoading } = useQuery({
    queryKey: ["modules"],
    queryFn: getAllModule,
  });

  const { data: periodes, isLoading: periodeLoading } = useQuery({
    queryKey: ["periodes"],
    queryFn: getAllPeriode,
  });

  
  const mutation = useMutation({
    mutationFn: isSave
    ? createEvaluation
    : (dataUpdate) => editEvaluation(dataUpdate, data.id),
    onSuccess: () => {
      // Invalider les données en cache
      queryClient.invalidateQueries({ queryKey: ["evaluations"] });

      // Fermer la modale
      if (isSave) {
        modaleContext.close();
      } else {
        modaleEditContext.close();
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  if (etudiantLoading || moduleLoading || periodeLoading) {
    return <Loader />;
  }
  // Gestion formulaire
  const [matricules, setMatricules] = useState([
    ...etudiants.data?.map((etudiant) => ({
      matricule: etudiant.matricule,
      id: etudiant.id,
    })),
  ]);
  const [modulesState, setModulesState] = useState([
    ...modules.data?.map((module) => ({
      libele: module.libele,
      id: module.id,
    })),
  ]);

  const [matriculeInput, setMatriculeInput] = useState("");
  const [moduleInput, setModuleInput] = useState("");

  const handleChangeMatriculeInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMatriculeInput(e.target.value);
    const filterMatricules = etudiants.data?.filter((etud) =>
      etud.matricule.includes(e.target.value)
    );
    setMatricules(filterMatricules);
  };
  const handleChangeModuleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModuleInput(e.target.value);
    const filterModules = modules.data?.filter((mod) =>
      mod.libele.includes(e.target.value)
    );
    setModulesState(filterModules);
  };

  const [note, setNote] = useState(isSave ? "" : data.note);
  const [coef, setCoef] = useState(isSave ? "" : data.coefficient);
  const [date, setDate] = useState(isSave ? "" : data.date);

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      id_etudiant: formData.get("id_etudiant"),
      note: note,
      date: date,
      coefficient: coef,  
      id_enseignant: 1,
      id_module: formData.get("module"),
      id_periode: formData.get("periode"),
      type_evaluation: formData.get("type_note"),
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleCreate}>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="id_etudiant">Matricule Etudiant</Label>
          <Select name="id_etudiant" required>
            <SelectTrigger id="id_etudiant">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <Input
                value={matriculeInput}
                onChange={handleChangeMatriculeInput}
                placeholder="Rechercher un matricule..."
                className="my-1"
              />
              {matricules.map((etudiant) => (
                <SelectItem key={etudiant.id} value={etudiant.id + ""}>
                  {etudiant.matricule}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="note">Note</Label>
          <Input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            type="number"
            max={20}
            min={0}
            id="note"
            name="note"
            placeholder="Saisir la note..."
          />
        </div>

        <div className="grid grid-cols-2 gap-1">

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="date">Date</Label>
            <Input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              id="date"
              name="date"
              type="date"
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="coef">Coefficiens</Label>
            <Input
              value={coef}
              onChange={(e) => setCoef(e.target.value)}
              id="coef"
              name="coefficient"
              placeholder="Saisir le coefficient..."
            />
          </div>
        </div>


        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="module">Module</Label>
          <Select required name="module">
            <SelectTrigger id="module">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <Input
                value={moduleInput}
                onChange={handleChangeModuleInput}
                placeholder="Rechercher un module..."
                className="my-1"
              />
              {modulesState.map((module) => (
                <SelectItem key={module.id} value={module.id + ""}>
                  {module.libele}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="periode">Periode</Label>
          <Select required name="periode">
            <SelectTrigger id="periode">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              {periodes.data?.map((periode) => (
                <SelectItem key={periode.id} value={periode.id + ""}>
                  {periode.date_debut} - {periode.date_fin}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="type_note">Type de note</Label>
          <Select required name="type_note">
            <SelectTrigger id="type_note">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
                <SelectItem value="dévoir">
                  Devoir
                </SelectItem>
                <SelectItem value="interrogation">
                  Interrogation
                </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex ">
          <Button className="w-full text-white">
            {isSave ? "Ajouter" : "Modifier"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default FormCreateEvaluation;
