/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import { useStore } from "@/store";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // données considérées fraîches 5 min : pas de re-téléchargement à chaque navigation
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  const path = usePathname();

  // Récuperer le token
  // @ts-ignore
  const token = useStore((state) => state.token);
  // @ts-ignore
  const role = useStore((state) => state.role);

  useEffect(() => {
    if (token) {
      switch (role) {
        case "etudiant":
          router.replace(path != "/login" ? path : "/dashboard/note"); // Redirige vers les notes de si le token existe
          break;
        case "enseignant":
          router.push(path != "/login" ? path : "/dashboard/evaluation"); // Redirige vers les evaluations si le token existe
          break;
        case "admin":
          router.push((path != "/admin_login" && path != "/login") ? path : "/dashboard"); // Redirige vers les evaluations si le token existe
          break;
        default:
          router.push(path != "/login" ? path : "/dashboard"); // Redirige vers le tableau de bord si le token existe
          break;
      }
    } else {
      if(path == '/admin_login'){
        router.push("/admin_login"); // Redirige vers la page de connexion si le token n'existe pas
      }
      else{
        router.push("/login"); // Redirige vers la page de connexion si le token n'existe pas
      }
      
    }
  }, [token, router, path, role]);

  return (
    <html lang="fr">
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools />
        </QueryClientProvider>
      </body>
    </html>
  );
}
