/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
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
          <div className="flex justify-between bg-white rounded shadow p-5">
            <div>
              <p className="font-semibold text-gray-700 font-poppins">
                Bulletin du {data[0].periode}
              </p>
            </div>
            <div>
              <Button onClick={()=>handleDownloadPDF(bull1)}>Telecharger</Button>
            </div>
          </div>
          <Bulletin periode={`${periodes.data[0].date_debut}-${periodes.data[0].date_fin}`} email={user.email} matricule={user.matricule} nom={user.nom} prenom={user.prenom} sexe={user.sexe} refComponent={bull1} matieres_info={sem1} />
          <div className="flex justify-between bg-white rounded shadow p-5">
            <div>
              <p className="font-semibold text-gray-700 font-poppins">
                Bulletin du {data[1].periode}
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

   let somme_moy = 0
   let somme_credit=0
   let credit_valid = 0
  return (
    <div ref={refComponent} className=" flex p-20 flex-col gap-10 font-poppins bg-white rounded shadow">
      {/* Header */}
      <div className="bg-gray-300 rounded-lg text-gray-900 font-bold flex justify-center flex-col items-center p-5">
        <p>RELEVE DE NOTE - {periode}</p>
        <p>Annee scolaire: 2024 - 2025</p>
      </div>

      {/* User information */}
      <div className="flex items-center gap-3 text-[13px]">
        <div className="size-32  border-2"></div>
        <div className="flex flex-col gap-1">
          <p>Matricule: {matricule}</p>
          <p>Nom: {nom}</p>
          <p>Prenom: {prenom}</p>
          <p>email: {email}</p>
          <p>Sexe: {sexe}</p>
          <p>Classe: LINCENC3 GI</p>
        </div>
      </div>

      {/* Table */}
      <table className=" border-collapse rounded-t overflow-hidden border border-gray-300">
        <thead className="bg-gray-300 text-gray-900 ">
          <tr className="text-left">
            <th className="py-2 pl-3 border">Matières</th>
            <th className="py-2 pl-3 border">Credit</th>
            <th className="py-2 pl-3 border">Moy</th>
            {/* <th className="py-2 pl-3 border">RG</th> */}
          </tr>
        </thead>
        <tbody>
            {
                matieres_info.map((mat, index)=>{
                    somme_moy += mat.moyenne * mat.credit
                    somme_credit += mat.credit
                    if(mat.moyenne >= 10){
                      credit_valid += mat.credit
                    }
                    return(
                    <tr key={index}>
                        <td className="py-2 pl-3 border">{mat.matiere}</td>
                        <td className="py-2 pl-3 border">{mat.credit}</td>
                        <td className="py-2 pl-3 border">{mat.moyenne}</td>
                    </tr>
                )})
            }
        </tbody>
        <tfoot className="rounded-b overflow-hidden">
          <tr>
            <td colSpan={4} className="bg-gray-300 rounded-b">
              <div className="p-2  flex justify-between">
                <div className="w-1/3">
                  <p>RESULTAT TRIMESTRIELS</p>
                </div>
                <div className="text-[13px] flex w-2/3 justify-between">
                  <p>
                    Credit accumulé: <strong>{credit_valid}</strong>
                  </p>
                  <p>
                    Moyenne Générale: <strong className={somme_moy/somme_credit ? "text-green-500":"text-red-500"}>{somme_moy/somme_credit}</strong>
                  </p>
                  <p>
                    Verdict: <strong className={somme_credit == credit_valid ? "text-green-500":"text-red-500"}>{somme_credit == credit_valid ? "Semestre Validé":"Semestre non validé"}</strong>
                  </p>
                </div>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
