'use client'

import React, { useState } from 'react'
import { Message } from '@locmod/intl'
import { useBaseBetslip } from '@azuro-org/sdk'
import cx from 'classnames'

import Betslip from 'compositions/Betslip/Betslip'
import AcceptedBets from 'compositions/AcceptedBets/AcceptedBets'

import messages from './messages'


const tabs = [ 'betslip', 'myBets' ] as const

const TabbedBetslip: React.FC = () => {
  const [ activeTab, setActiveTab ] = useState<typeof tabs[number]>('betslip')
  const { items } = useBaseBetslip()

  return (
    <>
      <div className="bg-navy-950 border-b border-white/10 flex items-center">
        {
          tabs.map(tab => {
            const isActive = activeTab === tab

            return (
              <button
                key={tab}
                className={
                  cx('relative flex-1 h-12 flex items-center justify-center gap-1.5 text-caption-14 font-semibold transition-colors', {
                    'text-white': isActive,
                    'text-grey-60 hover:text-white': !isActive,
                  })
                }
                onClick={() => setActiveTab(tab)}
              >
                <Message value={messages[tab]} />
                {
                  tab === 'betslip' && Boolean(items.length) && (
                    <span className="min-w-5 h-5 px-1 rounded-full bg-brand-50 text-white text-caption-12 font-bold flex items-center justify-center">
                      {items.length}
                    </span>
                  )
                }
                {
                  isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-50" />
                  )
                }
              </button>
            )
          })
        }
      </div>
      {
        activeTab === 'betslip' && (
          <Betslip />
        )
      }
      {
        activeTab === 'myBets' && (
          <AcceptedBets />
        )
      }
    </>
  )
}

export default TabbedBetslip
