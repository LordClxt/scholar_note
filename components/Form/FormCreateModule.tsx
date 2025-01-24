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

const FormCreateModule = () => {
  return (
    <form>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="nom">Nom</Label>
          <Input id="nom" placeholder="Saisir le nom du module..." />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="nom">Volume horaire</Label>
          <Input id="nom" placeholder="Saisir le volume horaire..." />
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="fil">Filière</Label>
          <Select>
            <SelectTrigger id="fil">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="1">GI</SelectItem>
              <SelectItem value="2">MIAGE</SelectItem>
              <SelectItem value="3">SCIENCE PO</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="ue">UE</Label>
          <Select>
            <SelectTrigger id="ue">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="1">UI 1</SelectItem>
              <SelectItem value="2">UE 2</SelectItem>
              <SelectItem value="3">UE 3</SelectItem>
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

export default FormCreateModule;
