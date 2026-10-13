"use client";
import React, { createContext, useState } from "react";
import { Button } from "../ui/button";
import { ModifierModal } from "./ModifierModale";

export const modalEditContext = createContext<{
  isOpen: boolean;
  close: () => void;
  open: () => void;
} | null>(null);

const ModifierModalContext = ({
  children,
  titre,
}: {
  children: React.ReactNode;
  titre: string;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <modalEditContext.Provider value={{ isOpen, close, open }}>
      <Button
        className="text-white font-bold font-poppins"
        onClick={open}
      >
        Modifier
      </Button>
      <ModifierModal titre={titre}>{children}</ModifierModal>
    </modalEditContext.Provider>
  );
};

export default ModifierModalContext;
