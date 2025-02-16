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

const FiltreModule = ({ modules, handleModuleChange, select, setSelect }) => {
  return (
    <div className="grid gap-2">
      <Select
        onValueChange={(value) => {
          setSelect(value);
          handleModuleChange(value);
        }}
        value={select}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Filtrer selon le module" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Module</SelectLabel>
            {modules.map((module) => (
              <SelectItem key={module.id} value={module.id}>
                {module.libele}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FiltreModule;
