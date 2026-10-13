"use client"
import React from 'react'
import CardDashboard from './CardDashboard'
import { useQuery } from '@tanstack/react-query'
import { getAllEtudiant } from '@/lib/etudiantServerActions'
import { getAllEnseignant } from '@/lib/enseignantServerActions'
import { getAllEvaluation } from '@/lib/evaluationServerActions'
import { getAllFiliere } from '@/lib/filiereServerActions'
import { getAllModule } from '@/lib/moduleServerActions'
import { getAllNiveau } from '@/lib/niveauServerActions'
import { getAllPeriode } from '@/lib/periodeServerActions'
import { getAllUE } from '@/lib/ueServerActions'
import { Loader } from '../Loader'
import { useStore } from '@/store'
import { GradeMark } from '../notebook/GradeMark'
import { formatNote } from '@/lib/mention'
import { Backpack, BookOpen, BookText, BookUp2, BriefcaseBusiness, CalendarRange, LibraryBig, NotepadText } from 'lucide-react'


const CardsLine = () => {
  
    const {data:etudiants , isLoading:etudiantLoading} = useQuery({
        queryKey:["etudiants"],
        queryFn:getAllEtudiant
    })
    const {data: enseignants, isLoading:enseignantLoading} = useQuery({
        queryKey:["enseignants"],
        queryFn:getAllEnseignant
    })
    const {data: evaluations, isLoading:evaluationLoading} = useQuery({
        queryKey:["evaluations"],
        queryFn:getAllEvaluation
    })
    const {data: filieres, isLoading:filiereLoading} = useQuery({
        queryKey:["filieres"],
        queryFn:getAllFiliere
    })
    const {data: modules, isLoading:moduleLoading} = useQuery({
        queryKey:["modules"],
        queryFn:getAllModule
    })
    const {data: niveaux, isLoading:niveauLoading} = useQuery({
        queryKey:["niveaux"],
        queryFn:getAllNiveau
    })
    const {data: periodes, isLoading:periodeLoading} = useQuery({
        queryKey:["periodes"],
        queryFn:getAllPeriode
    })
    const {data: ue, isLoading:ueLoading} = useQuery({
        queryKey:["ue"],
        queryFn:getAllUE
    })

    if(etudiantLoading || enseignantLoading || evaluationLoading || filiereLoading || moduleLoading || niveauLoading || periodeLoading || ueLoading){
        return <Loader />
    }
  const notes = (evaluations?.data ?? []).map((e) => e.note)
  const moyenne = notes.length ? notes.reduce((t, n) => t + n, 0) / notes.length : null
  const reussite = notes.length ? Math.round((notes.filter((n) => n >= 10).length / notes.length) * 100) : null
  const nomModule = (id) => modules?.data?.find((m) => m.id == id)?.libele ?? "Module"
  const dernieres = [...(evaluations?.data ?? [])].sort((a, b) => b.id - a.id).slice(0, 6)

  return (
    <div className='flex flex-col gap-6'>
      <DashboardHero moyenne={moyenne} reussite={reussite} total={notes.length} />

      <div className='grid gap-4 grid-cols-2 md:grid-cols-4'>
        <CardDashboard Icon={Backpack} title="Étudiants" num={etudiants?.total_count} tone="ink" />
        <CardDashboard Icon={BriefcaseBusiness} title="Enseignants" num={enseignants?.total_count} tone="violet" />
        <CardDashboard Icon={NotepadText} title="Évaluations" num={evaluations?.total_count ?? evaluations?.data?.length} tone="pen" />
        <CardDashboard Icon={LibraryBig} title="Filières" num={filieres?.total_count} tone="sky" />
        <CardDashboard Icon={BookText} title="Modules" num={modules?.total_count} tone="green" />
        <CardDashboard Icon={BookUp2} title="Niveaux" num={niveaux?.total_count} tone="amber" />
        <CardDashboard Icon={CalendarRange} title="Périodes" num={periodes?.total_count} tone="ink" />
        <CardDashboard Icon={BookOpen} title="Unités d'enseignement" num={ue?.total_count} tone="violet" />
      </div>

      <div className='grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]'>
        <Distribution notes={notes} />
        <section className='sheet p-6'>
          <h2 className='text-lg font-semibold tracking-tight'>Dernières évaluations</h2>
          <p className='text-sm text-muted-foreground'>Les notes saisies le plus récemment</p>
          {dernieres.length === 0 ? (
            <p className='mt-6 text-sm text-muted-foreground'>Aucune note saisie pour le moment.</p>
          ) : (
            <ul className='mt-4 divide-y'>
              {dernieres.map((e) => (
                <li key={e.id} className='flex items-center gap-3 py-3'>
                  <span className='size-9 shrink-0 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center'>
                    {((e.etudiant?.prenom?.[0] ?? '') + (e.etudiant?.nom?.[0] ?? '')).toUpperCase()}
                  </span>
                  <div className='min-w-0 flex-1'>
                    <p className='truncate text-sm font-medium'>{e.etudiant ? `${e.etudiant.prenom} ${e.etudiant.nom}` : e.matricule}</p>
                    <p className='truncate text-xs text-muted-foreground'>{nomModule(e.id_module)} ({e.type_evaluation})</p>
                  </div>
                  <span className={'font-hand text-2xl font-bold ' + (e.note >= 10 ? 'text-primary' : 'text-pen')}>{formatNote(e.note)}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}

function DashboardHero({ moyenne, reussite, total }) {
  // @ts-ignore
  const user = useStore((state) => state.user)
  const today = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  return (
    <section className='ink-panel rounded-2xl p-8 md:p-10 shadow-[0_24px_48px_-24px_hsl(231_60%_15%/0.6)]'>
      <div className='absolute inset-y-0 left-6 w-px bg-pen/70' aria-hidden='true' />
      <div className='relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between'>
        <div className='pl-4'>
          <p className='text-sm text-white/60 first-letter:uppercase'>{today}</p>
          <h1 className='mt-2 text-3xl md:text-4xl font-semibold tracking-tight'>Bonjour{user?.prenom ? `, ${user.prenom}` : ''}</h1>
          <p className='mt-2 max-w-md text-white/75'>Voici où en sont les résultats de l&apos;établissement.</p>
          {reussite !== null && (
            <div className='mt-6 flex gap-8'>
              <div>
                <p className='text-2xl font-semibold'>{reussite}%</p>
                <p className='text-sm text-white/60'>de notes au-dessus de 10</p>
              </div>
              <div>
                <p className='text-2xl font-semibold'>{total}</p>
                <p className='text-sm text-white/60'>notes saisies</p>
              </div>
            </div>
          )}
        </div>
        {moyenne !== null && (
          <div className='flex flex-col items-center rounded-xl bg-white px-8 py-6 text-foreground rotate-[1.5deg] shadow-[0_18px_40px_-16px_rgba(0,0,0,0.55)]'>
            <p className='text-sm text-muted-foreground'>Moyenne générale</p>
            <GradeMark note={moyenne} size='lg' className='mt-2' />
          </div>
        )}
      </div>
    </section>
  )
}

const tranches = [
  { label: '0-5', min: 0, max: 5 },
  { label: '5-8', min: 5, max: 8 },
  { label: '8-10', min: 8, max: 10 },
  { label: '10-12', min: 10, max: 12 },
  { label: '12-14', min: 12, max: 14 },
  { label: '14-16', min: 14, max: 16 },
  { label: '16-20', min: 16, max: 20.01 },
]

function Distribution({ notes }) {
  const counts = tranches.map((t) => notes.filter((n) => n >= t.min && n < t.max).length)
  const max = Math.max(1, ...counts)
  return (
    <section className='sheet p-6'>
      <div className='flex items-start justify-between gap-4'>
        <div>
          <h2 className='text-lg font-semibold tracking-tight'>Répartition des notes</h2>
          <p className='text-sm text-muted-foreground'>Nombre de notes par tranche, sur 20</p>
        </div>
        <div className='flex gap-4 text-xs text-muted-foreground'>
          <span className='flex items-center gap-1.5'><span className='size-2.5 rounded-sm bg-pen' />Sous la moyenne</span>
          <span className='flex items-center gap-1.5'><span className='size-2.5 rounded-sm bg-primary' />Moyenne atteinte</span>
        </div>
      </div>
      <div className='mt-8 grid h-56 grid-cols-7 items-end gap-3 border-b-2 border-foreground/80'>
        {counts.map((c, i) => (
          <div key={tranches[i].label} className='flex h-full flex-col items-center justify-end gap-1.5'>
            <span className='text-xs font-medium text-muted-foreground'>{c}</span>
            <div
              className={'w-full rounded-t-md ' + (tranches[i].min < 10 ? 'bg-gradient-to-t from-pen/80 to-pen' : 'bg-gradient-to-t from-primary/80 to-[hsl(229_62%_44%)]')}
              style={{ height: `${(c / max) * 85}%`, minHeight: c ? 6 : 2 }}
            />
          </div>
        ))}
      </div>
      <div className='mt-2 grid grid-cols-7 gap-3 text-center text-xs text-muted-foreground'>
        {tranches.map((t) => <span key={t.label}>{t.label}</span>)}
      </div>
    </section>
  )
}

export default CardsLine
