/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const FormCreateUE = () => {
  return (
    <form>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="intitu">Intitulé de l'UE</Label>
          <Input id="intitu" placeholder="Saisir l'intitulé de l'ue..." />
        </div>

        <div className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button className="px-16 text-white">Ajouter</Button>
        </div>
      </div>
    </form>
  );
};

export default FormCreateUE;
