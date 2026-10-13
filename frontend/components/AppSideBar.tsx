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
  User2,
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
    title: "Bulletins",
    url: "/dashboard/bulletin",
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
    authorization:["enseignant"]
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
  {
    title: "Profil",
    url: "/dashboard/user",
    icon: User2,
    authorization:["admin", "enseignant", "etudiant"]
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
        <div className="flex items-center gap-3 px-3 py-4">
          <span className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-white shadow-[0_6px_16px_-6px_rgba(0,0,0,0.6)]">
            <span className="absolute inset-y-0 left-2.5 w-[2px] bg-pen" />
            <span className="absolute inset-x-0 top-[13px] h-px bg-primary/25" />
            <span className="absolute inset-x-0 top-[21px] h-px bg-primary/25" />
            <span className="absolute inset-x-0 top-[29px] h-px bg-primary/25" />
            <span className="absolute right-1 bottom-0.5 font-hand text-lg font-bold leading-none text-pen">20</span>
          </span>
          <div>
            <p className="font-semibold text-lg leading-tight tracking-tight text-white">Scholar Note</p>
            <p className="text-xs text-sidebar-foreground/60">Gestion des notes</p>
          </div>
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
                      <button
                        className={clsx("group/item transition-colors hover:bg-sidebar-accent hover:text-white", isActive ? "bg-sidebar-accent text-white shadow-[inset_3px_0_0_hsl(var(--pen))]" : "text-sidebar-foreground/80")}
                        onClick={()=>router.push(item.url)}
                      >
                        <item.icon className={clsx("group-hover/item:text-white", isActive ? "text-white" : "text-sidebar-foreground/70")} />
                        <span className={clsx(isActive ? "font-semibold" : "font-medium")}>{item.title}</span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <footer className="flex flex-col gap-2">
          <SidebarUser />
          <Button onClick={()=>{
              deconnexion()
              router.push('/login')
          }} variant="ghost" className="w-full justify-start gap-2 font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-white">
            <LogOut/> Se déconnecter
          </Button>
        </footer>
      </SidebarFooter>
    </Sidebar>
  );
}


function SidebarUser() {
  // @ts-ignore
  const user = useStore((state) => state.user)
  // @ts-ignore
  const role = useStore((state) => state.role)
  const initiales = ((user?.prenom?.[0] ?? "") + (user?.nom?.[0] ?? "")).toUpperCase()
  return (
    <div className="flex items-center gap-3 rounded-lg bg-white/[0.06] px-3 py-2.5 ring-1 ring-white/10">
      <span className="size-9 shrink-0 rounded-full bg-gradient-to-br from-[hsl(229_62%_48%)] to-primary text-white text-sm font-semibold flex items-center justify-center">
        {initiales || "?"}
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-white">{[user?.prenom, user?.nom].filter(Boolean).join(" ")}</p>
        <p className="truncate text-xs capitalize text-sidebar-foreground/60">{role}</p>
      </div>
    </div>
  )
}
