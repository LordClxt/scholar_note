"use client"
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export default function Page() {

   const componentRef = useRef(null);

   

   const handleDownloadPDF = () => {
    // Capturer l'élément DOM référencé par componentRef
    html2canvas(componentRef.current).then((canvas) => {
      // Convertir le canvas en image
      const imgData = canvas.toDataURL("image/png");

      // Créer un objet jsPDF
      const pdf = new jsPDF({
        orientation: "p", // 'p' pour portrait, 'l' pour paysage
        unit: "mm",       // Unité de mesure (mm, cm, in)
        format: "a4",     // Format du document (a4, letter, etc.)
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
    <div>
        <button onClick={handleDownloadPDF}>Download</button>
        <Bulletin refComponent={componentRef} />
    </div>
  );
}

function Bulletin({refComponent}){
    return (
        <div ref={refComponent} className="flex p-20 flex-col gap-10 font-poppins">
        {/* Header */}
        <div className="bg-gray-300 rounded-lg text-gray-900 font-bold flex justify-center flex-col items-center p-5">
            <p>RELEVE DE NOTE - PERIODE</p>
            <p>Annee scolaire: 2024 - 2025</p>
        </div>

        {/* User information */}
        <div className="flex items-center gap-3 text-[13px]">
            <div className="size-32  border-2"></div>
            <div className="flex flex-col gap-1">
            <p>Matricule: 22INF00529</p>
            <p>Nom: TINDE</p>
            <p>Prenom: PEHE CALIXTE HASSAN</p>
            <p>email: hassanetinde@gmail.com</p>
            <p>Sexe: masculin</p>
            <p>Classe: LINCENC3 GI</p>
            </div>
        </div>

        {/* Table */}
        <table className="border-collapse rounded-t overflow-y-hidden border border-gray-300">
            <thead className="bg-gray-300 text-gray-900 ">
            <tr className="text-left">
                <th className="py-2 pl-3 border">Matières</th>
                <th className="py-2 pl-3 border">Coef.</th>
                <th className="py-2 pl-3 border">Moy</th>
                <th className="py-2 pl-3 border">RG</th>
            </tr>
            </thead>

            <tbody>
            <tr>
                <td className="border py-2 pl-3">Mathématique</td>
                <td className="border py-2 pl-3">5</td>
                <td className="border py-2 pl-3">17</td>
                <td className="border py-2 pl-3">1</td>
            </tr>
            <tr>
                <td className="border py-2 pl-3">Mathématique</td>
                <td className="border py-2 pl-3">5</td>
                <td className="border py-2 pl-3">17</td>
                <td className="border py-2 pl-3">1</td>
            </tr>
            <tr>
                <td className="border py-2 pl-3">Mathématique</td>
                <td className="border py-2 pl-3">5</td>
                <td className="border py-2 pl-3">17</td>
                <td className="border py-2 pl-3">1</td>
            </tr>
            </tbody>
            <tfoot className="">
            <tr>
                <td colSpan={4} className="bg-gray-300">
                <div className="p-2  flex justify-between">
                    <div className="w-1/3">
                    <p>RESULTAT TRIMESTRIELS</p>
                    </div>
                    <div className="text-[13px] flex w-2/3 justify-between">
                    <p>Totale: <strong>123</strong></p>
                    <p>Coef: <strong>4</strong></p>
                    <p>Moyenne Générale: <strong>14</strong></p>
                    <p>Rang: <strong>1 / 24</strong></p>
                    </div>
                </div>
                </td>
            </tr>
            </tfoot>
        </table>
        </div>
    )
}