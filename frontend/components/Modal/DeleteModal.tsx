"use client"
import * as React from "react";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { createPortal } from "react-dom";
import { Button } from "../ui/button";
import { Cross } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { modalDeleteContext } from "./DeleteModalContext";
import {motion} from "motion/react"

export function DeleteModal({ titre, deleteFunction, query }) {

  const queryClient = useQueryClient()

  const modaleContext = React.useContext(modalDeleteContext) as unknown as {
    isOpen: boolean;
    close: () => void;
  };

  const mutation = useMutation({
    mutationFn: deleteFunction,
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey:[query]})
        modaleContext.close()
    },
  });

  if (!modaleContext?.isOpen)return null;

  const handleDelete = ()=>{
    mutation.mutate()
  }


  return createPortal(
    <div className="fixed font-poppins z-50 bg-[hsl(231_60%_10%/0.55)] backdrop-blur-sm p-4 top-0 left-0 w-full h-full flex justify-center items-center">
      <motion.div className="w-full max-w-[580px] absolute px-4" initial={{y:-10}} animate={{y:0}}>
      <Card className="margin-line rounded-xl border-0 pl-2 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.6)]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-poppins font-semibold">
              {titre}
            </CardTitle>
            <Button onClick={modaleContext.close} variant="outline">
              <Cross className="rotate-45 text-muted-foreground" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p>Voulez vous vraiment supprimer ?</p>
        </CardContent>
        <CardFooter>
          <Button onClick={handleDelete} variant="destructive" className="w-full">SUPPRIMER</Button>

        </CardFooter>
      </Card>
      </motion.div>
    </div>,
    document.body
  );
}
