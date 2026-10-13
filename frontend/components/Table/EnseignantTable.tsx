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
import FormCreateEnseignant from "../Form/FormCreateEnseignant";
import { deleteEnseignant } from "@/lib/enseignantServerActions";

export function EnseignantTable({ data }) {
  // Récupération des filières

  let num = 0;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">Numéro</TableHead>
          <TableHead className="">Nom</TableHead>
          <TableHead className="">Prénom</TableHead>
          <TableHead className="">Sexe</TableHead>
          <TableHead className="">Addresse</TableHead>
          <TableHead className="">Spécialité</TableHead>
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
          data.data?.map((enseignant) => {
            num++
            return (
              <TableRow key={enseignant.id}>
                <TableCell className="font-medium"><p className="px-5">{num}</p></TableCell>

                <TableCell>{enseignant.nom}</TableCell>
                <TableCell>{enseignant.prenom}</TableCell>
                <TableCell>{enseignant.sexe}</TableCell>
                <TableCell>{enseignant.adresse}</TableCell>
                <TableCell>{enseignant.specialite}</TableCell>

                <TableCell className="flex gap-1 justify-end">
                  <ModifierModalContext titre={`Modifier la periode`}>
                    <FormCreateEnseignant
                      data={{
                        id: enseignant.id,
                        nom: enseignant.nom,
                        prenom: enseignant.prenom,
                        sexe: enseignant.sexe,
                        adresse: enseignant.adresse,
                        specialite: enseignant.specialite,
                        email:enseignant.email
                      }}
                    />
                  </ModifierModalContext>
                  <DeleteModalContext
                    query="enseignants"
                    deleteFunction={() => deleteEnseignant(enseignant.id)}
                    titre="Supprimer cet-enseignant ?"
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
