import { AppSidebar } from '@/components/AppSideBar'
import NavBar from '@/components/NavBar'
import { SidebarProvider } from '@/components/ui/sidebar'
import React, { ReactNode } from 'react'


const Layout = ({children}:{children:ReactNode}) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full grow bg-gray-100 ">
        <NavBar />
        <div className='p-5'>
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}

export default Layout