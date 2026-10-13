import React from "react";
import { BookText } from "lucide-react";
import { GradeMark } from "./notebook/GradeMark";

interface CardNoteInterface {
  module: string;
  date: string;
  credit: number;
  date_debut: string;
  date_fin: string;
  enseignant: string;
  type_evaluation: string;
  note: number;
}

const CardNote = ({
  module,
  date,
  credit,
  date_debut,
  date_fin,
  enseignant,
  type_evaluation,
  note,
}: CardNoteInterface) => {
  return (
    <div className="sheet lift margin-line flex flex-col-reverse sm:flex-row sm:items-center font-poppins gap-4 pl-8 pr-6 py-6">
      <div className="flex flex-grow items-start gap-4">
        <span className="hidden sm:flex size-11 shrink-0 rounded-lg bg-primary/10 text-primary items-center justify-center">
          <BookText className="size-5" />
        </span>
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold text-lg tracking-tight">{module}</h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className={"rounded-full px-2.5 py-0.5 text-xs font-medium " + (type_evaluation === "Examen" ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary")}>{type_evaluation}</span>
            <span>{date}</span>
          </div>
          <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
            <dt className="text-muted-foreground">Crédits</dt>
            <dd>{credit}</dd>
            <dt className="text-muted-foreground">Période</dt>
            <dd>{date_debut} au {date_fin}</dd>
            <dt className="text-muted-foreground">Enseignant</dt>
            <dd>{enseignant}</dd>
          </dl>
        </div>
      </div>
      <div className="sm:px-4 flex items-center">
        <GradeMark note={note} size="md" />
      </div>
    </div>
  );
};

export default CardNote;
