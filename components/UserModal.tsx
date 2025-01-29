import { UserRound } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from './ui/button'

const UserModal = () => {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
    
    <Button onClick={()=>setIsOpen(!isOpen)} className="w-10 h-10 ring-1 ring-yellow-500 ring-offset-1 bg-yellow-400 text-white flex justify-center items-center rounded-full">
        <UserRound  />
    </Button>
    {
        isOpen && <div className='absolute grid grid-cols-1  rounded text-black shadow bg-white text-sm font-poppins top-[4.3rem] right-[10px]'>
            <p className='py-3 border-b px-8 font-bold text-gray-700'>
            Tinde Calixte Hassann
            </p>
            <Link href="" className='py-3 px-8 hover:underline'>
                Modifier mon profile
            </Link>
        </div>
    }
    </>
  )
}

export default UserModal