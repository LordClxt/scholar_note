"use client"
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AppSidebar } from '@/components/AppSideBar'
import NavBar from '@/components/NavBar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { usePathname } from 'next/navigation'
// import { useStore } from '@/store'
// import { useRouter } from 'next/navigation'
import React, { ReactNode } from 'react'


const Layout = ({children}:{children:ReactNode}) => {

  // @ts-ignore
  // const token = useStore(state=>state.token)
  // const router = useRouter()
  // if(!token){
  //   router.push('/login')
  // }
  const path = usePathname()
  console.log(path);
  
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className={`w-full grow bg-gray-100 `}>
        {
          path !== "/dashboard/user" && <NavBar  />
        }
        
        <div className={path !== "/dashboard/user" &&"p-5"}>
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}

export default Layout