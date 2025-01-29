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
import FormCreateFiliere from "../Form/FormCreateFiliere";
import { deleteFiliere } from "@/lib/filiereServerActions";
import { getAllNiveau } from "@/lib/niveauServerActions";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "../Loader";

export function FiliereTable({ data }) {
  const { data: niveaux, isLoading } = useQuery({
    queryKey: ["niveaux"],
    queryFn: getAllNiveau,
  });

  if (isLoading) {
    return <Loader />;
  }
  let num = 0;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">Numéro</TableHead>
          <TableHead className="">Nom</TableHead>
          <TableHead className="">Niveau</TableHead>
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
          data.data?.map((filiere) => {
            num++
            const niveau = niveaux.data?.find(
              (niveau) => niveau.id === filiere.id_niveau
            );
            return (
              <TableRow key={filiere.id}>
                <TableCell className="font-medium"><p className="px-5">{num}</p></TableCell>

                <TableCell>{filiere.nom}</TableCell>
                <TableCell>{niveau.nom}</TableCell>

                <TableCell className="flex gap-1 justify-end">
                  <ModifierModalContext titre={`Modifier la periode`}>
                    <FormCreateFiliere
                      data={{
                        id: filiere.id,
                        nom: filiere.nom,
                        id_niveau: filiere.id_niveau,
                      }}
                    />
                  </ModifierModalContext>
                  <DeleteModalContext
                    query="filieres"
                    deleteFunction={() => deleteFiliere(filiere.id)}
                    titre="Supprimer cette filière ?"
                  />
                </TableCell>
              </TableRow>
            );
          })
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
