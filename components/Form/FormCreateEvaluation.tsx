import React from "react";
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

const FormCreateEvaluation = () => {
  return (
    <form>
      <div className="grid w-full items-center gap-4">

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="note">Matricule étudiant</Label>
          <Input id="note" placeholder="Saisir le matricule de l'etudiant..." />
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="note">Note</Label>
          <Input id="note" placeholder="Saisir la note..." />
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="date">Date</Label>
          <Input id="date" type="date" />
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="coef">Coefficiens</Label>
          <Input id="coef" placeholder="Saisir le coefficient..." />
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="module">Module</Label>
          <Select>
            <SelectTrigger id="module">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="math">Mathématique</SelectItem>
              <SelectItem value="français">Français</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="periode">Periode</Label>
          <Select>
            <SelectTrigger id="periode">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="math">SEMESTRE 1</SelectItem>
              <SelectItem value="français">SEMETRE 2</SelectItem>
            </SelectContent>
          </Select>
        </div>


        <div className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button className="px-16 text-white">Ajouter</Button>
        </div>
      </div>
    </form>
  );
};

export default FormCreateEvaluation;
