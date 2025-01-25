"use client";
import React, { createContext, useState } from "react";
import { Button } from "../ui/button";
import { DeleteModal } from "./DeleteModal";

export const modalDeleteContext = createContext<{
  isOpen: boolean;
  close: () => void;
  open: () => void;
} | null>(null);

const DeleteModalContext = ({
  titre,deleteFunction, query}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <modalDeleteContext.Provider value={{ isOpen, close, open }}>
      <Button
        variant="destructive"
        className="text-white font-bold font-poppins"
        onClick={open}
      >
        Supprimer
      </Button>
      <DeleteModal query={query} titre={titre} deleteFunction={deleteFunction}  />
    </modalDeleteContext.Provider>
  );
};

export default DeleteModalContext;
