'use client'

import React, { useState } from 'react'
import { Message } from '@locmod/intl'
import cx from 'classnames'
import dayjs from 'dayjs'

import { Icon } from 'components/ui'
import Betslip from 'compositions/Betslip/Betslip'
import AcceptedBets from 'compositions/AcceptedBets/AcceptedBets'
import messages from './messages'


const tabs = [ 'bettingTips', 'betslip', 'myBets' ] as const

type BettingTip = {
  id: string
  league: string
  match: string
  tip: string
  odds: number
  time: string
  confidence: number
}

const TabbedBetslip: React.FC = () => {
  const [ activeTab, setActiveTab ] = useState<typeof tabs[number]>('bettingTips')

  const bettingTips: BettingTip[] = [
    {
      id: '1',
      league: 'EPL',
      match: 'MUN vs LIV',
      tip: 'Over 2.5',
      odds: 1.85,
      time: '20:00',
      confidence: 4,
    },
    {
      id: '2',
      league: 'La Liga',
      match: 'BAR vs RMA',
      tip: 'BTTS',
      odds: 1.65,
      time: '21:00',
      confidence: 5,
    },
    {
      id: '3',
      league: 'Serie A',
      match: 'INT vs MIL',
      tip: '1X',
      odds: 2.10,
      time: '19:45',
      confidence: 3,
    },
  ]

  const renderStars = (count: number) => {
    return (
      <div className="flex">
        {
          [ ...Array(5) ].map((_, i) => (
            <Icon
              key={i}
              name="interface/win"
              className={`w-2.5 h-2.5 ${i < count ? 'text-yellow-400' : 'text-gray-300'}`}
            />
          ))
        }
      </div>
    )
  }

  return (
    <div className="w-full h-full flex flex-col">
      {/* Compact Tabs */}
      <div className="bg-bg-l0 rounded-t-lg flex divide-x divide-grey-15 border-b border-grey-15">
        {
          tabs.map((tab) => (
            <button
              key={tab}
              className={
                cx(
                  'flex-1 py-2 text-center text-xs transition-colors',
                  activeTab === tab
                    ? 'bg-brand-10 text-brand-50'
                    : 'text-grey-70 hover:bg-grey-10'
                )
              }
              onClick={() => setActiveTab(tab)}
            >
              <Message value={messages[tab]} />
            </button>
          ))
        }
      </div>

      {/* Betting Tips Content */}
      {
        activeTab === 'bettingTips' && (
          <div className="flex-1 overflow-hidden flex flex-col">
            {/* Compact Header */}
            <div className="grid grid-cols-12 bg-grey-10 p-2 text-[10px] font-semibold text-grey-70 tracking-tight">
              <div className="col-span-4 px-1">Match</div>
              <div className="col-span-3 px-1">Tip</div>
              <div className="col-span-3 px-1 text-right">Odds</div>
              <div className="col-span-2 px-1 text-right">Time</div>
            </div>

            {/* Scrollable Tips List */}
            <div className="flex-1 overflow-y-auto no-scrollbar divide-y divide-grey-15">
              {
                bettingTips.map((tip) => (
                  <div
                    key={tip.id}
                    className="grid grid-cols-12 p-2 hover:bg-grey-10 transition-colors"
                  >
                    <div className="col-span-4 flex flex-col px-1">
                      <span className="text-[11px] font-medium truncate">{tip.league}</span>
                      <span className="text-[10px] text-grey-60 truncate">{tip.match}</span>
                    </div>
                    <div className="col-span-3 flex flex-col px-1">
                      <span className="text-[11px] font-medium text-brand-50">{tip.tip}</span>
                      {renderStars(tip.confidence)}
                    </div>
                    <div className="col-span-3 flex items-center justify-end px-1">
                      <span className="text-[11px] font-bold text-accent-green">
                        {tip.odds.toFixed(2)}
                      </span>
                    </div>
                    <div className="col-span-2 flex items-center justify-end px-1">
                      <span className="text-[10px] text-grey-60">{tip.time}</span>
                    </div>
                  </div>
                ))
              }
            </div>

            {/* Mini Stats Footer */}
            <div className="bg-bg-l0 border-t border-grey-15 p-2">
              <div className="grid grid-cols-3 gap-1 text-center text-[10px]">
                <div className="bg-grey-10 rounded p-1">
                  <div className="text-grey-70">Win Rate</div>
                  <div className="font-bold text-accent-green">78%</div>
                </div>
                <div className="bg-grey-10 rounded p-1">
                  <div className="text-grey-70">Avg Odds</div>
                  <div className="font-bold">1.85</div>
                </div>
                <div className="bg-grey-10 rounded p-1">
                  <div className="text-grey-70">Tips</div>
                  <div className="font-bold">24</div>
                </div>
              </div>
            </div>
          </div>
        )
      }

      {/* Other Tabs */}
      {activeTab === 'betslip' && <Betslip />}
      {activeTab === 'myBets' && <AcceptedBets />}
    </div>
  )
}

export default TabbedBetslip

// 'use client'

// import React, { useState } from 'react'
// import { Message } from '@locmod/intl'
// import cx from 'classnames'

// import Betslip from 'compositions/Betslip/Betslip'
// import AcceptedBets from 'compositions/AcceptedBets/AcceptedBets'

// import messages from './messages'


// const tabs = [ 'betslip', 'myBets' ] as const

// const TabbedBetslip: React.FC = () => {
//   const [ activeTab, setActiveTab ] = useState<typeof tabs[number]>('betslip')

//   return (
//     <>
//       <div className="bg-bg-l0 rounded-md border border-grey-15 p-1 flex items-center">
//         {
//           tabs.map(tab => {
//             const isActive = activeTab === tab

//             return (
//               <button
//                 key={tab}
//                 className={
//                   cx('w-full p-2 text-center rounded-sm', {
//                     'text-grey-60 hover:text-grey-90': !isActive,
//                     'text-grey-90 bg-grey-10': isActive,
//                   })
//                 }
//                 onClick={() => setActiveTab(tab)}
//               >
//                 <Message value={messages[tab]} />
//               </button>
//             )
//           })
//         }
//       </div>
//       {
//         activeTab === 'betslip' && (
//           <Betslip />
//         )
//       }
//       {
//         activeTab === 'myBets' && (
//           <AcceptedBets />
//         )
//       }
//     </>
//   )
// }

// export default TabbedBetslip
