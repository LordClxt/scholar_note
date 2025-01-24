"use client"
import React, { createContext, ReactNode, useState } from 'react'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import { CreateModal } from './CreateModale'

export const modalContext = createContext(null)

const CreateModalContext = ({children, titre}: {children: React.ReactNode, titre:string}) => {

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const open = ()=>setIsOpen(true)
  const close = ()=>setIsOpen(false)

  return (

    <modalContext.Provider value={{isOpen, close, open}}>
        <Button className='text-white font-bold font-poppins px-20' onClick={open}>
          <Plus />
          Ajouter
        </Button>
        <CreateModal titre={titre} >
            {children}
        </CreateModal>
    </modalContext.Provider>
  )
}

export default CreateModalContext