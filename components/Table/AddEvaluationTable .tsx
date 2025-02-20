import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "../ui/input";

export function AddEvaluationTable({ data }) {
  console.log(data);

  return (
    <Table className="font-poppins border rounded">
      <TableHeader>
        <TableRow>
          <TableHead className="">Matricule</TableHead>
          <TableHead className="">Nom et prenom</TableHead>
          <TableHead className="">Controle continue</TableHead>
          <TableHead className="">Examen</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.length <= 0 ? (
          <TableRow>
            <TableCell className="font-medium text-center" colSpan={7}>
              Aucune donnée disponible
            </TableCell>
          </TableRow>
        ) : (
          data?.map((etudiant_module) => {
            return (
              <TableRow key={etudiant_module.etudiant.id}>
                <TableCell className="font-medium ">
                  <p className="px-5">{etudiant_module.etudiant.matricule}</p>
                </TableCell>

                <TableCell>
                  {etudiant_module.etudiant.nom}{" "}
                  {etudiant_module.etudiant.prenom}
                </TableCell>

                <TableCell className="" colSpan={1}>
                  <Input placeholder="saisir la note" />
                </TableCell>

                <TableCell className="">
                  <Input placeholder="saisir la note" />
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}
