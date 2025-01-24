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

const FormCreateEtudiant = () => {
  return (
    <form>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="name">Matricule</Label>
          <Input id="name" placeholder="Saisir le matricule..." />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Nom</Label>
            <Input id="name" placeholder="Saisir le nom..." />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Prenom</Label>
            <Input id="name" placeholder="Saisir le prenom..." />
          </div>
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="framework">Filière</Label>
          <Select>
            <SelectTrigger id="framework">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="math">Mathématique appliqué</SelectItem>
              <SelectItem value="info">Génie Informatique</SelectItem>
              <SelectItem value="ada">Administration des affaires</SelectItem>
              <SelectItem value="scpo">Science politique</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="framework">Niveau</Label>
          <Select>
            <SelectTrigger id="framework">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="licence1">LICENCE 1</SelectItem>
              <SelectItem value="licence2">LICENCE 2</SelectItem>
              <SelectItem value="licence3">LICENCE 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="framework">Sexe</Label>
          <Select>
            <SelectTrigger id="framework">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="feminin">Masculin</SelectItem>
              <SelectItem value="masculin">Feminin</SelectItem>
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

export default FormCreateEtudiant;
