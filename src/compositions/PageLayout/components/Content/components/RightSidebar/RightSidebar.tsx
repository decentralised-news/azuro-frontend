'use client'

import React from 'react'

import TabbedBetslip from 'compositions/TabbedBetslip/TabbedBetslip'
import LiveStatistics from 'compositions/LiveStatistics/LiveStatistics'


const RightSidebar: React.FC = () => {
  return (
    <div className="w-[19.5rem] pl-1 flex flex-col gap-3">
      <div className="bg-navy-900 border border-white/10 rounded-md overflow-hidden">
        <LiveStatistics withBottomLine />
        <TabbedBetslip />
      </div>
    </div>
  )
}

export default RightSidebar
