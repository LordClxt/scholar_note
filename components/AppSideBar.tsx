/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import {
  Backpack,
  BookOpen,
  BookText,
  BookUp2,
  BriefcaseBusiness,
  CalendarRange,
  LayoutDashboard,
  LibraryBig,
  LogOut,
  NotepadText,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import { Button } from "./ui/button";
import Link from "next/link";
import { useStore } from "@/store";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    authorization:["admin"]
  },
  {
    title: "Mes notes",
    url: "/dashboard/note",
    icon: NotepadText,
    authorization:["etudiant"]
  },
  {
    title: "Etudiant",
    url: "/dashboard/etudiant",
    icon: Backpack,
    authorization:["admin"]
  },
  {
    title: "Enseignant",
    url: "/dashboard/enseignant",
    icon: BriefcaseBusiness,
    authorization:["admin"]
  },
  {
    title: "Evaluation",
    url: "/dashboard/evaluation",
    icon: NotepadText,
    authorization:["admin", "enseignant"]
  },
  {
    title: "Filière",
    url: "/dashboard/filiere",
    icon: LibraryBig,
    authorization:["admin"]
  },
  {
    title: "Module",
    url: "/dashboard/module",
    icon: BookText,
    authorization:["admin"]
  },
  {
    title: "Niveau",
    url: "/dashboard/niveau",
    icon: BookUp2,
    authorization:["admin"]
  },
  {
    title: "Periode",
    url: "/dashboard/periode",
    icon: CalendarRange,
    authorization:["admin"]
  },
  {
    title: "UE",
    url: "/dashboard/ue",
    icon: BookOpen,
    authorization:["admin"]
  },
];

export function AppSidebar() {

  const path = usePathname();
  // @ts-ignore
  const deconnexion = useStore(state=>state.deconnexion)
  const router = useRouter()

  // @ts-ignore
  const role = useStore(state=>state.role)

  return (
    <Sidebar className="">
      <SidebarHeader>
        <div className="p-4">
          <h1 className="font-bold text-xl font-poppins text-center">
            SCHOLAR_NOTE
          </h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                
                if(!item.authorization.includes(role)) return null
                const isActive = item.url === path
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        className={clsx("hover:bg-yellow-400 group/item  hover:text-white transition-all", isActive?"bg-yellow-400":'')}
                        href={item.url}
                      >
                        <item.icon className={clsx("group-hover/item:text-white ", !isActive?"text-black":'text-white')} />
                        <span className={clsx(isActive? "font-semibold text-white ":"", 'font-poppins font-medium ')}>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <footer>
          <Button onClick={()=>{
              deconnexion()
              router.push('/login')
          }} variant="destructive" className="w-full font-poppins font-bold text-white">
            <LogOut/> DECONNEXION
          </Button>
        </footer>
      </SidebarFooter>
    </Sidebar>
  );
}
