"use client"
import { UserRound } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { useStore } from '@/store'

const UserModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  // @ts-ignore
  const user = useStore((state) => state.user)
  // @ts-ignore
  const role = useStore((state) => state.role)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menu du compte"
        aria-expanded={isOpen}
        className="size-10 rounded-full bg-primary text-primary-foreground flex justify-center items-center transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <UserRound className="size-5" />
      </button>
      {isOpen && (
        <div className="absolute right-0 top-12 z-40 w-60 rounded-md border bg-popover text-sm">
          <div className="border-b px-4 py-3">
            <p className="font-semibold">{[user?.prenom, user?.nom].filter(Boolean).join(' ') || 'Mon compte'}</p>
            <p className="text-muted-foreground capitalize">{role}</p>
          </div>
          <Link href="/dashboard/user" onClick={() => setIsOpen(false)} className="block px-4 py-3 hover:bg-muted">
            Modifier mon profil
          </Link>
        </div>
      )}
    </div>
  )
}

export default UserModal
