"use client"
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import CreateModalContext from '@/components/Modal/CreateModalContext'
import FormCreateModule from '@/components/Form/FormCreateModule'
import { ModuleTable } from '@/components/Table/ModuleTable'
import { useQuery } from '@tanstack/react-query'
import { getAllModule } from '@/lib/moduleServerActions'
import { Loader } from '@/components/Loader'

const Page = () => {

  const {data, isLoading, isSuccess} = useQuery({
    queryKey:["modules"],
    queryFn:getAllModule,
  })

  const [input, setInput] = useState("");
  const [localData, setLocalData] = useState({ data: [] });

  useEffect(() => {
    if (isSuccess) {
      setLocalData(data);
    }
  }, [isSuccess, data]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInput(e.target.value);
    const filterModules = data.data?.filter((module) =>
      module.libele.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setLocalData({ data: filterModules });
  };

  return (
    <div className='sheet sheet-stack p-6'>
      <div className='flex items-center justify-between my-5'>
        <h1 className='font-poppins font-semibold text-3xl tracking-tight text-foreground border-l-[3px] border-pen pl-3'>Modules</h1>
        <CreateModalContext titre='Créer un module'>
          <FormCreateModule />
        </CreateModalContext>
      </div>
        <div className='flex items-center gap-1 my-5 justify-end'>
            <div className='flex gap-1'>
                <Input value={input} onChange={handleChangeInput} className='w-[15rem]' placeholder="Saisir un nom..." />
            </div>
        </div>
      <div className='rounded-lg border overflow-hidden bg-card'>
        {
          isLoading?<Loader />:
          <ModuleTable data={localData} />
        }
      </div>
    </div>
  )
}

export default Page