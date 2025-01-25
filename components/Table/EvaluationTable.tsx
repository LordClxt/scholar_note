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
import { Loader } from "../Loader";
import { getAllEtudiant } from "@/lib/etudiantServerActions";
import { getAllModule } from "@/lib/moduleServerActions";
import { getAllPeriode } from "@/lib/periodeServerActions";
import FormCreateEvaluation from "../Form/FormCreateEvaluation";
import { deleteEvaluation } from "@/lib/evaluationServerActions";

export function EvaluationTable({ data }) {
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

  if (etudiantLoading || moduleLoading || periodeLoading) {
    return <Loader />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">Numéro</TableHead>
          <TableHead className="">Matricule</TableHead>
          <TableHead className="">Note</TableHead>
          <TableHead className="">Coef</TableHead>
          <TableHead className="">Module</TableHead>
          <TableHead className="">Periode</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
        
          data.data?.length <= 0 ? 
          <TableRow >
              <TableCell className="font-medium text-center" colSpan={7}>Aucune donnée disponible</TableCell>
          </TableRow>:
          data.data?.map((evaluation) => {
          const etudiant = etudiants.data?.find(
            (etudiant) => etudiant.id === evaluation.id_etudiant
          );
          const moduleData = modules.data?.find(
            (mod) => mod.id === evaluation.id_module
          );

          const periode = periodes.data?.find(
            (periode) => periode.id === evaluation.id_periode
          );

          return (
            <TableRow key={evaluation.id}>
              <TableCell className="font-medium">{evaluation.id}</TableCell>

              <TableCell>{etudiant.matricule}</TableCell>
              <TableCell>{evaluation.note}</TableCell>
              <TableCell>{evaluation.coefficient}</TableCell>
              <TableCell>{moduleData.libele}</TableCell>
              <TableCell>
                {periode.date_debut}-{periode.date_fin}
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
        })}
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
