import { EtudiantTable } from '@/components/Table/EtudiantTable'
import { SelectComponent } from '@/components/Form/SelectComponent'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search } from 'lucide-react'
import React from 'react'

const Page = () => {
  return (
    <div className='bg-white p-5 rounded shadow'>
      <div className='flex items-center justify-between my-5'>
        <h1 className='font-poppins font-bold text-3xl uppercase text-zinc-800'>Périodes</h1>
        <Button className='text-white font-bold font-poppins px-20'>
          <Plus />
          Ajouter
        </Button>
      </div>
        <div className='flex items-center gap-1 my-5 justify-end'>
            <div className='flex gap-1'>
                <Input className='' placeholder="Saisir un nom..." />
                <Button ><Search className='text-white' /></Button>
            </div>
            <SelectComponent items={["Item1", "Item2"]} label="Item" selectValue='Filtrer'/>
        </div>
      <div className=' bg-white rounded shadow'>
        <EtudiantTable />
      </div>
    </div>
  )
}

export default Page