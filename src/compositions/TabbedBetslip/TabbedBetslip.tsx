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
  id: string,
  league: string,
  match: string,
  homeTeam: string,
  awayTeam: string,
  tip: string,
  odds: number,
  date: string,
  time: string,
  confidence: number, // 1-5 stars
}

const TabbedBetslip: React.FC = () => {
  const [ activeTab, setActiveTab ] = useState<typeof tabs[number]>('bettingTips')

  // Sample betting tips data - replace with your actual data source
  const bettingTips: BettingTip[] = [
    {
      id: '1',
      league: 'Premier League',
      match: 'Manchester United vs Liverpool',
      homeTeam: 'Manchester United',
      awayTeam: 'Liverpool',
      tip: 'Over 2.5 Goals',
      odds: 1.85,
      date: dayjs().format('DD.MM.YYYY'),
      time: '20:00',
      confidence: 4,
    },
    {
      id: '2',
      league: 'La Liga',
      match: 'Barcelona vs Real Madrid',
      homeTeam: 'Barcelona',
      awayTeam: 'Real Madrid',
      tip: 'Both Teams to Score',
      odds: 1.65,
      date: dayjs().add(1, 'day').format('DD.MM.YYYY'),
      time: '21:00',
      confidence: 5,
    },
    {
      id: '3',
      league: 'Serie A',
      match: 'Inter Milan vs AC Milan',
      homeTeam: 'Inter Milan',
      awayTeam: 'AC Milan',
      tip: 'Home Win',
      odds: 2.10,
      date: dayjs().add(2, 'day').format('DD.MM.YYYY'),
      time: '19:45',
      confidence: 3,
    },
  ]

  const renderStars = (count: number) => {
    return (
      <div className="flex items-center">
        {
        [
          ...Array(5),
        ].map((_, i) => (
          <Icon
            key={i}
            name="interface/win"
            className={`w-3 h-3 ${i < count ? 'text-yellow-400' : 'text-gray-300'}`}
          />
        ))
        }
      </div>
    )
  }

  return (
    <>
      <div className="bg-bg-l0 rounded-md border border-grey-15 p-1 flex items-center">
        {
        tabs.map(tab => {
          const isActive = activeTab === tab

          return (
            <button
              key={tab}
              className={
                cx('w-full p-2 text-center rounded-sm', {
                  'text-grey-60 hover:text-grey-90': !isActive,
                  'text-grey-90 bg-grey-10': isActive,
                })
              }
              onClick={() => setActiveTab(tab)}
            >
              <Message value={messages[tab]} />
            </button>
          )
        })
        }
      </div>
      
      {activeTab === 'bettingTips' && (
        <div className="mt-4">
          <div className="bg-bg-l0 rounded-md border border-grey-15 overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-12 bg-grey-10 p-3 text-caption-12 font-semibold text-grey-70">
              <div className="col-span-3"><Message value={messages.league} /></div>
              <div className="col-span-4"><Message value={messages.match} /></div>
              <div className="col-span-2"><Message value={messages.tip} /></div>
              <div className="col-span-1"><Message value={messages.odds} /></div>
              <div className="col-span-2"><Message value={messages.date} /></div>
            </div>
            
            {/* Tips List */}
            <div className="divide-y divide-grey-15 max-h-[28rem] overflow-auto no-scrollbar">
              {bettingTips.map(tip => (
                <div key={tip.id} className="grid grid-cols-12 p-3 hover:bg-grey-10 transition-colors">
                  <div className="col-span-3 flex items-center">
                    <span className="text-caption-13 font-medium truncate">{tip.league}</span>
                  </div>
                  <div className="col-span-4 flex items-center">
                    <span className="text-caption-13 font-medium truncate">
                      {tip.homeTeam} vs {tip.awayTeam}
                    </span>
                  </div>
                  <div className="col-span-2 flex flex-col">
                    <span className="text-caption-13 font-medium text-brand-50">{tip.tip}</span>
                    {renderStars(tip.confidence)}
                  </div>
                  <div className="col-span-1 flex items-center">
                    <span className="text-caption-13 font-bold text-accent-green">{tip.odds.toFixed(2)}</span>
                  </div>
                  <div className="col-span-2 flex flex-col">
                    <span className="text-caption-13">{tip.date}</span>
                    <span className="text-caption-12 text-grey-60">{tip.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Stats/Info Section */}
          <div className="mt-3 bg-bg-l0 rounded-md border border-grey-15 p-3">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-2 bg-grey-10 rounded-sm">
                <div className="text-caption-12 text-grey-70">Total Tips</div>
                <div className="text-caption-14 font-bold mt-1">24</div>
              </div>
              <div className="p-2 bg-grey-10 rounded-sm">
                <div className="text-caption-12 text-grey-70">Win Rate</div>
                <div className="text-caption-14 font-bold text-accent-green mt-1">78%</div>
              </div>
              <div className="p-2 bg-grey-10 rounded-sm">
                <div className="text-caption-12 text-grey-70">Avg Odds</div>
                <div className="text-caption-14 font-bold mt-1">1.85</div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'betslip' && <Betslip />}
      {activeTab === 'myBets' && <AcceptedBets />}
    </>
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
