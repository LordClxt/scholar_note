import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const FiltrePeriode = ({
  periodes,
  handlePeriodeChange,
  selected,
  setSelected,
}) => {
  return (
    <div className="grid gap-2">
      <Select
        onValueChange={(value) => {
          setSelected(value);
          handlePeriodeChange(value);
        }}
        value={selected}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Filtrer selon la periode" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Periodes</SelectLabel>
            {periodes.data.map((periode) => (
              <SelectItem key={periode.id} value={periode.id}>
                {periode.date_debut} - {periode.date_fin}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FiltrePeriode;
