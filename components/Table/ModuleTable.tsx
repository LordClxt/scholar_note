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
import FormCreateModule from "../Form/FormCreateModule";
import { deleteModule } from "@/lib/moduleServerActions";
import { useQuery } from "@tanstack/react-query";
import { getAllFiliere } from "@/lib/filiereServerActions";
import { getAllUE } from "@/lib/ueServerActions";
import { Loader } from "../Loader";

export function ModuleTable({ data }) {
  // Récupération des filières

  const { data: filieres, isLoading: filiereLoading } = useQuery({
    queryKey: ["filieres"],
    queryFn: getAllFiliere,
  });

  // Récupérer tous les ue
  // Récupération des niveaux

  const { data: UE, isLoading: ueLoading } = useQuery({
    queryKey: ["ue"],
    queryFn: getAllUE,
  });

  if (ueLoading || filiereLoading) {
    return <Loader />;
  }

  let num = 0;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">Numéro</TableHead>
          <TableHead className="">Nom</TableHead>
          <TableHead className="">Volume horaire</TableHead>
          <TableHead className="">Filiere</TableHead>
          <TableHead className="">UE</TableHead>
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
          data.data?.map((module) => {
            num++
            const filiere = filieres.data?.find(
              (filiere) => filiere.id == module.id_filiere
            );
            const ue = UE.data?.find((ue) => ue.id == module.id_ue);
            return (
              <TableRow key={module.id}>
                <TableCell className="font-medium"><p className="px-5">{num}</p></TableCell>

                <TableCell>{module.libele}</TableCell>
                <TableCell>{module.volume_horaire}</TableCell>
                <TableCell>{filiere.nom}</TableCell>
                <TableCell>{ue.intitule}</TableCell>

                <TableCell className="flex gap-1 justify-end">
                  <ModifierModalContext titre={`Modifier la periode`}>
                    <FormCreateModule
                      data={{
                        id: module.id,
                        libele: module.libele,
                        id_filiere: module.id_filiere,
                        id_ue: module.id_ue,
                        volume_horaire: module.volume_horaire,
                      }}
                    />
                  </ModifierModalContext>
                  <DeleteModalContext
                    query="modules"
                    deleteFunction={() => deleteModule(module.id)}
                    titre="Supprimer ce module ?"
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
