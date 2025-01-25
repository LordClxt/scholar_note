import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import DeleteModalContext from "../Modal/DeleteModalContext"
import { deleteUE } from "@/lib/ueServerActions"
import ModifierModalContext from "../Modal/ModifierContext"
import FormCreateUE from "../Form/FormCreateUE"
  
  export function UETable({data}) {
    return (
      <Table className="font-poppins">
        <TableHeader>
          <TableRow>
            <TableHead className="">Numéro</TableHead>
            <TableHead className="">Intitulé</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            data.data?.length <= 0 ? 
            <TableRow >
                <TableCell className="font-medium text-center" colSpan={7}>Aucune donnée disponible</TableCell>
            </TableRow>:
          data.data?.map((ue:{id:number, intitule:string}) => (
            <TableRow key={ue.id}>
              <TableCell className="font-medium text-center">{ue.id}</TableCell>
              <TableCell>{ue.intitule}</TableCell>
              <TableCell className="justify-end flex gap-1">
                <ModifierModalContext titre={`Modifier l'ue ${ue.intitule}`}>
                  <FormCreateUE data={{id:ue.id, intitule:ue.intitule}} />
                </ModifierModalContext>
                <DeleteModalContext query="ue" deleteFunction={()=>deleteUE(ue.id)} titre="Supprimer cet-ue ?" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
    )
  }
  