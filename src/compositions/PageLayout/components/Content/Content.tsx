'use client'

import React from 'react'
import cx from 'classnames'

import { Media } from 'components/layout'
import MobileBottomNav from 'compositions/MobileBottomNav/MobileBottomNav'

import { LeftSidebar, RightSidebar, Header, Search } from './components'


const Content: React.CFC = ({ children }) => {
  return (
    <div className="min-h-dvh flex flex-col bg-navy-950">
      <Header />
      <div className="flex-1 w-full mx-auto flex gap-3 wd:px-4 wd:py-4 max-w-[1680px]">
        <Media className="sticky top-16 h-[calc(100dvh_-_4rem)] shrink-0 overflow-y-auto no-scrollbar scb-scroll" wide>
          <LeftSidebar />
        </Media>

        <main className="scb-workspace flex-1 min-w-0 flex flex-col bg-surface border border-border wd:rounded-md">
          <Media className="flex-none" wide>
            <Search />
          </Media>
          <div className="flex-1 px-2 mb:pb-24">
            {children}
          </div>
        </main>

        <Media className="sticky top-16 h-[calc(100dvh_-_4rem)] shrink-0 overflow-y-auto no-scrollbar scb-scroll" wide>
          <RightSidebar />
        </Media>
      </div>
      <Media narrow mobile>
        <MobileBottomNav />
      </Media>
    </div>
  )
}

export default Content
