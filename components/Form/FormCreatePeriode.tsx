import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const FormCreatePeriode = () => {
  return (
    <form>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="debut">Date de début</Label>
          <Input id="debut" type="date" />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="fin">Date de fin</Label>
          <Input id="fin" type="date" />
        </div>

        <div className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button className="px-16 text-white">Ajouter</Button>
        </div>
      </div>
    </form>
  );
};

export default FormCreatePeriode;
