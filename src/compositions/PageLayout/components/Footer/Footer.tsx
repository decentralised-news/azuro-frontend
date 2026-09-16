import React from 'react'

import { Logo } from 'components/ui'

import Navbar from './components/Navbar/Navbar'
import Copy from './components/Copy/Copy'


const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-950 border-t border-white/10 mt-auto">
      <div className="mx-auto max-w-[1680px] px-4 ds:px-5 py-8">
        <div className="flex mb:flex-col ds:items-start justify-between gap-8 mb:gap-6">
          <div className="max-w-[18rem]">
            <Logo className="h-6 w-auto" />
            <p className="mt-3 text-caption-13 text-grey-60">
              On-chain sports markets. Transparent settlement. Wager the Smart Way.
            </p>
          </div>
          <Navbar />
        </div>
        <div className="mt-8 pt-4 border-t border-white/10">
          <Copy />
        </div>
      </div>
    </footer>
  )
}

export default Footer
