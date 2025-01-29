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
  return (
    <div>
            {
                etudiantLoading || enseignantLoading || evaluationLoading || filiereLoading || moduleLoading || niveauLoading || periodeLoading || ueLoading ? <Loader />:
                <div className='grid content-center gap-2  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                        <CardDashboard Icon={Backpack} title="Etudiants" num={etudiants?.total_count} />
                        <CardDashboard Icon={BriefcaseBusiness} title="Enseignants" num={enseignants?.total_count} />
                        <CardDashboard Icon={NotepadText} title="Evaluations" num={evaluations?.total_count} />
                        <CardDashboard Icon={LibraryBig} title="Filières" num={filieres?.total_count} />
                        <CardDashboard Icon={BookText} title="Modules" num={modules?.total_count} />
                        <CardDashboard Icon={BookUp2} title="Niveaux" num={niveaux?.total_count} />
                        <CardDashboard Icon={CalendarRange} title="Périodes" num={periodes?.total_count} />
                        <CardDashboard Icon={BookOpen} title="UE" num={ue?.total_count} />
                </div>
            }
    </div>
  )
}

export default CardsLine