import React from 'react'
import { cn } from '@/lib/utils'

// Teintes par type de donnée, toutes tirées de l'encre et du stylo
const tones = {
  ink: 'bg-primary/10 text-primary',
  pen: 'bg-pen/10 text-pen',
  green: 'bg-emerald-600/10 text-emerald-700',
  amber: 'bg-amber-500/15 text-amber-700',
  sky: 'bg-sky-600/10 text-sky-700',
  violet: 'bg-violet-600/10 text-violet-700',
}

const CardDashboard = ({ Icon, num, title, tone = 'ink' }) => {
  return (
    <div className='sheet lift relative overflow-hidden p-5'>
      <Icon aria-hidden='true' className='absolute -right-3 -bottom-4 size-24 text-foreground/[0.04]' />
      <div className={cn('size-10 rounded-lg flex items-center justify-center', tones[tone])}>
        <Icon className='size-5' />
      </div>
      <p className='mt-4 text-3xl font-semibold tracking-tight leading-none'>{num ?? '–'}</p>
      <p className='mt-1.5 text-sm text-muted-foreground'>{title}</p>
    </div>
  )
}

export default CardDashboard
