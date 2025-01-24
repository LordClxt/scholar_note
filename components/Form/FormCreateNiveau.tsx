import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const FormCreateNiveau = () => {
  return (
    <form>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="nom">Nom</Label>
          <Input id="nom" placeholder="Saisir le nom du niveau..." />
        </div>

        <div className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button className="px-16 text-white">Ajouter</Button>
        </div>
      </div>
    </form>
  );
};

export default FormCreateNiveau;
