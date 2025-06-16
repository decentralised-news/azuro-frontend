'use client'

import React, { useEffect, useState } from 'react'


import { Icon } from 'components/ui'


interface BettingTip {
  id: number
  league: string
  match: string
  tip: string
  odds: string
  time: string
  confidence: number
  date: string
  status: string
}

interface ApiResponse {
  message: string
  data: BettingTip[]
  count: number
  page: number
  pageSize: number
  total: number
}

const BettingTips = () => {
  const [ tips, setTips ] = useState<BettingTip[]>([])
  const [ loading, setLoading ] = useState(true)
  const [ error, setError ] = useState<string | null>(null)

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await fetch(
          'https://decntralisedapi.onrender.com/api/betting-tips?page=1&pageSize=100000'
        )

        if (!response.ok) {
          throw new Error('Failed to fetch betting tips')
        }
        const data: ApiResponse = await response.json()
        setTips(data.data)
      }
      catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      }
      finally {
        setLoading(false)
      }
    }

    fetchTips()
  }, [])

  const renderStars = (count: number) => {
    return (
      <div className="flex space-x-0.5">
        {
          [ ...Array(5) ].map((_, i) => (
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'won':
        return 'bg-green-100 text-green-800'
      case 'lost':
        return 'bg-red-100 text-red-800'
      case 'pending':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-50"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-lg">
        <p>Error loading tips: {error}</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-white font-bold text-lg">Today's Betting Tips</h2>
          <span className="bg-white/20 text-white/90 text-xs px-2 py-1 rounded-full">
            {
              tips.length
            } tips
          </span>
        </div>
      </div>

      {/* Tips List */}
      <div className="divide-y divide-gray-200 max-h-[500px] overflow-y-auto">
        {
          tips.map((tip) => (
            <div
              key={tip.id}
              className="p-4 hover:bg-gray-100 transition-colors duration-150"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-xs font-medium text-gray-500">
                    {tip.league} • {formatDate(tip.date)}
                  </span>
                  <h3 className="font-medium text-gray-900">{tip.match}</h3>
                </div>
                <span
                  className={
                    `text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(
                      tip.status
                    )}`
                  }
                >
                  {tip.status}
                </span>
              </div>

              <div className="flex justify-between items-center mt-3">
                <div>
                  <p className="text-sm font-semibold text-blue-700">{tip.tip}</p>
                  <div className="mt-1 flex items-center">
                    {renderStars(tip.confidence)}
                    <span className="text-xs text-gray-500 ml-2">
                      Confidence: {tip.confidence}/5
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {tip.time}
                  </p>
                  <p className="text-lg font-bold text-green-600">
                    {parseFloat(tip.odds).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))
        }
      </div>

      {/* Summary Footer */}
      <div className="bg-gray-100 p-3 border-t border-gray-200">
        <div className="flex justify-between text-sm">
          <div className="text-gray-600">
            <span className="font-medium">Last updated:</span>{' '}
            {new Date().toLocaleTimeString()}
          </div>
          <div className="text-blue-600 font-medium">View all tips →</div>
        </div>
      </div>
    </div>
  )
}

export default BettingTips

// 'use client'

// import React from 'react'


// import { Icon } from 'components/ui'


// export type BettingTip = {
//   id: string
//   league: string
//   match: string
//   tip: string
//   odds: number
//   time: string
//   confidence: number
// }

// const bettingTipsData: BettingTip[] = [
//   {
//     id: '1',
//     league: 'UEL',
//     match: 'TOT vs MUN',
//     tip: 'Over 2.5',
//     odds: 1.85,
//     time: '20:00',
//     confidence: 4,
//   },
//   {
//     id: '2',
//     league: 'EPL',
//     match: 'MCI vs BOU',
//     tip: 'Bournemouth or draw',
//     odds: 2.10,
//     time: '20:00',
//     confidence: 3,
//   },
//   {
//     id: '3',
//     league: 'EPL',
//     match: 'CRY vs WOL',
//     tip: 'Matheus Cunha over 1.5 shots',
//     odds: 1.75,
//     time: '20:00',
//     confidence: 3,
//   },
//   {
//     id: '4',
//     league: 'ENG NL',
//     match: 'FGR vs SOU',
//     tip: 'BTTS & Over 3.5',
//     odds: 2.30,
//     time: '19:45',
//     confidence: 4,
//   },
//   {
//     id: '5',
//     league: 'Ligue 1',
//     match: 'MET vs REI',
//     tip: 'Metz & BTTS',
//     odds: 2.50,
//     time: '21:00',
//     confidence: 3,
//   },
//   {
//     id: '6',
//     league: 'SAU Pro',
//     match: 'ALN vs ALK',
//     tip: 'Al Nassr to win',
//     odds: 1.60,
//     time: '17:10',
//     confidence: 4,
//   },
//   {
//     id: '7',
//     league: 'SAU Pro',
//     match: 'ALW vs ALH',
//     tip: 'Over 2.5',
//     odds: 1.80,
//     time: '19:00',
//     confidence: 3,
//   },
//   {
//     id: '8',
//     league: 'MLS',
//     match: 'NYR vs DAL',
//     tip: 'NY Red Bulls to win',
//     odds: 1.85,
//     time: '00:30',
//     confidence: 3,
//   },
//   {
//     id: '9',
//     league: 'MLS',
//     match: 'ORL vs NSH',
//     tip: '1X',
//     odds: 1.29,
//     time: '00:30',
//     confidence: 4,
//   },
//   {
//     id: '10',
//     league: 'SAU Pro',
//     match: 'AHI vs ETT',
//     tip: 'Over 2.5',
//     odds: 1.75,
//     time: '19:00',
//     confidence: 4,
//   },
//   {
//     id: '11',
//     league: 'SCO Prem',
//     match: 'LIV vs ROS',
//     tip: 'Livingston to win',
//     odds: 2.20,
//     time: '20:00',
//     confidence: 3,
//   },
//   {
//     id: '12',
//     league: 'MLS',
//     match: 'ATX vs HOU',
//     tip: '1X',
//     odds: 1.25,
//     time: '02:00',
//     confidence: 3,
//   },
// ]

// interface BettingTipsProps {
//   tips?: BettingTip[]
// }

// const BettingTips: React.FC<BettingTipsProps> = ({ tips = bettingTipsData }) => {
//   const renderStars = (count: number) => {
//     return (
//       <div className="flex">
//         {
//           [ ...Array(5) ].map((_, i) => (
//             <Icon
//               key={i}
//               name="interface/win"
//               className={`w-2.5 h-2.5 ${i < count ? 'text-yellow-400' : 'text-gray-300'}`}
//             />
//           ))
//         }
//       </div>
//     )
//   }

//   return (
//     <div className="flex-1 overflow-hidden flex flex-col mt-6">
//       {/* Compact Header */}
//       <div className="grid grid-cols-12 bg-grey-10 p-2 text-[10px] font-semibold text-grey-70 tracking-tight">
//         <div className="col-span-4 px-1">Match</div>
//         <div className="col-span-3 px-1">Tip</div>
//         <div className="col-span-3 px-1 text-right">Odds</div>
//         <div className="col-span-2 px-1 text-right">Time</div>
//       </div>

//       {/* Scrollable Tips List */}
//       <div className="flex-1 overflow-y-auto no-scrollbar divide-y divide-grey-15">
//         {
//           tips.map((tip) => (
//             <div
//               key={tip.id}
//               className="grid grid-cols-12 p-2 hover:bg-grey-10 transition-colors"
//             >
//               <div className="col-span-4 flex flex-col px-1">
//                 <span className="text-[11px] font-medium truncate">{tip.league}</span>
//                 <span className="text-[10px] text-grey-60 truncate">{tip.match}</span>
//               </div>
//               <div className="col-span-3 flex flex-col px-1">
//                 <span className="text-[11px] font-medium text-brand-50">{tip.tip}</span>
//                 {renderStars(tip.confidence)}
//               </div>
//               <div className="col-span-3 flex items-center justify-end px-1">
//                 <span className="text-[11px] font-bold text-accent-green">
//                   {tip.odds.toFixed(2)}
//                 </span>
//               </div>
//               <div className="col-span-2 flex items-center justify-end px-1">
//                 <span className="text-[10px] text-grey-60">{tip.time}</span>
//               </div>
//             </div>
//           ))
//         }
//       </div>

//       {/* Mini Stats Footer */}
//       <div className="bg-bg-l0 border-t border-grey-15 p-2">
//         <div className="grid grid-cols-3 gap-1 text-center text-[10px]">
//           <div className="bg-grey-10 rounded p-1">
//             <div className="text-grey-70">Win Rate</div>
//             <div className="font-bold text-accent-green">78%</div>
//           </div>
//           <div className="bg-grey-10 rounded p-1">
//             <div className="text-grey-70">Avg Odds</div>
//             <div className="font-bold">1.85</div>
//           </div>
//           <div className="bg-grey-10 rounded p-1">
//             <div className="text-grey-70">Tips</div>
//             <div className="font-bold">24</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default BettingTips
