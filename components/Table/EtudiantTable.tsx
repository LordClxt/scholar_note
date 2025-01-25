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
import { useQuery } from "@tanstack/react-query";
import { getAllFiliere } from "@/lib/filiereServerActions";
import { Loader } from "../Loader";
import { deleteEtudiant } from "@/lib/etudiantServerActions";
import FormCreateEtudiant from "../Form/FormCreateEtudiant";

export function EtudiantTable({ data }) {
  // Récupération des filières

  const { data: filieres, isLoading: filiereLoading } = useQuery({
    queryKey: ["filieres"],
    queryFn: getAllFiliere,
  });

  if (filiereLoading) {
    return <Loader />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">Numéro</TableHead>
          <TableHead className="">Matricule</TableHead>
          <TableHead className="">Nom</TableHead>
          <TableHead className="">Prénom</TableHead>
          <TableHead className="">Sexe</TableHead>
          <TableHead className="">Addresse</TableHead>
          <TableHead className="">Filière</TableHead>
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
          data.data?.map((etudiant) => {
            const filiere = filieres.data?.find(
              (filiere) => filiere.id == etudiant.id_filiere
            );

            return (
              <TableRow key={etudiant.id}>
                <TableCell className="font-medium">{etudiant.id}</TableCell>

                <TableCell>{etudiant.matricule}</TableCell>
                <TableCell>{etudiant.nom}</TableCell>
                <TableCell>{etudiant.prenom}</TableCell>
                <TableCell>{etudiant.sexe}</TableCell>
                <TableCell>{etudiant.adresse}</TableCell>
                <TableCell>{filiere.nom}</TableCell>

                <TableCell className="flex gap-1 justify-end">
                  <ModifierModalContext titre={`Modifier la periode`}>
                    <FormCreateEtudiant
                      data={{
                        id: etudiant.id,
                        nom: etudiant.nom,
                        prenom: etudiant.prenom,
                        matricule: etudiant.matricule,
                        sexe: etudiant.sexe,
                        adresse: etudiant.adresse,
                        id_filiere: etudiant.id_filiere,
                      }}
                    />
                  </ModifierModalContext>
                  <DeleteModalContext
                    query="etudiants"
                    deleteFunction={() => deleteEtudiant(etudiant.id)}
                    titre="Supprimer cet-etudiant ?"
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
