/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { GradeMark } from "@/components/notebook/GradeMark";
import axios from "axios";
import { Loader } from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { getAllPeriode } from "@/lib/periodeServerActions";

export default function Page() {
  // @ts-ignore
  const user = useStore((state) => state?.user);

  const { data, isLoading } = useQuery({
    queryKey: ["bulletin"],
    queryFn: () =>
      axios
        .get("http://127.0.0.1:8000/evaluations/moyenne/" + user.matricule)
        .then((res) => res.data),
  });

  const { data:periodes, isLoading:periodeLoading } = useQuery({
    queryKey: ["periodes"],
    queryFn: getAllPeriode,
  });

  const bull1 = useRef(null);
  const bull2 = useRef(null);

  if (isLoading || periodeLoading) {
    return <Loader />;
  }

  console.log(periodes);
  
  const sem1 = data?.filter(sem=>sem.periode == `${periodes.data[0].date_debut}-${periodes.data[0].date_fin}`)
  const sem2 = data?.filter(sem=>sem.periode == `${periodes.data[1].date_debut}-${periodes.data[1].date_fin}`)


  const handleDownloadPDF = (refComp) => {
    // Capturer l'élément DOM référencé par componentRef
    html2canvas(refComp.current).then((canvas) => {
      // Convertir le canvas en image
      const imgData = canvas.toDataURL("image/jpeg", 0.7);

      // Créer un objet jsPDF
      const pdf = new jsPDF({
        orientation: "p", // 'p' pour portrait, 'l' pour paysage
        unit: "mm", // Unité de mesure (mm, cm, in)
        format: "a4", // Format du document (a4, letter, etc.)
      });

      // Ajouter l'image au PDF
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      // Générer et télécharger le PDF
      pdf.save("bulletin.pdf");
    });
  };

  return (
    <div className="flex flex-col gap-3">
      {/* <button onClick={handleDownloadPDF}>Download</button> */}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex justify-between sheet p-5">
            <div>
              <p className="font-semibold text-foreground font-poppins">
                Bulletin de la période du {data[0].periode.replace(/-(\d{4}-)/, " au $1")}
              </p>
            </div>
            <div>
              <Button onClick={()=>handleDownloadPDF(bull1)}>Telecharger</Button>
            </div>
          </div>
          <Bulletin periode={`${periodes.data[0].date_debut}-${periodes.data[0].date_fin}`} email={user.email} matricule={user.matricule} nom={user.nom} prenom={user.prenom} sexe={user.sexe} refComponent={bull1} matieres_info={sem1} />
          <div className="flex justify-between sheet p-5">
            <div>
              <p className="font-semibold text-foreground font-poppins">
                Bulletin de la période du {data[1].periode.replace(/-(\d{4}-)/, " au $1")}
              </p>
            </div>
            <div>
              <Button onClick={()=>handleDownloadPDF(bull2)}>Telecharger</Button>
            </div>
          </div>
          <Bulletin periode={`${periodes.data[1].date_debut}-${periodes.data[1].date_fin}`} email={user.email} matricule={user.matricule} nom={user.nom} prenom={user.prenom} sexe={user.sexe} refComponent={bull2} matieres_info={sem2} />
        </>
      )}
      {/* <Bulletin refComponent={componentRef} /> */}
    </div>
  );
}

function Bulletin({
  refComponent,
  matricule,
  nom,
  prenom,
  email,
  sexe,
  matieres_info,
  periode
}) {

   const somme_moy = matieres_info.reduce((t, m) => t + m.moyenne * m.credit, 0)
   const somme_credit = matieres_info.reduce((t, m) => t + m.credit, 0)
   const credit_valid = matieres_info.reduce((t, m) => t + (m.moyenne >= 10 ? m.credit : 0), 0)
  const moyenne_generale = somme_credit ? somme_moy / somme_credit : 0
  const valide = somme_credit > 0 && somme_credit == credit_valid
  return (
    <div ref={refComponent} className="sheet sheet-stack margin-line flex flex-col gap-8 font-poppins bg-white py-12 pl-16 pr-12">
      {/* En-tête */}
      <div className="border-b-2 border-foreground pb-4">
        <h2 className="text-2xl font-semibold tracking-tight">Relevé de notes</h2>
        <p className="text-muted-foreground">Période du {periode.replace(/-(\d{4}-)/, ' au $1')} - Année scolaire 2024-2025</p>
      </div>

      {/* Informations de l'étudiant */}
      <div className="flex items-start gap-6 text-sm">
        <div className="h-32 w-28 shrink-0 border border-dashed border-input rounded-sm"></div>
        <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5">
          <dt className="text-muted-foreground">Matricule</dt><dd className="font-medium">{matricule}</dd>
          <dt className="text-muted-foreground">Nom</dt><dd className="font-medium">{nom}</dd>
          <dt className="text-muted-foreground">Prénom</dt><dd className="font-medium">{prenom}</dd>
          <dt className="text-muted-foreground">Email</dt><dd>{email}</dd>
          <dt className="text-muted-foreground">Sexe</dt><dd>{sexe}</dd>
          <dt className="text-muted-foreground">Classe</dt><dd>LINCENC3 GI</dd>
        </dl>
      </div>

      {/* Matières */}
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b-2 border-foreground text-sm">
            <th className="py-2 pr-3 font-semibold">Matière</th>
            <th className="py-2 px-3 font-semibold text-right">Crédits</th>
            <th className="py-2 pl-3 font-semibold text-right">Moyenne</th>
          </tr>
        </thead>
        <tbody>
            {
                matieres_info.map((mat, index)=>{
                    return(
                    <tr key={index} className="border-b">
                        <td className="py-2.5 pr-3">{mat.matiere}</td>
                        <td className="py-2.5 px-3 text-right">{mat.credit}</td>
                        <td className={"py-2.5 pl-3 text-right font-medium " + (mat.moyenne >= 10 ? "" : "text-pen")}>{mat.moyenne}</td>
                    </tr>
                )})
            }
        </tbody>
      </table>

      {/* Résultat */}
      <div className="flex items-end justify-between gap-6">
        <p className="text-sm text-muted-foreground">
          Crédits validés : <strong className="text-foreground">{credit_valid}</strong> sur {somme_credit}
        </p>
        <div className="flex flex-col items-end">
          <p className="text-sm text-muted-foreground">Moyenne générale</p>
          <GradeMark note={moyenne_generale} size="lg" className="mt-2" />
          <p className={"mt-3 inline-flex rounded-full px-3 py-1 text-sm font-semibold " + (valide ? "bg-emerald-600/10 text-emerald-700" : "bg-pen/10 text-pen")}>{valide ? "Semestre validé" : "Semestre non validé"}</p>
        </div>
      </div>
    </div>
  );
}
