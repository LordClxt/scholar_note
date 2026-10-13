/* eslint-disable @typescript-eslint/ban-ts-comment */
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
import { formatNote } from "@/lib/mention";
import { Loader } from "../Loader";
import { getAllEtudiant } from "@/lib/etudiantServerActions";
import { getAllModule } from "@/lib/moduleServerActions";
import { getAllPeriode } from "@/lib/periodeServerActions";
import FormCreateEvaluation from "../Form/FormCreateEvaluation";
import { deleteEvaluation } from "@/lib/evaluationServerActions";
import { useStore } from "@/store";
import { getAllFiliere } from "@/lib/filiereServerActions";

export function EvaluationTable({ data }) {
  // @ts-ignore
  const user = useStore((state) => state.user);

  const evaluations = data.data?.filter(
    (evaluation) => evaluation.id_enseignant === user.id
  );
  const { data: etudiants, isLoading: etudiantLoading } = useQuery({
    queryKey: ["etudiants"],
    queryFn: getAllEtudiant,
  });

  const { data: modules, isLoading: moduleLoading } = useQuery({
    queryKey: ["modules"],
    queryFn: getAllModule,
  });

  const { data: periodes, isLoading: periodeLoading } = useQuery({
    queryKey: ["periodes"],
    queryFn: getAllPeriode,
  });
  const { data: filieres, isLoading: filiereLoading } = useQuery({
    queryKey: ["filieres"],
    queryFn: getAllFiliere,
  });

  if (etudiantLoading || moduleLoading || periodeLoading || filiereLoading) {
    return <Loader />;
  }

  let num = 0;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">Numéro</TableHead>
          <TableHead className="">Matricule</TableHead>
          <TableHead className="">Note</TableHead>
          <TableHead className="">Module</TableHead>
          <TableHead className="">Filiere</TableHead>
          <TableHead className="">Periode</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {evaluations?.length <= 0 ? (
          <TableRow>
            <TableCell className="font-medium text-center" colSpan={7}>
              Aucune donnée disponible
            </TableCell>
          </TableRow>
        ) : (
          evaluations?.map((evaluation) => {


            const filiere = filieres.data?.find(filiere=>filiere.id == evaluation.etudiant.id_filiere)

            const etudiant = etudiants.data?.find(
              (etudiant) => etudiant.matricule === evaluation.matricule
            );

            const moduleData = modules.data?.find(
              (mod) => mod.id === evaluation.id_module
            );

            const periode = periodes.data?.find(
              (periode) => periode.id === evaluation.id_periode
            );

            num++;

            return (
              <TableRow key={evaluation.id}>
                <TableCell className="font-medium">
                  <p className="px-5">{num}</p>
                </TableCell>

                <TableCell>{etudiant.matricule}</TableCell>
                <TableCell><span className={"font-hand text-2xl font-bold leading-none " + (evaluation.note >= 10 ? "text-primary" : "text-pen")}>{formatNote(evaluation.note)}</span></TableCell>
                <TableCell>{moduleData.libele}</TableCell>
                <TableCell>{filiere.nom}</TableCell>
                <TableCell>
                  {periode.date_debut} au {periode.date_fin}
                </TableCell>

                <TableCell className="flex gap-1 justify-end">
                  <ModifierModalContext titre={`Modifier la periode`}>
                    <FormCreateEvaluation
                      data={{
                        id: evaluation.id,
                        date: evaluation.date,
                        coefficient: evaluation.coefficient,
                        id_etudiant: evaluation.id_etudiant,
                        id_enseignant: evaluation.id_enseignant,
                        id_module: evaluation.id_module,
                        id_periode: evaluation.id_periode,
                        note: evaluation.note,
                        type_evaluation: evaluation.type_evaluation,
                        matricule: etudiant.matricule,
                      }}
                    />
                  </ModifierModalContext>
                  <DeleteModalContext
                    query="evaluations"
                    deleteFunction={() => deleteEvaluation(evaluation.id)}
                    titre="Supprimer cette évaluation ?"
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
