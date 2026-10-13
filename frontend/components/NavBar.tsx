"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { SidebarTrigger } from "./ui/sidebar";
import UserModal from "./UserModal";

const titres: Record<string, string> = {
  "/dashboard": "Tableau de bord",
  "/dashboard/etudiant": "Étudiants",
  "/dashboard/enseignant": "Enseignants",
  "/dashboard/evaluation": "Évaluations",
  "/dashboard/evaluation/ajouter": "Saisie des notes",
  "/dashboard/filiere": "Filières",
  "/dashboard/module": "Modules",
  "/dashboard/niveau": "Niveaux",
  "/dashboard/periode": "Périodes",
  "/dashboard/ue": "Unités d'enseignement",
  "/dashboard/note": "Mes notes",
  "/dashboard/bulletin": "Bulletins",
};

const NavBar = () => {
  const path = usePathname();
  const titre = titres[path] ?? (path.startsWith("/dashboard/filiere/") ? "Filière" : "");
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b bg-card/75 px-4 py-3 backdrop-blur-md supports-[backdrop-filter]:bg-card/60">
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <span className="h-5 w-px bg-border" aria-hidden="true" />
        <p className="text-sm font-medium">{titre}</p>
      </div>
      <UserModal />
    </header>
  );
};

export default NavBar;
