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

const FormCreateFiliere = () => {
  return (
    <form>
      <div className="grid w-full items-center gap-4">

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="name">Nom</Label>
          <Input id="name" placeholder="Saisir le nom de la filière..." />
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="framework">Sexe</Label>
          <Select>
            <SelectTrigger id="framework">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="1">Licence 1</SelectItem>
              <SelectItem value="2">Licence2</SelectItem>
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

export default FormCreateFiliere;
