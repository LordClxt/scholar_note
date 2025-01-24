"use client"
import "./globals.css";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="fr">
        <body
          className=""
        >
          {children}
          <ReactQueryDevtools />
        </body>
      </html>
    </QueryClientProvider>
  );
}
