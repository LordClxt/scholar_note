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
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Button } from "./ui/button";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Etudiant",
    url: "/dashboard/etudiant",
    icon: Backpack,
  },
  {
    title: "Enseignant",
    url: "/dashboard/enseignant",
    icon: BriefcaseBusiness,
  },
  {
    title: "Evaluation",
    url: "/dashboard/evaluation",
    icon: NotepadText,
  },
  {
    title: "Filière",
    url: "/dashboard/filiere",
    icon: LibraryBig,
  },
  {
    title: "Module",
    url: "/dashboard/module",
    icon: BookText,
  },
  {
    title: "Niveau",
    url: "/dashboard/niveau",
    icon: BookUp2,
  },
  {
    title: "Periode",
    url: "/dashboard/periode",
    icon: CalendarRange,
  },
  {
    title: "UE",
    url: "/dashboard/ue",
    icon: BookOpen,
  },
];

export function AppSidebar() {
  const path = usePathname();
  console.log(path);

  return (
    <Sidebar>
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
          <Button variant="destructive" className="w-full font-poppins font-bold text-white">
            <LogOut/> DECONNEXION
          </Button>
        </footer>
      </SidebarFooter>
    </Sidebar>
  );
}
