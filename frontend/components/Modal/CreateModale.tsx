import * as React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { createPortal } from "react-dom";
import { modalContext } from "./CreateModalContext";
import { Button } from "../ui/button";
import { Cross } from "lucide-react";
import {AnimatePresence, motion} from "motion/react"

export function CreateModal({
  children,
  titre,
}: {
  children: React.ReactNode;
  titre: string;
}) {
  const modaleContext = React.useContext(modalContext) as unknown as {
    isOpen: boolean;
    close: () => void;
  };

  if (!modaleContext?.isOpen) return null;

  return createPortal(
    
    <div className="fixed font-poppins z-50 bg-[hsl(231_60%_10%/0.55)] backdrop-blur-sm p-4 top-0 left-0 w-full h-full flex justify-center items-center">
      <AnimatePresence>
      <motion.div className="w-full max-w-[580px] absolute px-4" exit={{y:10}} initial={{y:-10}} animate={{y:0}}>
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
        <CardContent>{children}</CardContent>
      </Card>
    </motion.div>
    </AnimatePresence>
    </div>,
    document.body
  );
}
