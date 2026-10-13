import React from "react";
import { Badge } from "./ui/badge";

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
    <div className="flex font-poppins gap-3 bg-white px-5 py-10 rounded shadow">
      <div className="flex flex-grow flex-col gap-1 items-start">
        <h2 className="font-bold uppercase text-lg underline">
          Evaluation {module}
        </h2>
        <p>
          Date: <em>{date}</em>
        </p>
        <p>
          Credit: <em>{credit}</em>
        </p>
        <p>
          Periode: <em>{date_debut} - {date_fin}</em>
        </p>
        <p>
          Enseignant: <em>{enseignant}</em>
        </p>
        <Badge className="shadow-none text-white px-10 ring-1 ring-yellow-500 ring-offset-1">
          {type_evaluation}
        </Badge>
      </div>
      <div className="px-5 flex items-center">
        <h2 className="ring ring-yellow-400 ring-offset-2 flex items-center justify-center rounded-full font-bold text-2xl text-white bg-yellow-400 w-[5rem] h-[5rem]">
          <span>{note}</span>/<span>20</span>
        </h2>
      </div>
    </div>
  );
};

export default CardNote;
