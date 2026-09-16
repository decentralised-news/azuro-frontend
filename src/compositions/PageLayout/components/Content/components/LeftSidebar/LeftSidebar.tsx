'use client'

import React from 'react'

import Navigation from 'compositions/Navigation/Navigation'
import LiveSwitcher from 'compositions/LiveSwitcher/LiveSwitcher'


const LeftSidebar: React.FC = () => {
  return (
    <div className="w-60 pr-1 flex flex-col gap-3">
      <LiveSwitcher />
      <div className="bg-navy-900 border border-white/10 rounded-md overflow-hidden">
        <Navigation />
      </div>
    </div>
  )
}

export default LeftSidebar
