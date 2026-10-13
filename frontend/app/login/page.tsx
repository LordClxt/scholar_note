import { LoginForm } from "@/components/login-form";
import { GradeMark } from "@/components/notebook/GradeMark";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
      <div className="ruled flex items-center justify-center p-6 md:p-10">
        <div className="sheet flex w-full max-w-sm flex-col gap-8 p-8">
          <h1 className="border-l-[3px] border-pen pl-3 text-2xl font-semibold tracking-tight">
            Scholar Note
            <span className="block text-sm font-normal text-muted-foreground">Gestion des notes</span>
          </h1>
          <LoginForm />
        </div>
      </div>
      <CopyPanel />
    </div>
  );
}

const lignes = [
  { matiere: "Génie logiciel", note: "17" },
  { matiere: "Base de données", note: "15,5" },
  { matiere: "Réseaux", note: "14" },
  { matiere: "Algorithmique", note: "16,5" },
];

// Bureau à l'encre : un relevé de notes corrigé posé sur une pile de copies
function CopyPanel() {
  return (
    <div aria-hidden="true" className="ink-panel hidden lg:flex lg:flex-col lg:items-center lg:justify-center gap-12 p-12">
      <div className="absolute inset-y-0 left-16 w-px bg-pen/70" />
      <div className="relative w-[26rem]">
        <div className="absolute inset-0 translate-x-5 translate-y-4 rotate-[5deg] rounded-xl bg-white/25" />
        <div className="absolute inset-0 translate-x-2.5 translate-y-2 rotate-[2.5deg] rounded-xl bg-white/50" />
        <div
          className="relative -rotate-2 rounded-xl bg-white p-8 pl-12 text-foreground shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]"
          style={{
            backgroundImage: "linear-gradient(to bottom, transparent 31px, hsl(229 66% 33% / 0.12) 32px)",
            backgroundSize: "100% 32px",
          }}
        >
          <div className="absolute inset-y-0 left-7 w-[2px] bg-pen/70" />
          <p className="text-lg font-semibold tracking-tight">Relevé de notes</p>
          <p className="text-sm text-muted-foreground">Licence 3, premier semestre</p>
          <ul className="mt-5">
            {lignes.map((l) => (
              <li key={l.matiere} className="flex h-8 items-end justify-between border-b border-primary/10 text-sm">
                <span>{l.matiere}</span>
                <span className="font-hand text-2xl font-bold leading-none text-primary">{l.note}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Moyenne générale</p>
            <GradeMark note={15.75} size="md" />
          </div>
        </div>
      </div>
      <p className="relative max-w-sm text-center text-lg text-white/80">
        Les notes, les bulletins et les moyennes de toute l&apos;école, au même endroit.
      </p>
    </div>
  );
}
