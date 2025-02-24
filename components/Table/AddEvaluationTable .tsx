import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "../ui/input";
import { AnimatePresence, motion } from "motion/react";

export function AddEvaluationTable({ data, handleChange, isCC, isExam }) {
  return (
    <Table className="font-poppins border rounded">
      <TableHeader>
        <TableRow>
          <TableHead className="">Matricule</TableHead>
          <TableHead className="">Nom et prenom</TableHead>
          <AnimatePresence>
            {isCC && (
              <motion.div>
                <TableHead className="">Controle continue</TableHead>
              </motion.div>
            )}
            {isExam && <TableHead className="">Examen</TableHead>}
          </AnimatePresence>
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
          data?.etudiants.map((etudiant_module) => {
            return (
              <TableRow key={etudiant_module.id}>
                <TableCell className="font-medium ">
                  <p className="px-5">{etudiant_module.matricule}</p>
                </TableCell>

                <TableCell>
                  {etudiant_module.nom} {etudiant_module.prenom}
                </TableCell>
                <AnimatePresence>
                  {isCC && (
                    <motion.div
                    className="w-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <TableCell className="w-full" colSpan={1}>
                        <Input
                          defaultValue={0}
                          min={0}
                          max={20}
                          onChange={(e) => handleChange(e, etudiant_module.id)}
                          name={`notecc_${etudiant_module.id}`}
                          placeholder="saisir la note"
                          className="w-full"
                        />
                      </TableCell>
                    </motion.div>
                  )}
                  {isExam && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <TableCell className="">
                        <Input
                          defaultValue={0}
                          min={0}
                          max={20}
                          onChange={(e) => handleChange(e, etudiant_module.id)}
                          name={`noteex_${etudiant_module.id}`}
                          placeholder="saisir la note"
                        />
                      </TableCell>
                    </motion.div>
                  )}
                </AnimatePresence>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}
