import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ModifierModalContext from "../Modal/ModifierContext";
import FormCreatePeriode from "../Form/FormCreatePeriode";
import { deletePeriode } from "@/lib/periodeServerActions";
import DeleteModalContext from "../Modal/DeleteModalContext";

export function PeriodeTable({ data }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">Numéro</TableHead>
          <TableHead className="">Date de début</TableHead>
          <TableHead className="">Date de fin</TableHead>
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
          data.data?.map((periode) => (
            <TableRow key={periode.id}>
              <TableCell className="font-medium">{periode.id}</TableCell>
              <TableCell>{periode.date_debut}</TableCell>
              <TableCell>{periode.date_fin}</TableCell>
              <TableCell className="flex gap-1 justify-end">
                <ModifierModalContext titre={`Modifier la periode`}>
                  <FormCreatePeriode
                    data={{
                      id: periode.id,
                      date_debut: periode.date_debut,
                      date_fin: periode.date_fin,
                    }}
                  />
                </ModifierModalContext>
                <DeleteModalContext
                  query="periodes"
                  deleteFunction={() => deletePeriode(periode.id)}
                  titre="Supprimer cette periode ?"
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
