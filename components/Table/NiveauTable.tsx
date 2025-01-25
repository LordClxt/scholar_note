import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ModifierModalContext from "../Modal/ModifierContext";
import DeleteModalContext from "../Modal/DeleteModalContext";
import FormCreateNiveau from "../Form/FormCreateNiveau";
import { deleteNiveau } from "@/lib/niveauServerActions";

export function NiveauTable({ data }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">Numéro</TableHead>
          <TableHead className="">Nom</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.data?.length <= 0 ? (
          <TableRow>
            <TableCell className="font-medium text-center" colSpan={7}>
              Aucune donnée disponible
            </TableCell>
          </TableRow>
        ) : (
          data.data?.map((niveau) => (
            <TableRow key={niveau.id}>
              <TableCell className="font-medium">{niveau.id}</TableCell>
              <TableCell>{niveau.nom}</TableCell>
              <TableCell className="flex gap-1 justify-end">
                <ModifierModalContext titre={`Modifier la periode`}>
                  <FormCreateNiveau data={{ id: niveau.id, nom: niveau.nom }} />
                </ModifierModalContext>
                <DeleteModalContext
                  query="niveaux"
                  deleteFunction={() => deleteNiveau(niveau.id)}
                  titre="Supprimer ce niveau ?"
                />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  );
}
