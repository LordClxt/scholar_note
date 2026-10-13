import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFiliereModule } from "@/lib/filiereModuleServerActions";
import { Loader } from "../Loader";

const FiliereModuleTable = ({ data, id_filiere }) => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn:(id)=>deleteFiliereModule(id),
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey: ["filiere_modules", id_filiere+""],
              });
        },
        onError:(err)=>{
            console.log(err);
            
        }
    })
  return (
    <>
        {
            mutation.isPending && <Loader />
        }
        <Table>
        <TableHeader>
            <TableRow>
            <TableHead className="">Nom module</TableHead>
            <TableHead>Volume horaire</TableHead>
            <TableHead className="text-center">Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {data.map((module) => {
                
                
                return(
            <TableRow key={module.id}>
                <TableCell className="">
                <p className="px-5">{module.libele}</p>
                </TableCell>
                <TableCell>{module.volume_horaire}</TableCell>
                <TableCell className="w-[100px]">
                    <Button onClick={()=>{
                        mutation.mutate(module.filiere_module[0].id)
                    }} variant="destructive" className="font-bold font-poppins text-white">
                        Supprimer
                    </Button>
                </TableCell>
            </TableRow>
            )})}
        </TableBody>
        </Table>
    </>
  );
};

export default FiliereModuleTable;
