'use client'

import React from 'react'
import { Message } from '@locmod/intl'
import { useLive } from '@azuro-org/sdk'
import { constants } from 'helpers'

import { Icon } from 'components/ui'
import { Href } from 'components/navigation'

import messages from './messages'


const Hero: React.FC = () => {
  const { isLive, changeLive } = useLive()

  const handleExploreLiveClick = () => {
    if (!isLive) {
      changeLive(true)
    }
  }

  return (
    <div className="relative overflow-hidden rounded-md border border-grey-10 bg-navy-900 text-white">
      <div className="absolute inset-0 opacity-40 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-10 -right-10 size-56 rounded-full bg-brand-50/20 blur-3xl" />
        <div className="absolute -bottom-16 left-1/4 size-56 rounded-full bg-brand-50/10 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.06] scb-hero-grid" />
      </div>
      <div className="relative px-5 ds:px-8 py-6 flex mb:flex-col gap-4 ds:items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-brand-50/20 text-brand-50 text-caption-12 font-bold uppercase tracking-wider">
              <Icon className="size-3" name="interface/top" />
              SmartContractBets
            </span>
          </div>
          <h1 className="mt-2 text-heading-h2 ds:text-heading-h1 font-bold tracking-tight">
            Wager the Smart Way
          </h1>
          <p className="mt-1 text-caption-14 text-grey-60 max-w-xl">
            On-chain sports markets. Transparent settlement.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Href
            to="/"
            className="inline-flex items-center justify-center h-10 px-4 rounded-ssm bg-brand-50 text-white text-caption-14 font-bold transition-colors hover:bg-brand-60"
            onClick={handleExploreLiveClick}
          >
            <Icon className="size-4 mr-2" name="interface/live" />
            <Message value={messages.exploreLive} />
          </Href>
          <a
            className="inline-flex items-center justify-center h-10 px-4 rounded-ssm bg-white/5 border border-white/10 text-white text-caption-14 font-semibold transition-colors hover:bg-white/10"
            href={constants.links.docs}
            target="_blank"
            rel="noreferrer"
          >
            <Message value={messages.howItWorks} />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Hero
