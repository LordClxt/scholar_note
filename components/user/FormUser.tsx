import React from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const FormUser = () => {
  return (
    <div className="">
      <div className="mx-10 flex justify-end">
        <Button className="px-10 font-bold font-poppins">Modifier</Button>
      </div>
      <form className="bg-white mt-5 p-10 mx-10 rounded shadow ">
        <div className="grid grid-cols-2 gap-2">

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="nom">Nom</Label>
            <Input
              onChange={null}
              value={null}
              name="nom"
              id="nom"
              placeholder="Saisir le nom..."
            />
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="nom">Prénom</Label>
            <Input
              onChange={null}
              value={null}
              name="nom"
              id="nom"
              placeholder="Saisir le prénom..."
            />
          </div>
        </div>
{/* <---------------- ---------------> */}
        <div className="grid grid-cols-2 gap-2 mt-6">

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              onChange={null}
              value={null}
              name="email"
              type="email"
              id="email"
              placeholder="Saisir le nom..."
            />
          </div>

          <div className="flex flex-col space-y-1.5">
          <Label htmlFor="sexe">Sexe</Label>
          <Select value="masculin" required name="sexe">
            <SelectTrigger id="sexe">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="masculin">Masculin</SelectItem>
              <SelectItem value="feminin">Feminin</SelectItem>
            </SelectContent>
          </Select>
        </div>
        </div>
{/* <---------------- ---------------> */}

      </form>
    </div>
  );
};

export default FormUser;
